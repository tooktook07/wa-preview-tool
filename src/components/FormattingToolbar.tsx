import { Button } from "@/components/ui/button";
import { Bold, Italic, Strikethrough, Code, Code2, Smile, Eraser, List, ListOrdered, Quote, AlertCircle, CheckCircle2, BarChart3 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import ReadabilityPanel from "./ReadabilityPanel";
import type { ReadabilityMetrics } from "@/utils/readabilityAnalyzer";

interface FormattingToolbarProps {
  onFormat: (format: string) => void;
  onClearFormat: () => void;
  onEmojiClick: () => void;
  readabilityMetrics?: ReadabilityMetrics | null;
}

export default function FormattingToolbar({ onFormat, onClearFormat, onEmojiClick, readabilityMetrics }: FormattingToolbarProps) {
  const formatButtons = [
    { icon: Bold, label: "Bold", format: "*" },
    { icon: Italic, label: "Italic", format: "_" },
    { icon: Strikethrough, label: "Strikethrough", format: "~" },
    { icon: Code2, label: "Inline Code", format: "`" },
    { icon: Code, label: "Monospace", format: "```" },
  ];

  const listButtons = [
    { icon: List, label: "Bulleted List", prefix: "* " },
    { icon: ListOrdered, label: "Numbered List", prefix: "1. " },
    { icon: Quote, label: "Quote", prefix: "> " },
  ];

  const handleListFormat = (prefix: string) => {
    onFormat(prefix);
  };

  const getScoreColor = () => {
    if (!readabilityMetrics) return 'text-muted-foreground';
    if (readabilityMetrics.fleschScore >= 70) return 'text-emerald-600';
    if (readabilityMetrics.fleschScore >= 50) return 'text-blue-600';
    if (readabilityMetrics.fleschScore >= 30) return 'text-amber-600';
    return 'text-destructive';
  };

  const getScoreIcon = () => {
    if (!readabilityMetrics) return <BarChart3 className="h-3.5 w-3.5" />;
    if (readabilityMetrics.fleschScore >= 60) return <CheckCircle2 className="h-3.5 w-3.5" />;
    return <AlertCircle className="h-3.5 w-3.5" />;
  };

  const shouldShowWarning = readabilityMetrics && (
    readabilityMetrics.fleschScore < 60 || 
    readabilityMetrics.longSentenceIndexes.length > 0
  );

  return (
    <div className="flex items-center gap-1 p-2 border-b bg-card">
      {formatButtons.map(({ icon: Icon, label, format }) => (
        <Tooltip key={format}>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onFormat(format)}
              className="h-8 w-8 p-0"
            >
              <Icon className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{label}</p>
          </TooltipContent>
        </Tooltip>
      ))}
      
      <div className="w-px h-6 bg-border mx-1" />

      {listButtons.map(({ icon: Icon, label, prefix }) => (
        <Tooltip key={label}>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleListFormat(prefix)}
              className="h-8 w-8 p-0"
            >
              <Icon className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{label}</p>
          </TooltipContent>
        </Tooltip>
      ))}
      
      <div className="w-px h-6 bg-border mx-1" />
      
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFormat}
            className="h-8 w-8 p-0"
          >
            <Eraser className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Clear Format</p>
        </TooltipContent>
      </Tooltip>
      
      <div className="ml-auto flex items-center gap-1">
        {readabilityMetrics && (
          <Popover>
            <PopoverTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className={`h-8 gap-1.5 text-xs px-2 ${getScoreColor()} hover:bg-accent/50`}
              >
                {getScoreIcon()}
                <span className="font-medium">Score: {readabilityMetrics.fleschScore}</span>
                {shouldShowWarning && (
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-80">
              <ReadabilityPanel metrics={readabilityMetrics} />
            </PopoverContent>
          </Popover>
        )}
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={onEmojiClick}
              className="h-8 w-8 p-0"
            >
              <Smile className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Insert Emoji</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}
