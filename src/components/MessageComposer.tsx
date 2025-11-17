import FormattingToolbar from "./FormattingToolbar";
import EmojiPicker from "./EmojiPicker";
import { useState, useRef } from "react";
import * as React from "react";

interface MessageComposerProps {
  value: string;
  onChange: (value: string) => void;
  isRTL?: boolean;
}

export default function MessageComposer({ value, onChange }: MessageComposerProps) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Calculate character and word count
  const characterCount = value.length;
  const wordCount = value.trim() === '' ? 0 : value.trim().split(/\s+/).length;

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
        <h2 className="text-base font-semibold text-foreground">Message Composer</h2>
        <p className="text-xs text-muted-foreground">Type your message and apply formatting</p>
      </div>
      
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
      
      <div className="flex-1 p-4">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleInput}
          onPaste={handlePaste}
          className="h-full min-h-[300px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none font-sans"
          style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
          dir="auto"
          placeholder="Type your message here..."
        />
      </div>
      
      <div className="p-3 border-t bg-muted/30 text-xs text-muted-foreground flex items-center justify-between">
        <p>💡 Tip: Select text and click formatting buttons, or use WhatsApp syntax (lists, quotes, inline code supported)</p>
        <div className="flex items-center gap-3">
          <span className="font-medium">{characterCount} characters</span>
          <span className="text-muted-foreground/60">•</span>
          <span className="font-medium">{wordCount} words</span>
        </div>
      </div>
    </div>
  );
}
