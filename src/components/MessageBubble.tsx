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
        {/* WhatsApp-style curved tail */}
        <svg
          viewBox="0 0 8 13"
          className={`absolute top-0 ${mode === "sender" ? '-right-[7px]' : '-left-[7px]'} w-2 h-3`}
          style={{ fill: bubbleColor }}
        >
          {mode === "sender" ? (
            <path d="M1.533,3.568L8.009,0.235C8.009,0.235,7.762,5.188,7.762,6.034c0,0.846,0.246,5.799,0.246,5.799L1.533,8.5 C1.533,8.5,3.579,6.548,3.579,6.034S1.533,3.568,1.533,3.568z" />
          ) : (
            <path d="M6.467,3.568L-0.009,0.235C-0.009,0.235,0.238,5.188,0.238,6.034c0,0.846-0.246,5.799-0.246,5.799L6.467,8.5 C6.467,8.5,4.421,6.548,4.421,6.034S6.467,3.568,6.467,3.568z" />
          )}
        </svg>
        
        
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
