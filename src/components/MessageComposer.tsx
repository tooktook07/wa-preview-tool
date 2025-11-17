import { Textarea } from "@/components/ui/textarea";
import FormattingToolbar from "./FormattingToolbar";
import EmojiPicker from "./EmojiPicker";
import { useState, useRef } from "react";

interface MessageComposerProps {
  value: string;
  onChange: (value: string) => void;
  isRTL?: boolean;
}

export default function MessageComposer({ value, onChange, isRTL = false }: MessageComposerProps) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleFormat = (format: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    
    let newText: string;
    if (format === "```") {
      newText = value.substring(0, start) + 
                format + selectedText + format + 
                value.substring(end);
    } else {
      newText = value.substring(0, start) + 
                format + selectedText + format + 
                value.substring(end);
    }
    
    onChange(newText);
    
    // Restore focus and selection
    setTimeout(() => {
      textarea.focus();
      const newCursorPos = end + format.length * 2;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  const handleClearFormat = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    
    // Remove all formatting markers
    const cleanedText = selectedText
      .replace(/\*\*\*/g, '') // Bold italic
      .replace(/\*\*/g, '')   // Bold (double asterisk)
      .replace(/\*/g, '')     // Bold (single asterisk)
      .replace(/_/g, '')      // Italic
      .replace(/~/g, '')      // Strikethrough
      .replace(/```/g, '');   // Monospace
    
    const newText = value.substring(0, start) + 
                    cleanedText + 
                    value.substring(end);
    
    onChange(newText);
    
    setTimeout(() => {
      textarea.focus();
      const newCursorPos = start + cleanedText.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  const handleEmojiSelect = (emoji: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    
    const newText = value.substring(0, start) + 
                    emoji + 
                    value.substring(end);
    
    onChange(newText);
    setShowEmojiPicker(false);
    
    setTimeout(() => {
      textarea.focus();
      const newCursorPos = start + emoji.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  return (
    <div className="flex flex-col h-full bg-card rounded-lg border shadow-sm">
      <div className="p-4 border-b bg-muted/50">
        <h2 className="text-lg font-semibold">Message Composer</h2>
        <p className="text-sm text-muted-foreground">Type your message and apply formatting</p>
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
        <Textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Type your message here... Use *bold*, _italic_, ~strikethrough~, or ```monospace```"
          className="h-full min-h-[300px] resize-none font-sans"
          dir={isRTL ? 'rtl' : 'ltr'}
          style={{ textAlign: isRTL ? 'right' : 'left' }}
        />
      </div>
      
      <div className="p-3 border-t bg-muted/30 text-xs text-muted-foreground">
        <p>💡 Tip: Select text and click formatting buttons, or use markdown-style syntax</p>
      </div>
    </div>
  );
}
