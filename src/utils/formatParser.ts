// Detect line direction based on first strong directional character (Unicode BiDi algorithm)
export function detectLineDirection(text: string): 'rtl' | 'ltr' {
  if (!text) return 'ltr';
  
  // Find first strong directional character
  for (const char of text) {
    const code = char.charCodeAt(0);
    
    // RTL characters: Arabic, Hebrew, and related scripts
    if ((code >= 0x0590 && code <= 0x05FF) || // Hebrew
        (code >= 0x0600 && code <= 0x06FF) || // Arabic
        (code >= 0x0700 && code <= 0x074F) || // Syriac
        (code >= 0x0750 && code <= 0x077F) || // Arabic Supplement
        (code >= 0x08A0 && code <= 0x08FF)) { // Arabic Extended-A
      return 'rtl';
    }
    
    // LTR characters: Latin alphabet and numbers
    if ((code >= 0x0041 && code <= 0x005A) || // A-Z
        (code >= 0x0061 && code <= 0x007A) || // a-z
        (code >= 0x0030 && code <= 0x0039)) { // 0-9
      return 'ltr';
    }
  }
  
  return 'ltr'; // Default to LTR if no strong directional character found
}

// Parse WhatsApp formatting markers and convert to HTML
export function parseWhatsAppFormatting(text: string): string {
  if (!text) return '';
  
  // Escape HTML to prevent XSS
  let formatted = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Process line-based formatting first (quotes, lists) with per-line direction detection
  const lines = formatted.split('\n');
  formatted = lines.map(line => {
    const direction = detectLineDirection(line);
    const dirAttr = `dir="${direction}"`;
    const textAlign = direction === 'rtl' ? 'right' : 'left';
    
    // Quote blocks (> text)
    if (/^&gt;\s/.test(line)) {
      return `<div ${dirAttr} style="border-left: 3px solid currentColor; padding-left: 10px; margin: 4px 0; opacity: 0.8; text-align: ${textAlign};">${line.substring(4)}</div>`;
    }
    
    // Numbered lists (1. text, 2. text)
    if (/^\d+\.\s/.test(line)) {
      const match = line.match(/^(\d+)\.\s(.+)$/);
      if (match) {
        return `<div ${dirAttr} style="display: flex; gap: 8px; margin: 2px 0; ${direction === 'rtl' ? 'flex-direction: row-reverse;' : ''} text-align: ${textAlign};"><span style="min-width: 20px;">${match[1]}.</span><span>${match[2]}</span></div>`;
      }
    }
    
    // Bulleted lists (* text or - text)
    if (/^[-*]\s/.test(line)) {
      return `<div ${dirAttr} style="display: flex; gap: 8px; margin: 2px 0; ${direction === 'rtl' ? 'flex-direction: row-reverse;' : ''} text-align: ${textAlign};"><span style="min-width: 20px;">•</span><span>${line.substring(2)}</span></div>`;
    }
    
    // Regular line with direction - preserve empty lines without double spacing
    if (line === '') {
      return '<span style="display: block; height: 1.2em;"></span>';
    }
    return `<span ${dirAttr} style="display: block; text-align: ${textAlign};">${line}</span>`;
  }).join('');

  // Inline code (single backtick - before monospace)
  formatted = formatted.replace(/`([^`]+)`/g, '<code style="background-color: rgba(128, 128, 128, 0.15); padding: 2px 4px; border-radius: 3px; font-family: monospace; font-size: 0.95em;">$1</code>');

  // Monospace (triple backticks)
  formatted = formatted.replace(/```([^`]+)```/g, '<span style="font-family: monospace; background-color: rgba(128, 128, 128, 0.15); padding: 2px 4px; border-radius: 3px;">$1</span>');

  // Bold and Italic (***text***)
  formatted = formatted.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
  
  // Bold (**text** or *text*)
  formatted = formatted.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  formatted = formatted.replace(/\*(.+?)\*/g, '<strong>$1</strong>');
  
  // Italic (_text_)
  formatted = formatted.replace(/_(.+?)_/g, '<em>$1</em>');
  
  // Strikethrough (~text~)
  formatted = formatted.replace(/~(.+?)~/g, '<del>$1</del>');

  // Note: newlines are already handled in line processing above
  // No need for additional replace here

  return formatted;
}

// Detect if text is predominantly RTL (for overall layout comfort)
export function detectRTL(text: string): boolean {
  if (!text) return false;
  
  // Check if message has any RTL content
  const rtlChars = text.match(/[\u0590-\u05FF\u0600-\u06FF\u0700-\u074F\u0750-\u077F\u08A0-\u08FF]/g);
  
  return !!rtlChars && rtlChars.length > 0;
}
