import { Button } from "@/components/ui/button";
import { Bold, Italic, Strikethrough, Code, Code2, Smile, Eraser, List, ListOrdered, Quote } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface FormattingToolbarProps {
  onFormat: (format: string) => void;
  onClearFormat: () => void;
  onEmojiClick: () => void;
}

export default function FormattingToolbar({ onFormat, onClearFormat, onEmojiClick }: FormattingToolbarProps) {
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
      
      <div className="ml-auto">
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
