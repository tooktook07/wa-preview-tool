import { useMemo, useState } from "react";
import MessageComposer from "@/components/MessageComposer";
import WhatsAppPreview from "@/components/WhatsAppPreview";
import { MessageSquare, History, HelpCircle } from "lucide-react";
import { ThemeMode, DeviceMode, MessageMode } from "@/components/PreviewControls";
import { detectRTL } from "@/utils/formatParser";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useDraftManager } from "@/hooks/use-draft-manager";
import { DraftTabs } from "@/components/DraftTabs";
import { VersionHistory } from "@/components/VersionHistory";
import { HelpModal } from "@/components/HelpModal";
import { Button } from "@/components/ui/button";

export default function Index() {
  const { 
    drafts, 
    activeDraft, 
    switchDraft, 
    updateDraftContent, 
    renameDraft, 
    clearDraft,
    restoreVersion,
    deleteVersion 
  } = useDraftManager();
  
  const [theme, setTheme] = useLocalStorage<ThemeMode>("whatsapp-preview-theme", "light");
  const [device, setDevice] = useLocalStorage<DeviceMode>("whatsapp-preview-device", "mobile");
  const [mode, setMode] = useLocalStorage<MessageMode>("whatsapp-message-mode", "sender");
  const [showVersionHistory, setShowVersionHistory] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  
  const isRTL = useMemo(() => detectRTL(activeDraft.content), [activeDraft.content]);

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
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowHelp(true)}
                  className="flex items-center gap-2"
                >
                  <HelpCircle className="h-4 w-4" />
                  <span className="hidden sm:inline">Help</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowVersionHistory(true)}
                  className="flex items-center gap-2"
                >
                  <History className="h-4 w-4" />
                  <span className="hidden sm:inline">History</span>
                  {activeDraft.versions.length > 0 && (
                    <span className="ml-1 text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded">
                      {activeDraft.versions.length}
                    </span>
                  )}
                </Button>
              </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-6">
          <MessageComposer 
            value={activeDraft.content} 
            onChange={updateDraftContent} 
            isRTL={isRTL}
            drafts={drafts}
            activeDraftId={activeDraft.id}
            onSwitchDraft={switchDraft}
            onRenameDraft={renameDraft}
            onClearDraft={clearDraft}
          />
          <WhatsAppPreview 
            message={activeDraft.content} 
            theme={theme}
            device={device}
            mode={mode}
            onThemeChange={setTheme}
            onDeviceChange={setDevice}
            onModeChange={setMode}
          />
        </div>
      </main>
      
      <VersionHistory 
        open={showVersionHistory}
        onOpenChange={setShowVersionHistory}
        draft={activeDraft}
        onRestore={restoreVersion}
        onDelete={deleteVersion}
      />

      <HelpModal 
        open={showHelp}
        onOpenChange={setShowHelp}
      />

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
