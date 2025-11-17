import { Button } from "@/components/ui/button";
import { Bold, Italic, Strikethrough, Code, Code2, Smile, Eraser, List, ListOrdered, Quote, AlertCircle, CheckCircle2, BarChart3, MoreHorizontal } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import ReadabilityPanel from "./ReadabilityPanel";
import type { ReadabilityMetrics } from "@/utils/readabilityAnalyzer";
import { useIsMobile } from "@/hooks/use-mobile";

interface FormattingToolbarProps {
  onFormat: (format: string) => void;
  onClearFormat: () => void;
  onEmojiClick: () => void;
  readabilityMetrics?: ReadabilityMetrics | null;
}

export default function FormattingToolbar({ onFormat, onClearFormat, onEmojiClick, readabilityMetrics }: FormattingToolbarProps) {
  const isMobile = useIsMobile();
  
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

  // Mobile layout with dropdown
  if (isMobile) {
    return (
      <div className="relative">
        <div className="flex items-center gap-1 px-2 py-1.5 border-b bg-card overflow-x-auto scrollbar-hide scroll-smooth">
          {/* Essential buttons */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="sm" onClick={() => onFormat("*")} className="h-9 w-9 p-0 flex-shrink-0">
                <Bold className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent><p>Bold</p></TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="sm" onClick={() => onFormat("_")} className="h-9 w-9 p-0 flex-shrink-0">
                <Italic className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent><p>Italic</p></TooltipContent>
          </Tooltip>
          
          {/* More dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-9 w-9 p-0 flex-shrink-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem onClick={() => onFormat("~")}>
                <Strikethrough className="h-4 w-4 mr-2" />
                Strikethrough
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onFormat("`")}>
                <Code2 className="h-4 w-4 mr-2" />
                Inline Code
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onFormat("```")}>
                <Code className="h-4 w-4 mr-2" />
                Monospace
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleListFormat("* ")}>
                <List className="h-4 w-4 mr-2" />
                Bulleted List
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleListFormat("1. ")}>
                <ListOrdered className="h-4 w-4 mr-2" />
                Numbered List
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleListFormat("> ")}>
                <Quote className="h-4 w-4 mr-2" />
                Quote
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onClearFormat}>
                <Eraser className="h-4 w-4 mr-2" />
                Clear Format
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="sm" onClick={onEmojiClick} className="h-9 w-9 p-0 flex-shrink-0">
                <Smile className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent><p>Emoji</p></TooltipContent>
          </Tooltip>
          
          <div className="flex-1" />
          
          {/* Readability score */}
          {readabilityMetrics && (
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="sm" className={`h-9 gap-1 text-xs px-2 flex-shrink-0 ${getScoreColor()}`} data-tour="readability-score">
                  {getScoreIcon()}
                  <span className="font-medium">{readabilityMetrics.fleschScore}</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent side="bottom" align="end" className="w-80">
                <ReadabilityPanel metrics={readabilityMetrics} />
              </PopoverContent>
            </Popover>
          )}
        </div>
        {/* Fade indicator on right edge */}
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-card to-transparent pointer-events-none sm:hidden" />
      </div>
    );
  }

  // Desktop layout
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 border-b bg-card">
      {/* Group 1: Text Formatting */}
      <div className="flex items-center gap-0.5">
        {formatButtons.map(({ icon: Icon, label, format }) => (
          <Tooltip key={format}>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onFormat(format)}
                className="h-7 w-7 p-0"
              >
                <Icon className="h-3.5 w-3.5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{label}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
      
      <div className="w-px h-5 bg-border" />

      {/* Group 2: Lists & Quotes */}
      <div className="flex items-center gap-0.5">
        {listButtons.map(({ icon: Icon, label, prefix }) => (
          <Tooltip key={label}>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleListFormat(prefix)}
                className="h-7 w-7 p-0"
              >
                <Icon className="h-3.5 w-3.5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{label}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
      
      <div className="w-px h-5 bg-border" />
      
      {/* Group 3: Tools */}
      <div className="flex items-center gap-0.5">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={onEmojiClick}
              className="h-7 w-7 p-0"
            >
              <Smile className="h-3.5 w-3.5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Insert Emoji</p>
          </TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFormat}
              className="h-7 w-7 p-0"
            >
              <Eraser className="h-3.5 w-3.5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Clear Format</p>
          </TooltipContent>
        </Tooltip>
      </div>
      
      {/* Spacer to push score to the right */}
      <div className="flex-1" />
      
      {/* Group 4: Readability Score */}
      {readabilityMetrics && (
        <Popover>
          <PopoverTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm" 
              className={`h-7 gap-1 text-xs px-2.5 ${getScoreColor()} hover:bg-accent/50`}
              data-tour="readability-score"
            >
              {getScoreIcon()}
              <span className="font-medium">{readabilityMetrics.fleschScore}</span>
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
    </div>
  );
}
