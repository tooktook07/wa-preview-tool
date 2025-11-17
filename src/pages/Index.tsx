import { useState } from "react";
import MessageComposer from "@/components/MessageComposer";
import WhatsAppPreview from "@/components/WhatsAppPreview";
import { MessageSquare } from "lucide-react";

export default function Index() {
  const [message, setMessage] = useState("");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-whatsapp-green text-white rounded-lg">
              <MessageSquare className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">WhatsApp Message Preview</h1>
              <p className="text-sm text-muted-foreground">
                Compose and preview your formatted messages in real-time
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-6">
          <MessageComposer value={message} onChange={setMessage} />
          <WhatsAppPreview message={message} />
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t bg-card">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>
            Supports <strong>Bold (*text*)</strong>, <em>Italic (_text_)</em>,{" "}
            <s>Strikethrough (~text~)</s>, and <code className="bg-muted px-1 rounded">Monospace (```text```)</code>
          </p>
          <p className="mt-2">Includes full RTL language support for Arabic and Hebrew</p>
        </div>
      </footer>
    </div>
  );
}
