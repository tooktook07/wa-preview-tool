import PresetSelector from './PresetSelector';
import ReadabilityPanel from './ReadabilityPanel';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { type FormatPreset } from '@/utils/formatPresets';
import { useReadability } from '@/hooks/use-readability';
import { AlertCircle, CheckCircle2, BarChart3 } from 'lucide-react';

interface MessageEnhancementBarProps {
  messageText: string;
  onApplyPreset: (preset: FormatPreset) => void;
}

export default function MessageEnhancementBar({ 
  messageText, 
  onApplyPreset 
}: MessageEnhancementBarProps) {
  const { metrics } = useReadability(messageText);

  const getScoreColor = () => {
    if (!metrics) return 'text-muted-foreground';
    if (metrics.fleschScore >= 70) return 'text-emerald-600';
    if (metrics.fleschScore >= 50) return 'text-blue-600';
    if (metrics.fleschScore >= 30) return 'text-amber-600';
    return 'text-destructive';
  };

  const getScoreIcon = () => {
    if (!metrics) return <BarChart3 className="h-3.5 w-3.5" />;
    if (metrics.fleschScore >= 60) return <CheckCircle2 className="h-3.5 w-3.5" />;
    return <AlertCircle className="h-3.5 w-3.5" />;
  };

  const shouldShowWarning = metrics && (
    metrics.fleschScore < 60 || 
    metrics.longSentenceIndexes.length > 0
  );

  return (
    <div className="flex items-center justify-between gap-3 px-4 py-2.5 border-b bg-muted/20">
      {/* Left: Preset Selector */}
      <PresetSelector onApplyPreset={onApplyPreset} />

      {/* Right: Readability Score */}
      {metrics && (
        <Popover>
          <PopoverTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm" 
              className={`h-7 gap-1.5 text-xs ${getScoreColor()} hover:bg-accent/50`}
            >
              {getScoreIcon()}
              <span className="font-medium">Score: {metrics.fleschScore}</span>
              {shouldShowWarning && (
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-80">
            <ReadabilityPanel metrics={metrics} />
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
}
