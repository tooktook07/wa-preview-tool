import { parseWhatsAppFormatting, detectRTL, detectLineDirection } from "@/utils/formatParser";
import { useMemo } from "react";
import PreviewControls, { ThemeMode, DeviceMode, MessageMode } from "./PreviewControls";
import MessageBubble from "./MessageBubble";
interface WhatsAppPreviewProps {
  message: string;
  theme: ThemeMode;
  device: DeviceMode;
  mode: MessageMode;
  onThemeChange: (theme: ThemeMode) => void;
  onDeviceChange: (device: DeviceMode) => void;
  onModeChange: (mode: MessageMode) => void;
}
export default function WhatsAppPreview({
  message,
  theme,
  device,
  mode,
  onThemeChange,
  onDeviceChange,
  onModeChange
}: WhatsAppPreviewProps) {
  // Detect if message has any RTL content (for overall layout comfort)
  const isRTL = useMemo(() => detectRTL(message), [message]);
  // Format message with per-line direction detection
  const formattedMessage = useMemo(() => parseWhatsAppFormatting(message), [message]);

  // Theme-specific colors
  const bgColor = theme === "dark" ? "#0b141a" : "#efeae2";
  const bubbleColor = mode === "sender" ? theme === "dark" ? "#005c4b" : "#d9fdd3" : theme === "dark" ? "#202c33" : "#ffffff";
  const textColor = theme === "dark" ? "#e9edef" : "#111b21";
  const headerBg = theme === "dark" ? "#202c33" : "#008069";
  const headerText = "#ffffff";

  // Device-specific frame
  const isMobile = device === "mobile";
  return <div className="flex flex-col h-full bg-card rounded-lg border shadow-sm">
      <div className="p-3 border-b bg-muted/30 flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-foreground">WhatsApp Preview</h2>
          <p className="text-xs text-muted-foreground">Live preview of your message</p>
        </div>
        <PreviewControls theme={theme} device={device} mode={mode} onThemeChange={onThemeChange} onDeviceChange={onDeviceChange} onModeChange={onModeChange} />
      </div>
      
      <div className="flex-1 p-6 flex items-center justify-center" style={{
      backgroundColor: theme === "dark" ? "#0e1418" : "#d1d7db"
    }}>
        {/* Device Frame */}
        <div className={`relative transition-all duration-300 ${isMobile ? 'w-[375px] h-[812px]' : 'w-full max-w-5xl h-[600px]'}`}>
          {isMobile ?
        // Realistic iPhone Frame
        <div className="relative w-full h-full">
              {/* Phone Body */}
              <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 rounded-[50px] shadow-2xl p-[3px]">
                {/* Screen Bezel */}
                <div className="w-full h-full bg-black rounded-[47px] p-[10px] relative overflow-hidden">
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[180px] h-[30px] bg-black rounded-b-[20px] z-50 flex items-center justify-center gap-2">
                    <div className="w-[60px] h-[5px] bg-gray-800 rounded-full"></div>
                    <div className="w-[10px] h-[10px] bg-gray-900 rounded-full border border-gray-700"></div>
                  </div>
                  
                  {/* Screen Content */}
                  <div className="w-full h-full bg-white rounded-[37px] overflow-hidden relative">
                    {/* WhatsApp Interface */}
                    <div className="h-full flex flex-col">
                      {/* Status Bar */}
                      <div className="h-11 flex items-center justify-between px-6 pt-2" style={{
                    backgroundColor: headerBg
                  }}>
                        <span className="text-sm font-semibold" style={{
                      color: headerText
                    }}>9:41</span>
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill={headerText} viewBox="0 0 24 24">
                            <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" />
                          </svg>
                          <svg className="w-3 h-3 ml-1" fill={headerText} viewBox="0 0 24 24">
                            <path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33c0 .74.6 1.34 1.33 1.34h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z" />
                          </svg>
                        </div>
                      </div>
                      
                      {/* WhatsApp Header */}
                      <div className="flex items-center gap-3 px-4 py-2.5" style={{
                    backgroundColor: headerBg
                  }}>
                        <button>
                          <svg viewBox="0 0 24 24" className="w-6 h-6" fill={headerText}>
                            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
                          </svg>
                        </button>
                        <div className="w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center text-sm font-semibold text-gray-700">
                          JD
                        </div>
                        <div className="flex-1">
                          <h3 className="text-base font-semibold" style={{
                        color: headerText
                      }}>John Doe</h3>
                          <p className="text-xs opacity-90" style={{
                        color: headerText
                      }}>online</p>
                        </div>
                        <div className="flex gap-5">
                          <svg viewBox="0 0 24 24" className="w-5 h-5" fill={headerText}>
                            <path d="M15.5 1h-8C6.12 1 5 2.12 5 3.5v17C5 21.88 6.12 23 7.5 23h8c1.38 0 2.5-1.12 2.5-2.5v-17C18 2.12 16.88 1 15.5 1zm-4 21c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4.5-4H7V4h9v14z" />
                          </svg>
                          <svg viewBox="0 0 24 24" className="w-5 h-5" fill={headerText}>
                            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                          </svg>
                        </div>
                      </div>

                      {/* Chat Background */}
                      <div className="flex-1 p-3 overflow-y-auto" style={{
                    backgroundColor: bgColor,
                    backgroundImage: theme === "dark" ? 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 0h100v100H0z\' fill=\'%230b141a\'/%3E%3Cpath d=\'M20 10h60M20 30h40M20 50h50M20 70h45M20 90h55\' stroke=\'%23182229\' stroke-width=\'0.5\' fill=\'none\' opacity=\'0.1\'/%3E%3C/svg%3E")' : 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 0h100v100H0z\' fill=\'%23efeae2\'/%3E%3Cpath d=\'M20 10h60M20 30h40M20 50h50M20 70h45M20 90h55\' stroke=\'%23d1d1d1\' stroke-width=\'0.5\' fill=\'none\' opacity=\'0.2\'/%3E%3C/svg%3E")'
                  }}>
                        <div className="flex flex-col gap-2 max-w-full">
                          <MessageBubble message={message} formattedMessage={formattedMessage} bubbleColor={bubbleColor} textColor={textColor} theme={theme} mode={mode} isRTL={isRTL} isMobile={true} />
                        </div>
                      </div>

                      {/* WhatsApp Input Bar */}
                      <div className="flex items-center gap-2 px-2 py-2 border-t" style={{
                    backgroundColor: theme === "dark" ? "#202c33" : "#f0f2f5",
                    borderColor: theme === "dark" ? "#2a3942" : "#e9edef"
                  }}>
                        <button className="p-1.5">
                          <svg viewBox="0 0 24 24" className="w-5 h-5" fill={theme === "dark" ? "#8696a0" : "#54656f"}>
                            <path d="M9.153 11.603c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962zm-3.204 1.362c-.026-.307-.131 5.218 6.063 5.551 6.066-.25 6.066-5.551 6.066-5.551-6.078 1.416-12.129 0-12.129 0zm11.363 1.108s-.669 1.959-5.051 1.959c-3.505 0-5.388-1.164-5.607-1.959 0 0 5.912 1.055 10.658 0zM11.804 1.011C5.609 1.011.978 6.033.978 12.228s4.826 10.761 11.021 10.761S23.02 18.423 23.02 12.228c.001-6.195-5.021-11.217-11.216-11.217zM12 21.354c-5.273 0-9.381-3.886-9.381-9.159s3.942-9.548 9.215-9.548 9.548 4.275 9.548 9.548c-.001 5.272-4.109 9.159-9.382 9.159zm3.108-9.751c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962z" />
                          </svg>
                        </button>
                        <div className="flex-1 px-3 py-1.5 rounded-lg text-sm" style={{
                      backgroundColor: theme === "dark" ? "#2a3942" : "#ffffff",
                      color: theme === "dark" ? "#d1d7db" : "#3b4a54"
                    }}>
                          Type a message
                        </div>
                        <button className="p-1.5">
                          <svg viewBox="0 0 24 24" className="w-5 h-5" fill={theme === "dark" ? "#8696a0" : "#54656f"}>
                            <path d="M11.999 14.942c2.001 0 3.531-1.53 3.531-3.531V4.35c0-2.001-1.53-3.531-3.531-3.531S8.469 2.35 8.469 4.35v7.061c0 2.001 1.53 3.531 3.53 3.531zm6.238-3.53c0 3.531-2.942 6.002-6.237 6.002s-6.237-2.471-6.237-6.002H3.761c0 4.001 3.178 7.297 7.061 7.885v3.884h2.354v-3.884c3.884-.588 7.061-3.884 7.061-7.885h-2z" />
                          </svg>
                        </button>
                      </div>
                      
                      {/* Home Indicator */}
                      <div className="h-5 flex items-center justify-center" style={{
                    backgroundColor: theme === "dark" ? "#0b141a" : "#f0f2f5"
                  }}>
                        <div className="w-32 h-1 bg-gray-900 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> :
        // Desktop View
        <div className="w-full h-full rounded-lg border border-gray-300 shadow-xl overflow-hidden">
              {/* WhatsApp Header */}
              <div className="flex items-center gap-3 px-4 py-3" style={{
            backgroundColor: headerBg
          }}>
                <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center font-semibold text-gray-700">
                  JD
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold" style={{
                color: headerText
              }}>John Doe</h3>
                  <p className="text-xs opacity-90" style={{
                color: headerText
              }}>online</p>
                </div>
                <div className="flex gap-6">
                  <svg viewBox="0 0 24 24" className="w-6 h-6" fill={headerText}>
                    <path d="M15.5 1h-8C6.12 1 5 2.12 5 3.5v17C5 21.88 6.12 23 7.5 23h8c1.38 0 2.5-1.12 2.5-2.5v-17C18 2.12 16.88 1 15.5 1zm-4 21c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4.5-4H7V4h9v14z" />
                  </svg>
                  <svg viewBox="0 0 24 24" className="w-6 h-6" fill={headerText}>
                    <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                  </svg>
                </div>
              </div>

              {/* Chat Background */}
              <div className="flex-1 p-4 overflow-y-auto h-[calc(100%-120px)]" style={{
            backgroundColor: bgColor,
            backgroundImage: theme === "dark" ? 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 0h100v100H0z\' fill=\'%230b141a\'/%3E%3Cpath d=\'M20 10h60M20 30h40M20 50h50M20 70h45M20 90h55\' stroke=\'%23182229\' stroke-width=\'0.5\' fill=\'none\' opacity=\'0.1\'/%3E%3C/svg%3E")' : 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 0h100v100H0z\' fill=\'%23efeae2\'/%3E%3Cpath d=\'M20 10h60M20 30h40M20 50h50M20 70h45M20 90h55\' stroke=\'%23d1d1d1\' stroke-width=\'0.5\' fill=\'none\' opacity=\'0.2\'/%3E%3C/svg%3E")'
          }}>
                <div className="flex flex-col gap-2 max-w-full">
                  <MessageBubble message={message} formattedMessage={formattedMessage} bubbleColor={bubbleColor} textColor={textColor} theme={theme} mode={mode} isRTL={isRTL} isMobile={false} />
                </div>
              </div>

              {/* WhatsApp Input Bar */}
              <div className="flex items-center gap-2 px-3 py-2 border-t" style={{
            backgroundColor: theme === "dark" ? "#202c33" : "#f0f2f5",
            borderColor: theme === "dark" ? "#2a3942" : "#e9edef"
          }}>
                <button className="p-2">
                  <svg viewBox="0 0 24 24" className="w-6 h-6" fill={theme === "dark" ? "#8696a0" : "#54656f"}>
                    <path d="M9.153 11.603c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962zm-3.204 1.362c-.026-.307-.131 5.218 6.063 5.551 6.066-.25 6.066-5.551 6.066-5.551-6.078 1.416-12.129 0-12.129 0zm11.363 1.108s-.669 1.959-5.051 1.959c-3.505 0-5.388-1.164-5.607-1.959 0 0 5.912 1.055 10.658 0zM11.804 1.011C5.609 1.011.978 6.033.978 12.228s4.826 10.761 11.021 10.761S23.02 18.423 23.02 12.228c.001-6.195-5.021-11.217-11.216-11.217zM12 21.354c-5.273 0-9.381-3.886-9.381-9.159s3.942-9.548 9.215-9.548 9.548 4.275 9.548 9.548c-.001 5.272-4.109 9.159-9.382 9.159zm3.108-9.751c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962z" />
                  </svg>
                </button>
                <div className="flex-1 px-3 py-2 rounded-lg text-sm" style={{
              backgroundColor: theme === "dark" ? "#2a3942" : "#ffffff",
              color: theme === "dark" ? "#d1d7db" : "#3b4a54"
            }}>
                  Type a message
                </div>
                <button className="p-2">
                  <svg viewBox="0 0 24 24" className="w-6 h-6" fill={theme === "dark" ? "#8696a0" : "#54656f"}>
                    <path d="M11.999 14.942c2.001 0 3.531-1.53 3.531-3.531V4.35c0-2.001-1.53-3.531-3.531-3.531S8.469 2.35 8.469 4.35v7.061c0 2.001 1.53 3.531 3.53 3.531zm6.238-3.53c0 3.531-2.942 6.002-6.237 6.002s-6.237-2.471-6.237-6.002H3.761c0 4.001 3.178 7.297 7.061 7.885v3.884h2.354v-3.884c3.884-.588 7.061-3.884 7.061-7.885h-2z" />
                  </svg>
                </button>
              </div>
            </div>}
        </div>
      </div>
      
      <div className="p-3 border-t bg-muted/30 text-xs text-muted-foreground">
        {isRTL ? <p>🌍 RTL language detected - Text alignment adjusted</p> : <p>✨ Preview updates in real-time as you type</p>}
      </div>
    </div>;
}