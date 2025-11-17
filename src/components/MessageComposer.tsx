import FormattingToolbar from "./FormattingToolbar";
import EmojiPicker from "./EmojiPicker";
import { useState, useRef } from "react";
import * as React from "react";
import { detectLineDirection } from "@/utils/formatParser";

interface MessageComposerProps {
  value: string;
  onChange: (value: string) => void;
  isRTL?: boolean;
}

export default function MessageComposer({ value, onChange }: MessageComposerProps) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);


  // Save and restore cursor position
  const saveCursorPosition = () => {
    const selection = window.getSelection();
    if (!selection || !editorRef.current) return null;
    
    const range = selection.getRangeAt(0);
    const preSelectionRange = range.cloneRange();
    preSelectionRange.selectNodeContents(editorRef.current);
    preSelectionRange.setEnd(range.startContainer, range.startOffset);
    return preSelectionRange.toString().length;
  };

  const restoreCursorPosition = (position: number) => {
    if (!editorRef.current) return;
    
    const textNodes: Text[] = [];
    const walker = document.createTreeWalker(
      editorRef.current,
      NodeFilter.SHOW_TEXT,
      null
    );
    
    let node;
    while ((node = walker.nextNode())) {
      textNodes.push(node as Text);
    }
    
    let currentPos = 0;
    for (const textNode of textNodes) {
      const nodeLength = textNode.length;
      if (currentPos + nodeLength >= position) {
        const range = document.createRange();
        const offset = Math.min(position - currentPos, nodeLength);
        range.setStart(textNode, offset);
        range.collapse(true);
        
        const selection = window.getSelection();
        selection?.removeAllRanges();
        selection?.addRange(range);
        return;
      }
      currentPos += nodeLength;
    }
  };

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    if (!editorRef.current) return;
    const newValue = editorRef.current.innerText;
    onChange(newValue);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    const cursorPos = saveCursorPosition();
    if (cursorPos === null) return;

    const currentText = editorRef.current?.innerText || '';
    const newText = currentText.substring(0, cursorPos) + text + currentText.substring(cursorPos);
    onChange(newText);

    setTimeout(() => {
      restoreCursorPosition(cursorPos + text.length);
    }, 0);
  };

  const handleFormat = (format: string) => {
    const editor = editorRef.current;
    if (!editor) return;

    const cursorPos = saveCursorPosition();
    if (cursorPos === null) return;

    const text = editor.innerText;
    // Find selection boundaries
    const textBeforeCursor = text.substring(0, cursorPos);
    const lineStart = textBeforeCursor.lastIndexOf('\n') + 1;
    const textAfterCursor = text.substring(cursorPos);
    const lineEnd = textAfterCursor.indexOf('\n');
    const end = lineEnd === -1 ? text.length : cursorPos + lineEnd;
    
    const selectedText = text.substring(cursorPos, end);
    
    let newText: string;
    let newCursorPos: number;

    // Handle list and quote prefixes
    if (format === "* " || format === "1. " || format === "> ") {
      newText = text.substring(0, lineStart) + 
                format + 
                text.substring(lineStart);
      newCursorPos = cursorPos + format.length;
    } else {
      // Handle inline formatting
      newText = text.substring(0, cursorPos) + 
                format + selectedText + format + 
                text.substring(end);
      newCursorPos = cursorPos + format.length;
    }
    
    onChange(newText);
    
    setTimeout(() => {
      restoreCursorPosition(newCursorPos);
      editor.focus();
    }, 0);
  };

  const handleClearFormat = () => {
    const editor = editorRef.current;
    if (!editor) return;

    const cursorPos = saveCursorPosition();
    if (cursorPos === null) return;

    const text = editor.innerText;
    
    // Remove all formatting markers
    const cleanedText = text
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
    
    onChange(cleanedText);
    
    setTimeout(() => {
      if (cursorPos !== null) {
        restoreCursorPosition(cursorPos);
      }
      editor.focus();
    }, 0);
  };

  const handleEmojiSelect = (emoji: string) => {
    const editor = editorRef.current;
    if (!editor) return;

    const cursorPos = saveCursorPosition();
    if (cursorPos === null) return;

    const text = editor.innerText;
    const newText = text.substring(0, cursorPos) + 
                    emoji + 
                    text.substring(cursorPos);
    
    onChange(newText);
    setShowEmojiPicker(false);
    
    setTimeout(() => {
      restoreCursorPosition(cursorPos + emoji.length);
      editor.focus();
    }, 0);
  };

  // Sync external value changes only when editor is not focused
  React.useEffect(() => {
    if (editorRef.current && document.activeElement !== editorRef.current) {
      if (editorRef.current.innerText !== value) {
        editorRef.current.innerText = value;
      }
    }
  }, [value]);

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
        <div
          ref={editorRef}
          contentEditable
          onInput={handleInput}
          onPaste={handlePaste}
          suppressContentEditableWarning
          className="h-full min-h-[300px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 overflow-auto font-sans"
          style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', unicodeBidi: 'plaintext' }}
        />
      </div>
      
      <div className="p-3 border-t bg-muted/30 text-xs text-muted-foreground">
        <p>💡 Tip: Select text and click formatting buttons, or use WhatsApp syntax (lists, quotes, inline code supported)</p>
      </div>
    </div>
  );
}
