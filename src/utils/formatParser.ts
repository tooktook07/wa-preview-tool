// Parse WhatsApp formatting markers and convert to HTML
export function parseWhatsAppFormatting(text: string): string {
  if (!text) return '';
  
  let formatted = text;
  
  // Bold: *text*
  formatted = formatted.replace(/\*([^*]+)\*/g, '<strong>$1</strong>');
  
  // Italic: _text_
  formatted = formatted.replace(/_([^_]+)_/g, '<em>$1</em>');
  
  // Strikethrough: ~text~
  formatted = formatted.replace(/~([^~]+)~/g, '<s>$1</s>');
  
  // Monospace: ```text```
  formatted = formatted.replace(/```([^`]+)```/g, '<code class="bg-background/20 px-1 rounded font-mono text-sm">$1</code>');
  
  // Line breaks
  formatted = formatted.replace(/\n/g, '<br>');
  
  return formatted;
}

// Detect if text is predominantly RTL
export function detectRTL(text: string): boolean {
  if (!text) return false;
  
  // RTL Unicode ranges: Arabic (0600-06FF), Hebrew (0590-05FF)
  const rtlChars = text.match(/[\u0590-\u05FF\u0600-\u06FF]/g);
  const ltrChars = text.match(/[a-zA-Z]/g);
  
  if (!rtlChars) return false;
  if (!ltrChars) return true;
  
  return rtlChars.length > ltrChars.length;
}
