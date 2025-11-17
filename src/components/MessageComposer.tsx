import FormattingToolbar from "./FormattingToolbar";
import EmojiPicker from "./EmojiPicker";
import { RenameDraftDialog } from "./RenameDraftDialog";
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
      <div className="p-3 border-b bg-muted/30">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-medium text-foreground">Message Composer</h2>
            
            {/* Draft Switcher Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-6 gap-1 text-xs px-2">
                  📝 {activeDraft.name}
                  {activeDraft.content && <span className="h-1.5 w-1.5 rounded-full bg-primary" />}
                  <ChevronDown className="h-3 w-3 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              
              <DropdownMenuContent align="start" className="w-48">
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
          </div>
          
          {/* Draft Options Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <MoreVertical className="h-3.5 w-3.5" />
              </Button>
            </DropdownMenuTrigger>
            
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setRenamingDraft(activeDraft)}>
                <Pencil className="mr-2 h-4 w-4" />
                Rename Draft
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => {
                  if (confirm(`Clear all content from "${activeDraft.name}"?`)) {
                    onClearDraft(activeDraftId);
                  }
                }}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Clear Draft
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <p className="text-xs text-muted-foreground">Type your message and apply formatting</p>
      </div>
      
      {renamingDraft && (
        <RenameDraftDialog 
          draft={renamingDraft}
          open={!!renamingDraft}
          onOpenChange={(open) => !open && setRenamingDraft(null)}
          onRename={(newName) => {
            onRenameDraft(renamingDraft.id, newName);
            setRenamingDraft(null);
          }}
        />
      )}
      
      <FormattingToolbar 
        onFormat={handleFormat}
        onClearFormat={handleClearFormat}
        onEmojiClick={() => setShowEmojiPicker(!showEmojiPicker)}
      />
      
      {showEmojiPicker && (
        <div className="border-b">
          <EmojiPicker onEmojiSelect={handleEmojiSelect} />
        </div>
      )}
      
      <div className="flex-1 p-4 relative">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleInput}
          onPaste={handlePaste}
          className="h-full min-h-[300px] w-full rounded-md border border-input bg-muted/20 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none font-sans"
          style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
          dir="auto"
          placeholder="Type your message here..."
        />
        <div className="absolute bottom-6 right-6 flex flex-col items-end gap-2">
          <div className={`flex items-center gap-2 text-xs bg-background/80 backdrop-blur-sm px-2 py-1 rounded border border-border/50 ${getCounterColor()}`}>
            {showWarning && <AlertTriangle className="w-3 h-3" />}
            <span className="font-medium">{characterCount}</span>
            <span className="text-muted-foreground/60">•</span>
            <span className="font-medium">{wordCount} words</span>
          </div>
          {showSplitSuggestion && (
            <div className="text-xs bg-destructive/10 backdrop-blur-sm px-2 py-1 rounded border border-destructive/20 text-destructive">
              Message is long - consider splitting into multiple messages
            </div>
          )}
        </div>
      </div>
      
      <div className="p-3 border-t bg-muted/30 text-xs text-muted-foreground">
        <p>💡 Tip: Select text and click formatting buttons, or use WhatsApp syntax (lists, quotes, inline code supported)</p>
      </div>
    </div>
  );
}
