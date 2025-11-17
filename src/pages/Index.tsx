import { useMemo } from "react";
import MessageComposer from "@/components/MessageComposer";
import WhatsAppPreview from "@/components/WhatsAppPreview";
import { MessageSquare } from "lucide-react";
import { ThemeMode, DeviceMode } from "@/components/PreviewControls";
import { detectRTL } from "@/utils/formatParser";
import { useLocalStorage } from "@/hooks/use-local-storage";

export default function Index() {
  const [message, setMessage] = useLocalStorage("whatsapp-message-draft", "");
  const [theme, setTheme] = useLocalStorage<ThemeMode>("whatsapp-preview-theme", "light");
  const [device, setDevice] = useLocalStorage<DeviceMode>("whatsapp-preview-device", "desktop");
  
  const isRTL = useMemo(() => detectRTL(message), [message]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MessageSquare className="h-5 w-5 text-primary" strokeWidth={2} />
              <div className="flex items-baseline gap-3">
                <h1 className="text-lg font-semibold text-foreground tracking-tight">WhatsApp Preview Tool</h1>
                <p className="text-xs text-muted-foreground hidden sm:block">
                  Format and preview messages in real-time
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-6">
          <MessageComposer value={message} onChange={setMessage} isRTL={isRTL} />
          <WhatsAppPreview 
            message={message}
            theme={theme}
            device={device}
            onThemeChange={setTheme}
            onDeviceChange={setDevice}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
            <p>
              Supports bold, italic, strikethrough, monospace, inline code, lists, quotes & RTL languages
            </p>
            <p className="opacity-70">
              Made with WhatsApp formatting syntax
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
