import { useMemo, useState } from "react";
import MessageComposer from "@/components/MessageComposer";
import WhatsAppPreview from "@/components/WhatsAppPreview";
import { MessageSquare, History, HelpCircle, Shield } from "lucide-react";
import { ThemeMode, DeviceMode, MessageMode } from "@/components/PreviewControls";
import { detectRTL } from "@/utils/formatParser";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useDraftManager } from "@/hooks/use-draft-manager";
import { DraftTabs } from "@/components/DraftTabs";
import { VersionHistory } from "@/components/VersionHistory";
import { HelpModal } from "@/components/HelpModal";
import { Button } from "@/components/ui/button";
import { OnboardingTour } from "@/components/OnboardingTour";
import { useOnboarding } from "@/hooks/use-onboarding";

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
  
  const { runTour, completeTour, skipTour, restartTour } = useOnboarding();
  
  const isRTL = useMemo(() => detectRTL(activeDraft.content), [activeDraft.content]);

  return (
    <div className="min-h-screen bg-background">
      <OnboardingTour 
        run={runTour}
        onComplete={completeTour}
        onSkip={skipTour}
      />
      
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-3 sm:px-6 py-2 sm:py-3">
          <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" strokeWidth={2} />
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-3 min-w-0">
                  <h1 className="text-sm sm:text-lg font-semibold text-foreground tracking-tight truncate">WhatsApp Preview Tool</h1>
                  <p className="text-[10px] sm:text-xs text-muted-foreground hidden md:block">
                    Private message formatting - everything stays on your device
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowHelp(true)}
                  className="flex items-center gap-1 sm:gap-2 h-9 sm:h-8 px-2 sm:px-3"
                  data-tour="help-button"
                >
                  <HelpCircle className="h-4 w-4 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline text-xs">Help</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowVersionHistory(true)}
                  className="flex items-center gap-1 sm:gap-2 h-9 sm:h-8 px-2 sm:px-3"
                  data-tour="version-history"
                >
                  <History className="h-4 w-4 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline text-xs">History</span>
                  {activeDraft.versions.length > 0 && (
                    <span className="ml-0.5 sm:ml-1 text-[10px] sm:text-xs bg-primary/10 text-primary px-1 sm:px-1.5 py-0.5 rounded">
                      {activeDraft.versions.length}
                    </span>
                  )}
                </Button>
              </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
        <div className="grid lg:grid-cols-2 gap-4 sm:gap-6" data-tour="main-grid">
          <div data-tour="composer">
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
          </div>
          <div data-tour="preview">
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
        onRestartTour={restartTour}
      />

      {/* Footer */}
      <footer className="mt-auto border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-6 py-4">
          {/* Privacy Badge Section */}
          <div className="flex items-start gap-2.5 p-2.5 rounded-md bg-muted/30 border border-border/50 mb-3">
            <Shield className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0 mt-0.5 opacity-60" />
            <div className="flex-1 min-w-0">
              <h3 className="text-xs font-medium text-foreground mb-1 opacity-90">
                Private & Secure
              </h3>
              <ul className="text-[11px] text-muted-foreground space-y-0.5 opacity-80">
                <li>• Runs locally in your browser</li>
                <li>• No data sent to servers</li>
                <li>• Stored on your device only</li>
              </ul>
            </div>
          </div>
          
          {/* Features Section */}
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
