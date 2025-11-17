import { Button } from "@/components/ui/button";
import { Bold, Italic, Strikethrough, Code, Smile } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface FormattingToolbarProps {
  onFormat: (format: string) => void;
  onEmojiClick: () => void;
}

export default function FormattingToolbar({ onFormat, onEmojiClick }: FormattingToolbarProps) {
  const formatButtons = [
    { icon: Bold, label: "Bold", format: "*" },
    { icon: Italic, label: "Italic", format: "_" },
    { icon: Strikethrough, label: "Strikethrough", format: "~" },
    { icon: Code, label: "Monospace", format: "```" },
  ];

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
