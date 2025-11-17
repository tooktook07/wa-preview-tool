import FormattingToolbar from "./FormattingToolbar";
import EmojiPicker from "./EmojiPicker";
import { RenameDraftDialog } from "./RenameDraftDialog";
import { useReadability } from "@/hooks/use-readability";
import { useState, useRef } from "react";
import * as React from "react";
import { AlertTriangle, ChevronDown, Check, MoreVertical, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Draft } from "@/hooks/use-draft-manager";

interface MessageComposerProps {
  value: string;
  onChange: (value: string) => void;
  isRTL?: boolean;
  drafts: Draft[];
  activeDraftId: string;
  onSwitchDraft: (draftId: string) => void;
  onRenameDraft: (draftId: string, newName: string) => void;
  onClearDraft: (draftId: string) => void;
}

export default function MessageComposer({ 
  value, 
  onChange, 
  drafts, 
  activeDraftId, 
  onSwitchDraft, 
  onRenameDraft, 
  onClearDraft 
}: MessageComposerProps) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [renamingDraft, setRenamingDraft] = useState<Draft | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { metrics } = useReadability(value);
  
  const activeDraft = drafts.find(d => d.id === activeDraftId)!;

  // Calculate character and word count
  const characterCount = value.length;
  const wordCount = value.trim() === '' ? 0 : value.trim().split(/\s+/).length;
  
  // Determine counter color based on WhatsApp limits (~4000 chars practical limit)
  const getCounterColor = () => {
    if (characterCount >= 4000) return "text-destructive";
    if (characterCount >= 3500) return "text-amber-500";
    return "text-muted-foreground";
  };
  
  const showWarning = characterCount >= 3500;
  const showSplitSuggestion = characterCount >= 4000;

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const newText = value.substring(0, start) + text + value.substring(end);
    
    onChange(newText);
    
    // Set cursor position after paste
    setTimeout(() => {
      textarea.setSelectionRange(start + text.length, start + text.length);
      textarea.focus();
    }, 0);
  };

  const handleFormat = (format: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    
    // Handle list and quote prefixes (line-based formatting)
    if (format === "* " || format === "1. " || format === "> ") {
      // Find the start of the current line
      const textBeforeStart = value.substring(0, start);
      const lineStart = textBeforeStart.lastIndexOf('\n') + 1;
      
      const newText = value.substring(0, lineStart) + 
                      format + 
                      value.substring(lineStart);
      const newCursorPos = start + format.length;
      
      onChange(newText);
      
      setTimeout(() => {
        textarea.setSelectionRange(newCursorPos, newCursorPos);
        textarea.focus();
      }, 0);
    } else {
      // Handle inline formatting (bold, italic, strikethrough, code, etc.)
      const newText = value.substring(0, start) + 
                      format + selectedText + format + 
                      value.substring(end);
      const newCursorPos = start + format.length + selectedText.length;
      
      onChange(newText);
      
      setTimeout(() => {
        textarea.setSelectionRange(newCursorPos, newCursorPos);
        textarea.focus();
      }, 0);
    }
  };

  const handleClearFormat = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    
    // If no text is selected, do nothing
    if (start === end) return;
    
    const selectedText = value.substring(start, end);
    
    // Remove all formatting markers from selected text only
    const cleanedText = selectedText
      .replace(/\*\*\*/g, '')
      .replace(/\*\*/g, '')
      .replace(/\*/g, '')
      .replace(/_/g, '')
      .replace(/~/g, '')
      .replace(/```/g, '')
      .replace(/`/g, '')
      .replace(/^[*-]\s/gm, '')
      .replace(/^\d+\.\s/gm, '')
      .replace(/^>\s/gm, '');
    
    // Reconstruct the full text with cleaned selection
    const newText = value.substring(0, start) + cleanedText + value.substring(end);
    onChange(newText);
    
    setTimeout(() => {
      // Place cursor at the end of the cleaned text
      const newCursorPos = start + cleanedText.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
      textarea.focus();
    }, 0);
  };

  const handleEmojiSelect = (emoji: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const cursorPos = textarea.selectionStart;
    const newText = value.substring(0, cursorPos) + 
                    emoji + 
                    value.substring(cursorPos);
    
    onChange(newText);
    setShowEmojiPicker(false);
    
    setTimeout(() => {
      textarea.setSelectionRange(cursorPos + emoji.length, cursorPos + emoji.length);
      textarea.focus();
    }, 0);
  };

  return (
    <div className="flex flex-col h-full bg-card rounded-lg border shadow-sm">
      <div className="p-2 sm:p-3 border-b bg-muted/30">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4">
          {/* Left Column: Title + Description */}
          <div className="flex flex-col">
            <h2 className="text-sm sm:text-base font-semibold text-foreground">Message Composer</h2>
            <p className="text-xs text-muted-foreground hidden sm:block">Type or paste your WhatsApp message</p>
          </div>
          
          {/* Right Column: Draft Controls (Grouped Buttons) */}
          <div className="flex items-center gap-0 border rounded-md overflow-hidden w-full sm:w-auto" data-tour="draft-switcher">
            {/* Draft Switcher Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex-1 sm:flex-initial h-7 gap-1 sm:gap-1.5 text-xs px-2 sm:px-3 rounded-none border-r hover:bg-accent/50 justify-between">
                  <span className="font-medium truncate max-w-[120px] sm:max-w-[150px]">{activeDraft.name}</span>
                  {activeDraft.content && <span className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />}
                  <ChevronDown className="h-3 w-3 opacity-50 flex-shrink-0" />
                </Button>
              </DropdownMenuTrigger>
              
              <DropdownMenuContent align="end" className="w-48">
                {drafts.map((draft) => (
                  <DropdownMenuItem 
                    key={draft.id}
                    onClick={() => onSwitchDraft(draft.id)}
                    className="flex items-center justify-between"
                  >
                    <span className="flex items-center gap-2">
                      {draft.id === activeDraftId && <Check className="h-3 w-3" />}
                      {draft.name}
                    </span>
                    {draft.content && <span className="h-1.5 w-1.5 rounded-full bg-primary" />}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Draft Options Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-7 px-2 rounded-none hover:bg-accent/50">
                  <MoreVertical className="h-3.5 w-3.5" />
                </Button>
              </DropdownMenuTrigger>
              
              <DropdownMenuContent align="end" className="w-44">
                <DropdownMenuItem onClick={() => setRenamingDraft(activeDraft)}>
                  <Pencil className="mr-2 h-3.5 w-3.5" />
                  Rename Draft
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => {
                    if (activeDraft.content || activeDraft.versions.length > 0) {
                      if (window.confirm(`Clear "${activeDraft.name}"? This will delete all content and versions.`)) {
                        onClearDraft(activeDraft.id);
                      }
                    }
                  }}
                  disabled={!activeDraft.content && activeDraft.versions.length === 0}
                  className="text-destructive focus:text-destructive"
                >
                  <Trash2 className="mr-2 h-3.5 w-3.5" />
                  Clear Draft
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Formatting Toolbar */}
      <div data-tour="formatting-toolbar">
        <FormattingToolbar
          onFormat={handleFormat}
          onClearFormat={handleClearFormat}
          onEmojiClick={() => setShowEmojiPicker(!showEmojiPicker)}
          readabilityMetrics={metrics}
        />
      </div>

      {/* Emoji Picker */}
      {showEmojiPicker && (
        <div className="border-b">
          <EmojiPicker 
            onEmojiSelect={handleEmojiSelect}
          />
        </div>
      )}

      {/* Main Textarea Container */}
      <div className="flex-1 flex flex-col relative min-h-0 bg-muted/20">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleInput}
          onPaste={handlePaste}
          placeholder="Type your WhatsApp message here..."
          className="flex-1 w-full p-3 sm:p-4 bg-transparent border-none outline-none resize-none font-sans text-sm sm:text-base leading-relaxed text-foreground placeholder:text-muted-foreground"
        />
        
        {/* Character & Word Count Overlay */}
        <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 px-2 py-1 sm:px-2.5 sm:py-1.5 bg-background/80 backdrop-blur-sm border rounded-md shadow-sm">
          <div className="flex items-center gap-1.5 sm:gap-3 text-[10px] sm:text-xs">
            <span className={getCounterColor()}>
              {characterCount} chars
            </span>
            <span className="text-muted-foreground">
              {wordCount} words
            </span>
            {showWarning && (
              <div className="flex items-center gap-1 text-amber-600">
                <AlertTriangle className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer Tip */}
      <div className="px-4 py-2 border-t bg-muted/30">
        <p className="text-xs text-muted-foreground text-center">
          💡 Tip: Select text and click formatting buttons, or type markers directly (*bold*, _italic_, ~strikethrough~)
        </p>
      </div>

      {/* Rename Draft Dialog */}
      {renamingDraft && (
        <RenameDraftDialog
          open={!!renamingDraft}
          onOpenChange={(open) => !open && setRenamingDraft(null)}
          draft={renamingDraft}
          onRename={(newName) => {
            onRenameDraft(renamingDraft.id, newName);
            setRenamingDraft(null);
          }}
        />
      )}
    </div>
  );
}
