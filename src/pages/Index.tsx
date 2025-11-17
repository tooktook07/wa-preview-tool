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
      <footer className="mt-12 border-t bg-card">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>
            Supports <strong>Bold (*text*)</strong>, <em>Italic (_text_)</em>,{" "}
            <s>Strikethrough (~text~)</s>, <code className="bg-muted px-1 rounded">Monospace (```text```)</code>,{" "}
            <code className="bg-muted px-1 rounded">Inline Code (`text`)</code>, Lists, Quotes, and more
          </p>
          <p className="mt-2">Includes full RTL language support for Arabic and Hebrew</p>
        </div>
      </footer>
    </div>
  );
}
