// Parse WhatsApp formatting markers and convert to HTML
export function parseWhatsAppFormatting(text: string): string {
  if (!text) return '';
  
  // Escape HTML to prevent XSS
  let formatted = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Process line-based formatting first (quotes, lists)
  const lines = formatted.split('\n');
  formatted = lines.map(line => {
    // Quote blocks (> text)
    if (/^&gt;\s/.test(line)) {
      return `<div style="border-left: 3px solid currentColor; padding-left: 10px; margin: 4px 0; opacity: 0.8;">${line.substring(4)}</div>`;
    }
    
    // Numbered lists (1. text, 2. text)
    if (/^\d+\.\s/.test(line)) {
      const match = line.match(/^(\d+)\.\s(.+)$/);
      if (match) {
        return `<div style="display: flex; gap: 8px; margin: 2px 0;"><span style="min-width: 20px;">${match[1]}.</span><span>${match[2]}</span></div>`;
      }
    }
    
    // Bulleted lists (* text or - text)
    if (/^[-*]\s/.test(line)) {
      return `<div style="display: flex; gap: 8px; margin: 2px 0;"><span style="min-width: 20px;">•</span><span>${line.substring(2)}</span></div>`;
    }
    
    return line;
  }).join('\n');

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

  // Convert newlines to <br> tags
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
