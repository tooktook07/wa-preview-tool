export interface FormatPreset {
  id: string;
  name: string;
  icon: string;
  description: string;
  transform: (text: string) => string;
}

const capitalizeFirstLetter = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const professionalTransform = (text: string): string => {
  if (!text.trim()) return text;
  
  // Remove excessive emojis (keep max 1 per line)
  let formatted = text.replace(/(\p{Emoji_Presentation}|\p{Extended_Pictographic}){2,}/gu, '');
  
  // Capitalize first letter of sentences
  formatted = formatted.replace(/(^|[.!?]\s+)([a-z])/g, (match, prefix, letter) => {
    return prefix + letter.toUpperCase();
  });
  
  // Convert informal phrases to formal
  formatted = formatted
    .replace(/\bhey\b/gi, 'Hello')
    .replace(/\byeah\b/gi, 'Yes')
    .replace(/\bnop(e)?\b/gi, 'No')
    .replace(/\bthanks\b/gi, 'Thank you')
    .replace(/\bthx\b/gi, 'Thank you')
    .replace(/\bpls\b/gi, 'please')
    .replace(/\bu\b/gi, 'you')
    .replace(/\br\b/gi, 'are');
  
  // If text has multiple points/items, convert to numbered list
  const sentences = formatted.split(/[.!?]\s+/).filter(s => s.trim());
  if (sentences.length > 2) {
    formatted = sentences.map((s, i) => `${i + 1}. ${s.trim()}`).join('\n\n');
  }
  
  // Ensure proper ending punctuation
  if (!/[.!?]$/.test(formatted.trim())) {
    formatted = formatted.trim() + '.';
  }
  
  return formatted;
};

const casualTransform = (text: string): string => {
  if (!text.trim()) return text;
  
  let formatted = text;
  
  // Convert formal phrases to casual
  formatted = formatted
    .replace(/\bHello\b/g, 'Hey')
    .replace(/\bGreetings\b/g, 'Hi')
    .replace(/\bThank you\b/g, 'Thanks')
    .replace(/\bI would like to\b/g, "I'd like to")
    .replace(/\bI will\b/g, "I'll")
    .replace(/\bcannot\b/g, "can't")
    .replace(/\bdo not\b/g, "don't")
    .replace(/\bdoes not\b/g, "doesn't");
  
  // Break long sentences into shorter ones
  formatted = formatted.replace(/([,;])/g, '.');
  
  // Add casual emojis at strategic points
  formatted = formatted
    .replace(/\b(yes|yeah|sure|okay|ok)\b/gi, '$1 ✅')
    .replace(/\b(no|nope)\b/gi, '$1 ❌')
    .replace(/\b(thank|thanks)\b/gi, '$1 🙏')
    .replace(/\b(hello|hey|hi)\b/gi, '$1 👋')
    .replace(/\b(great|awesome|cool)\b/gi, '$1 😊');
  
  return formatted;
};

const announcementTransform = (text: string): string => {
  if (!text.trim()) return text;
  
  let formatted = text;
  
  // Extract main topic for header (first sentence or line)
  const lines = formatted.split('\n');
  const firstLine = lines[0].trim();
  const rest = lines.slice(1).join('\n').trim() || formatted.replace(firstLine, '').trim();
  
  // Create bold header
  let result = `*📢 ANNOUNCEMENT*\n\n`;
  
  // Add main topic as bold heading
  if (firstLine) {
    result += `*${capitalizeFirstLetter(firstLine.replace(/[.!?]$/, ''))}*\n\n`;
  }
  
  // Parse rest of content
  if (rest) {
    const sentences = rest.split(/[.!?]\s+/).filter(s => s.trim());
    
    // Check if there are action items (keywords: please, need to, must, should, action)
    const actionKeywords = /please|need to|must|should|action|required/i;
    const hasActions = sentences.some(s => actionKeywords.test(s));
    
    if (hasActions) {
      const actionItems: string[] = [];
      const otherInfo: string[] = [];
      
      sentences.forEach(s => {
        if (actionKeywords.test(s)) {
          actionItems.push(s.trim());
        } else {
          otherInfo.push(s.trim());
        }
      });
      
      // Add other info first
      if (otherInfo.length > 0) {
        result += otherInfo.join('. ') + '.\n\n';
      }
      
      // Add action items as bullet list
      if (actionItems.length > 0) {
        result += `*Action Required:*\n`;
        actionItems.forEach(item => {
          result += `• ${capitalizeFirstLetter(item)}\n`;
        });
      }
    } else {
      // Convert to bullet points
      result += sentences.map(s => `• ${capitalizeFirstLetter(s)}`).join('\n');
    }
  }
  
  result += `\n\nThank you! 🙏`;
  
  return result;
};

export const presets: FormatPreset[] = [
  {
    id: 'professional',
    name: 'Professional',
    icon: '💼',
    description: 'Format for business communication with proper structure',
    transform: professionalTransform,
  },
  {
    id: 'casual',
    name: 'Casual',
    icon: '😊',
    description: 'Friendly and conversational tone with emojis',
    transform: casualTransform,
  },
  {
    id: 'announcement',
    name: 'Announcement',
    icon: '📢',
    description: 'Important updates with clear structure and action items',
    transform: announcementTransform,
  },
];
