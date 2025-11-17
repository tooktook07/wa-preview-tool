interface MessageBubbleProps {
  message: string;
  formattedMessage: string;
  bubbleColor: string;
  textColor: string;
  theme: "dark" | "light";
  mode: "sender" | "receiver";
  isRTL: boolean;
  isMobile?: boolean;
}

export default function MessageBubble({
  message,
  formattedMessage,
  bubbleColor,
  textColor,
  theme,
  mode,
  isRTL,
  isMobile = false,
}: MessageBubbleProps) {
  const padding = isMobile ? "px-2.5 py-1.5" : "px-3 py-2";
  const fontSize = "14px";
  const timeSize = isMobile ? "text-[10px]" : "text-[11px]";
  const checkmarkSize = isMobile ? "w-3.5 h-3.5" : "w-4 h-4";

  return (
    <div className={`flex ${mode === "sender" ? 'justify-end' : 'justify-start'}`}>
      <div 
        className={`relative rounded-lg shadow-md transition-all duration-200 ${isMobile ? 'max-w-[75%]' : 'max-w-[85%]'}`}
        style={{ backgroundColor: bubbleColor }}
      >
        <div 
          className={`absolute top-0 ${mode === "sender" ? 'right-0 -mr-2' : 'left-0 -ml-2'} w-0 h-0 
            border-t-[10px]
            ${mode === "sender" ? 'border-l-[10px] border-l-transparent' : 'border-r-[10px] border-r-transparent'}`}
          style={{ borderTopColor: bubbleColor }}
        />
        
        <div className={padding}>
          {message ? (
            <div 
              className="whitespace-pre-wrap break-words leading-relaxed"
              style={{ color: textColor, fontSize }}
              dangerouslySetInnerHTML={{ __html: formattedMessage }}
            />
          ) : (
            <p 
              className={`italic ${isMobile ? 'text-sm' : ''}`}
              style={{ color: theme === "dark" ? "#8696a0" : "#667781" }}
            >
              Your message will appear here...
            </p>
          )}
          
          {message && (
            <div className={`flex items-center gap-1 mt-1 ${isRTL ? 'justify-start' : 'justify-end'}`}>
              <span 
                className={timeSize}
                style={{ color: theme === "dark" ? "#8696a0" : "#667781" }}
              >
                {new Date().toLocaleTimeString('en-US', { 
                  hour: '2-digit', 
                  minute: '2-digit',
                  hour12: false 
                })}
              </span>
              {mode === "sender" && (
                <svg 
                  viewBox="0 0 16 15" 
                  className={`${checkmarkSize} text-blue-500`}
                  fill="currentColor"
                >
                  <path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"/>
                </svg>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
