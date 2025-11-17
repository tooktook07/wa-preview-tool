import { Button } from "@/components/ui/button";

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void;
}

const COMMON_EMOJIS = [
  "😀", "😃", "😄", "😁", "😅", "😂", "🤣", "😊", "😇", "🙂",
  "😉", "😍", "🥰", "😘", "😗", "😙", "😚", "🤗", "🤩", "🤔",
  "🤨", "😐", "😑", "😶", "🙄", "😏", "😣", "😥", "😮", "🤐",
  "😯", "😪", "😫", "🥱", "😴", "😌", "😛", "😜", "😝", "🤤",
  "😒", "😓", "😔", "😕", "🙃", "🤑", "😲", "☹️", "🙁", "😖",
  "👍", "👎", "👌", "✌️", "🤞", "🤟", "🤘", "🤙", "👈", "👉",
  "👆", "👇", "☝️", "👏", "🙌", "👐", "🤲", "🙏", "✍️", "💪",
  "❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "🤍", "🤎", "💔",
  "❣️", "💕", "💞", "💓", "💗", "💖", "💘", "💝", "💟", "☮️",
  "✨", "💫", "⭐", "🌟", "💥", "🔥", "🌈", "☀️", "🌤️", "⛅",
];

export default function EmojiPicker({ onEmojiSelect }: EmojiPickerProps) {
  return (
    <div className="p-4 bg-background">
      <div className="grid grid-cols-10 gap-2 max-h-40 overflow-y-auto">
        {COMMON_EMOJIS.map((emoji) => (
          <Button
            key={emoji}
            variant="ghost"
            size="sm"
            onClick={() => onEmojiSelect(emoji)}
            className="h-8 w-8 p-0 text-lg hover:bg-accent"
          >
            {emoji}
          </Button>
        ))}
      </div>
      <div className="mt-3 pt-3 border-t border-border text-center">
        <a 
          href="https://emojidb.org/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-xs text-muted-foreground hover:text-foreground transition-colors underline"
        >
          Explore more emojis
        </a>
      </div>
    </div>
  );
}
