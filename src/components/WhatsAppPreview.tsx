import { parseWhatsAppFormatting, detectRTL } from "@/utils/formatParser";
import { useMemo } from "react";

interface WhatsAppPreviewProps {
  message: string;
}

export default function WhatsAppPreview({ message }: WhatsAppPreviewProps) {
  const isRTL = useMemo(() => detectRTL(message), [message]);
  const formattedMessage = useMemo(() => parseWhatsAppFormatting(message), [message]);

  return (
    <div className="flex flex-col h-full bg-card rounded-lg border shadow-sm">
      <div className="p-4 border-b bg-whatsapp-green text-white">
        <h2 className="text-lg font-semibold">WhatsApp Preview</h2>
        <p className="text-sm opacity-90">Live preview of your formatted message</p>
      </div>
      
      <div className="flex-1 p-6 bg-whatsapp-bg">
        <div className="max-w-2xl mx-auto space-y-4">
          {/* WhatsApp message bubble */}
          <div className={`flex ${isRTL ? 'justify-start' : 'justify-end'}`}>
            <div 
              className="relative max-w-[85%] bg-whatsapp-bubble rounded-lg shadow-sm"
              dir={isRTL ? 'rtl' : 'ltr'}
            >
              {/* Message tail */}
              <div 
                className={`absolute top-0 ${isRTL ? 'left-0 -ml-2' : 'right-0 -mr-2'} w-0 h-0 
                  border-t-[10px] border-t-whatsapp-bubble
                  ${isRTL ? 'border-r-[10px] border-r-transparent' : 'border-l-[10px] border-l-transparent'}`}
              />
              
              {/* Message content */}
              <div className="px-3 py-2">
                {message ? (
                  <div 
                    className="text-whatsapp-text whitespace-pre-wrap break-words leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: formattedMessage }}
                  />
                ) : (
                  <p className="text-muted-foreground italic">
                    Your message will appear here...
                  </p>
                )}
                
                {/* Timestamp */}
                {message && (
                  <div className={`flex items-center gap-1 mt-1 ${isRTL ? 'justify-start' : 'justify-end'}`}>
                    <span className="text-[11px] text-muted-foreground">
                      {new Date().toLocaleTimeString('en-US', { 
                        hour: '2-digit', 
                        minute: '2-digit',
                        hour12: false 
                      })}
                    </span>
                    <svg 
                      viewBox="0 0 16 15" 
                      className="w-4 h-4 text-blue-500"
                      fill="currentColor"
                    >
                      <path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"/>
                    </svg>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-3 border-t bg-muted/30 text-xs text-muted-foreground">
        {isRTL ? (
          <p>🌍 RTL language detected - Text alignment adjusted</p>
        ) : (
          <p>✨ Preview updates in real-time as you type</p>
        )}
      </div>
    </div>
  );
}
