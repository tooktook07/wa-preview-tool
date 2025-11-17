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
        {/* WhatsApp-style tail */}
        {mode === "sender" ? (
          <svg
            viewBox="0 0 11 20"
            className="absolute -right-[5px] top-0 w-[11px] h-[20px]"
            style={{ fill: bubbleColor }}
          >
            <path d="M8.516,8.457c0.142-1.521,0.258-3.043,0.421-4.562c0.059-0.543,0.135-1.085,0.227-1.624 c0.033-0.191,0.191-0.279,0.348-0.174c0.145,0.097,0.206,0.273,0.159,0.465c-0.572,2.326-1.085,4.664-1.607,6.998 c-0.206,0.926-0.417,1.851-0.629,2.777c-0.073,0.318-0.264,0.533-0.555,0.655c-0.576,0.241-1.213,0.326-1.836,0.261 c-1.207-0.125-2.347-0.546-3.459-1.035c-1.231-0.542-2.419-1.174-3.531-1.93c-0.141-0.096-0.208-0.229-0.173-0.402 c0.033-0.164,0.149-0.263,0.311-0.263c0.115,0,0.229,0.047,0.337,0.104c1.448,0.757,2.938,1.427,4.479,1.979 c0.958,0.343,1.938,0.622,2.957,0.686c0.513,0.032,1.021-0.013,1.476-0.287c0.166-0.1,0.253-0.237,0.293-0.418 c0.19-0.867,0.375-1.734,0.561-2.601C8.377,9.689,8.446,9.073,8.516,8.457z"/>
          </svg>
        ) : (
          <svg
            viewBox="0 0 11 20"
            className="absolute -left-[5px] top-0 w-[11px] h-[20px]"
            style={{ fill: bubbleColor, transform: 'scaleX(-1)' }}
          >
            <path d="M8.516,8.457c0.142-1.521,0.258-3.043,0.421-4.562c0.059-0.543,0.135-1.085,0.227-1.624 c0.033-0.191,0.191-0.279,0.348-0.174c0.145,0.097,0.206,0.273,0.159,0.465c-0.572,2.326-1.085,4.664-1.607,6.998 c-0.206,0.926-0.417,1.851-0.629,2.777c-0.073,0.318-0.264,0.533-0.555,0.655c-0.576,0.241-1.213,0.326-1.836,0.261 c-1.207-0.125-2.347-0.546-3.459-1.035c-1.231-0.542-2.419-1.174-3.531-1.93c-0.141-0.096-0.208-0.229-0.173-0.402 c0.033-0.164,0.149-0.263,0.311-0.263c0.115,0,0.229,0.047,0.337,0.104c1.448,0.757,2.938,1.427,4.479,1.979 c0.958,0.343,1.938,0.622,2.957,0.686c0.513,0.032,1.021-0.013,1.476-0.287c0.166-0.1,0.253-0.237,0.293-0.418 c0.19-0.867,0.375-1.734,0.561-2.601C8.377,9.689,8.446,9.073,8.516,8.457z"/>
          </svg>
        )}
        
        
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
