import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { presets, type FormatPreset } from '@/utils/formatPresets';
import { toast } from '@/hooks/use-toast';

interface PresetSelectorProps {
  onApplyPreset: (preset: FormatPreset) => void;
}

export default function PresetSelector({ onApplyPreset }: PresetSelectorProps) {
  const handlePresetClick = (preset: FormatPreset) => {
    onApplyPreset(preset);
    toast({
      title: `${preset.icon} ${preset.name} format applied`,
      description: preset.description,
      duration: 2000,
    });
  };

  return (
    <div className="flex items-center gap-1.5">
      <span className="text-xs text-muted-foreground font-medium mr-1">Quick Format:</span>
      {presets.map((preset) => (
        <Tooltip key={preset.id}>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="h-7 gap-1.5 text-xs px-2.5"
              onClick={() => handlePresetClick(preset)}
            >
              <span>{preset.icon}</span>
              <span>{preset.name}</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-xs">{preset.description}</p>
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
}
