import { parseWhatsAppFormatting, detectRTL } from "@/utils/formatParser";
import { useMemo } from "react";
import PreviewControls, { ThemeMode, DeviceMode } from "./PreviewControls";

interface WhatsAppPreviewProps {
  message: string;
  theme: ThemeMode;
  device: DeviceMode;
  onThemeChange: (theme: ThemeMode) => void;
  onDeviceChange: (device: DeviceMode) => void;
}

export default function WhatsAppPreview({ 
  message, 
  theme, 
  device,
  onThemeChange,
  onDeviceChange 
}: WhatsAppPreviewProps) {
  const isRTL = useMemo(() => detectRTL(message), [message]);
  const formattedMessage = useMemo(() => parseWhatsAppFormatting(message), [message]);

  // Theme-specific colors
  const bgColor = theme === "dark" ? "#0b141a" : "#efeae2";
  const bubbleColor = theme === "dark" ? "#005c4b" : "#d9fdd3";
  const textColor = theme === "dark" ? "#e9edef" : "#111b21";
  const headerBg = theme === "dark" ? "#202c33" : "#008069";
  const headerText = "#ffffff";
  
  // Device-specific frame
  const isMobile = device === "mobile";

  return (
    <div className="flex flex-col h-full bg-card rounded-lg border shadow-sm">
      <div 
        className="p-4 border-b flex items-center justify-between"
        style={{ backgroundColor: theme === "dark" ? "#202c33" : "#25D366", color: "#ffffff" }}
      >
        <div>
          <h2 className="text-lg font-semibold">WhatsApp Preview</h2>
          <p className="text-sm opacity-90">Live preview of your formatted message</p>
        </div>
        <PreviewControls
          theme={theme}
          device={device}
          onThemeChange={onThemeChange}
          onDeviceChange={onDeviceChange}
        />
      </div>
      
      <div 
        className="flex-1 p-6 flex items-center justify-center"
        style={{ backgroundColor: theme === "dark" ? "#0e1418" : "#d1d7db" }}
      >
        {/* Device Frame */}
        <div 
          className={`transition-all duration-300 ${
            isMobile 
              ? 'w-[375px] h-[667px] rounded-[40px] border-[14px] border-gray-800 shadow-2xl bg-black p-2' 
              : 'w-full max-w-5xl h-[600px] rounded-lg border border-gray-300 shadow-xl'
          }`}
        >
          {/* Phone notch for mobile */}
          {isMobile && (
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-6 bg-black rounded-b-2xl z-10" />
          )}
          
          {/* WhatsApp Interface */}
          <div className={`h-full flex flex-col ${isMobile ? 'rounded-[26px]' : 'rounded-lg'} overflow-hidden`}>
            {/* WhatsApp Header */}
            <div 
              className="flex items-center gap-3 px-4 py-3"
              style={{ backgroundColor: headerBg }}
            >
              <button className="lg:hidden">
                <svg viewBox="0 0 24 24" className="w-6 h-6" fill={headerText}>
                  <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
                </svg>
              </button>
              <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center text-white font-semibold">
                JD
              </div>
              <div className="flex-1">
                <h3 className="font-semibold" style={{ color: headerText }}>John Doe</h3>
                <p className="text-xs opacity-90" style={{ color: headerText }}>online</p>
              </div>
              <div className="flex gap-4">
                <svg viewBox="0 0 24 24" className="w-6 h-6" fill={headerText}>
                  <path d="M15.5 1h-8C6.12 1 5 2.12 5 3.5v17C5 21.88 6.12 23 7.5 23h8c1.38 0 2.5-1.12 2.5-2.5v-17C18 2.12 16.88 1 15.5 1zm-4 21c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4.5-4H7V4h9v14z"/>
                </svg>
                <svg viewBox="0 0 24 24" className="w-6 h-6" fill={headerText}>
                  <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                </svg>
              </div>
            </div>

            {/* Chat Background */}
            <div 
              className="flex-1 p-4 overflow-y-auto"
              style={{ 
                backgroundColor: bgColor,
                backgroundImage: theme === "dark" 
                  ? 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 0h100v100H0z\' fill=\'%230b141a\'/%3E%3Cpath d=\'M20 10h60M20 30h40M20 50h50M20 70h45M20 90h55\' stroke=\'%23182229\' stroke-width=\'0.5\' fill=\'none\' opacity=\'0.1\'/%3E%3C/svg%3E")'
                  : 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 0h100v100H0z\' fill=\'%23efeae2\'/%3E%3Cpath d=\'M20 10h60M20 30h40M20 50h50M20 70h45M20 90h55\' stroke=\'%23d1d1d1\' stroke-width=\'0.5\' fill=\'none\' opacity=\'0.2\'/%3E%3C/svg%3E")'
              }}
            >
              <div className="flex flex-col gap-2 max-w-full">
                {/* Message Bubble */}
                <div className={`flex ${isRTL ? 'justify-start' : 'justify-end'}`}>
                  <div 
                    className={`relative rounded-lg shadow-md transition-all duration-200 ${
                      isMobile ? 'max-w-[75%]' : 'max-w-[85%]'
                    }`}
                    style={{ backgroundColor: bubbleColor }}
                    dir={isRTL ? 'rtl' : 'ltr'}
                  >
                    <div 
                      className={`absolute top-0 ${isRTL ? 'left-0 -ml-2' : 'right-0 -mr-2'} w-0 h-0 
                        border-t-[10px]
                        ${isRTL ? 'border-r-[10px] border-r-transparent' : 'border-l-[10px] border-l-transparent'}`}
                      style={{ borderTopColor: bubbleColor }}
                    />
                    
                    <div className="px-3 py-2">
                      {message ? (
                        <div 
                          className="whitespace-pre-wrap break-words leading-relaxed"
                          style={{ color: textColor }}
                          dangerouslySetInnerHTML={{ __html: formattedMessage }}
                        />
                      ) : (
                        <p 
                          className="italic"
                          style={{ color: theme === "dark" ? "#8696a0" : "#667781" }}
                        >
                          Your message will appear here...
                        </p>
                      )}
                      
                      {message && (
                        <div className={`flex items-center gap-1 mt-1 ${isRTL ? 'justify-start' : 'justify-end'}`}>
                          <span 
                            className="text-[11px]"
                            style={{ color: theme === "dark" ? "#8696a0" : "#667781" }}
                          >
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

            {/* WhatsApp Input Bar */}
            <div 
              className="flex items-center gap-2 px-3 py-2 border-t"
              style={{ 
                backgroundColor: theme === "dark" ? "#202c33" : "#f0f2f5",
                borderColor: theme === "dark" ? "#2a3942" : "#e9edef"
              }}
            >
              <button className="p-2">
                <svg viewBox="0 0 24 24" className="w-6 h-6" fill={theme === "dark" ? "#8696a0" : "#54656f"}>
                  <path d="M9.153 11.603c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962zm-3.204 1.362c-.026-.307-.131 5.218 6.063 5.551 6.066-.25 6.066-5.551 6.066-5.551-6.078 1.416-12.129 0-12.129 0zm11.363 1.108s-.669 1.959-5.051 1.959c-3.505 0-5.388-1.164-5.607-1.959 0 0 5.912 1.055 10.658 0zM11.804 1.011C5.609 1.011.978 6.033.978 12.228s4.826 10.761 11.021 10.761S23.02 18.423 23.02 12.228c.001-6.195-5.021-11.217-11.216-11.217zM12 21.354c-5.273 0-9.381-3.886-9.381-9.159s3.942-9.548 9.215-9.548 9.548 4.275 9.548 9.548c-.001 5.272-4.109 9.159-9.382 9.159zm3.108-9.751c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962z"/>
                </svg>
              </button>
              <div 
                className="flex-1 px-3 py-2 rounded-lg text-sm"
                style={{ 
                  backgroundColor: theme === "dark" ? "#2a3942" : "#ffffff",
                  color: theme === "dark" ? "#d1d7db" : "#3b4a54"
                }}
              >
                Type a message
              </div>
              <button className="p-2">
                <svg viewBox="0 0 24 24" className="w-6 h-6" fill={theme === "dark" ? "#8696a0" : "#54656f"}>
                  <path d="M11.999 14.942c2.001 0 3.531-1.53 3.531-3.531V4.35c0-2.001-1.53-3.531-3.531-3.531S8.469 2.35 8.469 4.35v7.061c0 2.001 1.53 3.531 3.53 3.531zm6.238-3.53c0 3.531-2.942 6.002-6.237 6.002s-6.237-2.471-6.237-6.002H3.761c0 4.001 3.178 7.297 7.061 7.885v3.884h2.354v-3.884c3.884-.588 7.061-3.884 7.061-7.885h-2z"/>
                </svg>
              </button>
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
