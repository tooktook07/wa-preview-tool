import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bold, Italic, Strikethrough, Code, Code2, List, ListOrdered, Quote, Sparkles, Keyboard, Lightbulb, PlayCircle, Shield, CheckCircle, Database, WifiOff, UserX, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HelpModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRestartTour?: () => void;
}

export function HelpModal({ open, onOpenChange, onRestartTour }: HelpModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] sm:max-w-3xl max-h-[90vh] sm:max-h-[85vh]">
        <DialogHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <DialogTitle className="text-base sm:text-lg">Help & Documentation</DialogTitle>
              <DialogDescription className="text-xs sm:text-sm">
                Learn how to use WhatsApp Preview Tool effectively
              </DialogDescription>
            </div>
            {onRestartTour && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  onOpenChange(false);
                  setTimeout(() => onRestartTour(), 300);
                }}
                className="flex items-center gap-2 w-full sm:w-auto"
              >
                <PlayCircle className="h-4 w-4" />
                <span className="text-xs sm:text-sm">Restart Tour</span>
              </Button>
            )}
          </div>
        </DialogHeader>

        <Tabs defaultValue="getting-started" className="w-full">
          {/* Horizontal scrollable tabs on mobile, grid on desktop */}
          <div className="overflow-x-auto overflow-y-hidden scrollbar-hide -mx-2 px-2 sm:mx-0 sm:px-0 sm:overflow-visible scroll-smooth snap-x snap-mandatory">
            <TabsList className="inline-flex sm:grid w-auto sm:w-full sm:grid-cols-5 gap-1 h-auto min-w-full sm:min-w-0">
              <TabsTrigger 
                value="getting-started" 
                className="flex-shrink-0 text-xs px-3 sm:px-2 h-auto py-2 snap-start"
              >
                <Sparkles className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
                <span className="whitespace-nowrap">Getting Started</span>
              </TabsTrigger>
              <TabsTrigger 
                value="formatting" 
                className="flex-shrink-0 text-xs px-3 sm:px-2 h-auto py-2 snap-start"
              >
                <Bold className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
                <span className="whitespace-nowrap">Formatting</span>
              </TabsTrigger>
              <TabsTrigger 
                value="shortcuts" 
                className="flex-shrink-0 text-xs px-3 sm:px-2 h-auto py-2 snap-start"
              >
                <Keyboard className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
                <span className="whitespace-nowrap">Shortcuts</span>
              </TabsTrigger>
              <TabsTrigger 
                value="privacy" 
                className="flex-shrink-0 text-xs px-3 sm:px-2 h-auto py-2 snap-start"
              >
                <Shield className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
                <span className="whitespace-nowrap">Privacy & Data</span>
              </TabsTrigger>
              <TabsTrigger 
                value="tips" 
                className="flex-shrink-0 text-xs px-3 sm:px-2 h-auto py-2 snap-start"
              >
                <Lightbulb className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
                <span className="whitespace-nowrap">Tips & Tricks</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <ScrollArea className="h-[50vh] sm:h-[500px] mt-4">
            {/* Getting Started Tab */}
            <TabsContent value="getting-started" className="space-y-3 sm:space-y-4 pr-2 sm:pr-4">
              <div>
                <h3 className="font-semibold text-sm sm:text-base mb-2">Welcome to WhatsApp Preview Tool</h3>
                <p className="text-xs sm:text-sm text-muted-foreground mb-4">
                  This tool helps you format and preview WhatsApp messages before sending them. 
                  See exactly how your message will look on different devices and themes.
                </p>
              </div>

              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-sm mb-1.5">How It Works</h4>
                  <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                    <li>Type your message in the composer on the left</li>
                    <li>Use formatting buttons or type markers directly</li>
                    <li>See real-time preview on the right</li>
                    <li>Toggle between device modes and themes</li>
                    <li>Copy formatted text when ready</li>
                  </ol>
                </div>

                <div>
                  <h4 className="font-medium text-sm mb-1.5">Multiple Drafts</h4>
                  <p className="text-sm text-muted-foreground">
                    Use the draft selector in the composer header to manage up to 3 different messages simultaneously. 
                    Switch between drafts instantly - all changes are automatically saved.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-sm mb-1.5">Version History</h4>
                  <p className="text-sm text-muted-foreground">
                    Click the History button in the top-right to view previous versions of your message. 
                    Restore any version with one click.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-sm mb-1.5">Readability Analysis</h4>
                  <p className="text-sm text-muted-foreground">
                    The toolbar shows your message's readability score. Click it to see detailed metrics, 
                    suggestions, and identify overly complex sentences.
                  </p>
                </div>
              </div>
            </TabsContent>

            {/* Formatting Guide Tab */}
            <TabsContent value="formatting" className="space-y-4 pr-4">
              <div>
                <h3 className="font-semibold text-base mb-2">WhatsApp Formatting Syntax</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Use these special markers to format your text. You can type them manually or use the toolbar buttons.
                </p>
              </div>

              <div className="space-y-4">
                <FormatExample
                  icon={Bold}
                  title="Bold"
                  syntax="*text*"
                  example="*Hello World*"
                  description="Wrap text with asterisks"
                />

                <FormatExample
                  icon={Italic}
                  title="Italic"
                  syntax="_text_"
                  example="_Hello World_"
                  description="Wrap text with underscores"
                />

                <FormatExample
                  icon={Strikethrough}
                  title="Strikethrough"
                  syntax="~text~"
                  example="~Hello World~"
                  description="Wrap text with tildes"
                />

                <FormatExample
                  icon={Code2}
                  title="Inline Code"
                  syntax="`text`"
                  example="`const x = 5`"
                  description="Wrap text with single backticks"
                />

                <FormatExample
                  icon={Code}
                  title="Monospace"
                  syntax="```text```"
                  example="```Hello World```"
                  description="Wrap text with triple backticks"
                />

                <FormatExample
                  icon={List}
                  title="Bulleted List"
                  syntax="* item"
                  example="* First item\n* Second item\n* Third item"
                  description="Start lines with asterisk and space"
                />

                <FormatExample
                  icon={ListOrdered}
                  title="Numbered List"
                  syntax="1. item"
                  example="1. First item\n2. Second item\n3. Third item"
                  description="Start lines with number, period, and space"
                />

                <FormatExample
                  icon={Quote}
                  title="Quote"
                  syntax="> text"
                  example="> This is a quote\n> Multi-line quote"
                  description="Start lines with greater-than and space"
                />
              </div>

              <div className="mt-4 p-3 bg-muted/50 rounded-md">
                <h4 className="font-medium text-sm mb-2">Combining Formats</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  You can combine multiple formats:
                </p>
                <code className="text-xs bg-background px-2 py-1 rounded block">
                  *_bold and italic_* or ~*strikethrough bold*~
                </code>
              </div>
            </TabsContent>

            {/* Keyboard Shortcuts Tab */}
            <TabsContent value="shortcuts" className="space-y-4 pr-4">
              <div>
                <h3 className="font-semibold text-base mb-2">Keyboard Shortcuts</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Coming soon! Keyboard shortcuts will be added in a future update to speed up your workflow.
                </p>
              </div>

              <div className="p-4 bg-muted/30 rounded-md">
                <h4 className="font-medium text-sm mb-3">Planned Shortcuts</h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Bold selected text</span>
                    <code className="bg-background px-2 py-0.5 rounded text-xs">Ctrl+B</code>
                  </div>
                  <div className="flex justify-between">
                    <span>Italic selected text</span>
                    <code className="bg-background px-2 py-0.5 rounded text-xs">Ctrl+I</code>
                  </div>
                  <div className="flex justify-between">
                    <span>Inline code</span>
                    <code className="bg-background px-2 py-0.5 rounded text-xs">Ctrl+K</code>
                  </div>
                  <div className="flex justify-between">
                    <span>Switch drafts</span>
                    <code className="bg-background px-2 py-0.5 rounded text-xs">Ctrl+1/2/3</code>
                  </div>
                  <div className="flex justify-between">
                    <span>Open help</span>
                    <code className="bg-background px-2 py-0.5 rounded text-xs">Ctrl+/</code>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Privacy & Data Tab */}
            <TabsContent value="privacy" className="space-y-4 pr-4">
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800">
                  <Shield className="h-6 w-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-base mb-1 text-green-900 dark:text-green-100">
                      Your Privacy is Our Priority
                    </h3>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      This tool is designed with privacy-first principles. Everything runs locally in your browser.
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <PrivacyFeature 
                    icon={<CheckCircle className="h-5 w-5" />}
                    title="100% Client-Side Operation"
                    description="Everything runs directly in your browser. No backend servers process your data."
                  />
                  
                  <PrivacyFeature 
                    icon={<Shield className="h-5 w-5" />}
                    title="Zero Data Collection"
                    description="We don't collect, store, or transmit any of your message content. No analytics, no tracking."
                  />
                  
                  <PrivacyFeature 
                    icon={<Database className="h-5 w-5" />}
                    title="Local Storage Only"
                    description="Your drafts and version history are stored in your browser's local storage. Only you can access them."
                  />
                  
                  <PrivacyFeature 
                    icon={<WifiOff className="h-5 w-5" />}
                    title="Offline Capable"
                    description="Once loaded, the app works completely offline. No internet connection required."
                  />
                  
                  <PrivacyFeature 
                    icon={<UserX className="h-5 w-5" />}
                    title="No Account Required"
                    description="No sign-ups, no logins, no email addresses. Just open and start using."
                  />
                </div>

                <div className="p-4 rounded-lg bg-muted/50 border">
                  <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    Your Data, Your Control
                  </h4>
                  <ul className="text-xs text-muted-foreground space-y-1.5">
                    <li>• Clear browser data to delete all drafts and history</li>
                    <li>• Nothing is sent to external servers</li>
                    <li>• Your messages never leave your device</li>
                    <li>• All processing happens in your browser</li>
                  </ul>
                </div>
              </div>
            </TabsContent>

            {/* Tips & Tricks Tab */}
            <TabsContent value="tips" className="space-y-4 pr-4">
              <div>
                <h3 className="font-semibold text-base mb-2">Tips & Tricks</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Get the most out of WhatsApp Preview Tool with these helpful tips.
                </p>
              </div>

              <div className="space-y-4">
                <TipCard
                  title="Use the Preview Modes"
                  description="Toggle between Sender and Receiver modes to see how your message appears from both perspectives. Switch between Mobile and Web views to ensure it looks good everywhere."
                />

                <TipCard
                  title="Check Readability"
                  description="The readability score helps ensure your message is clear. Aim for a score above 60 for general audiences. Click the score to see detailed suggestions."
                />

                <TipCard
                  title="Long Messages"
                  description="When your message exceeds 4000 characters, the counter turns orange/red. Consider splitting into multiple messages for better readability."
                />

                <TipCard
                  title="RTL Language Support"
                  description="The tool automatically detects right-to-left languages (Arabic, Hebrew, etc.) and adjusts the layout accordingly. Each line is independently detected."
                />

                <TipCard
                  title="Emoji Support"
                  description="Click the emoji button in the toolbar to quickly insert emojis. They'll appear exactly as they do in WhatsApp."
                />

                <TipCard
                  title="Clear Formatting"
                  description="Select text and click the eraser icon to remove all formatting markers while keeping the content intact."
                />

                <TipCard
                  title="Save Your Work"
                  description="Everything is automatically saved to your browser. Your drafts and preferences persist even after closing the tab."
                />

                <TipCard
                  title="Version History Tip"
                  description="Use version history to experiment with different phrasings. You can always restore a previous version if you prefer an earlier draft."
                />

                <TipCard
                  title="Dark Mode Testing"
                  description="Toggle between light and dark themes to ensure your formatted message is readable in both WhatsApp themes."
                />
              </div>
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

// Helper Components
function FormatExample({ 
  icon: Icon, 
  title, 
  syntax, 
  example, 
  description 
}: { 
  icon: any; 
  title: string; 
  syntax: string; 
  example: string; 
  description: string;
}) {
  return (
    <div className="flex gap-3 p-3 bg-muted/30 rounded-md">
      <Icon className="h-5 w-5 text-primary mt-0.5 shrink-0" />
      <div className="flex-1 space-y-1">
        <div className="flex items-baseline justify-between">
          <h4 className="font-medium text-sm">{title}</h4>
          <code className="text-xs bg-background px-2 py-0.5 rounded">{syntax}</code>
        </div>
        <p className="text-xs text-muted-foreground">{description}</p>
        <div className="mt-2 p-2 bg-background rounded text-xs font-mono whitespace-pre-wrap break-all">
          {example}
        </div>
      </div>
    </div>
  );
}

function TipCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="p-3 bg-muted/30 rounded-md border-l-2 border-primary">
      <h4 className="font-medium text-sm mb-1">{title}</h4>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

function PrivacyFeature({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5">
        {icon}
      </div>
      <div className="flex-1">
        <h4 className="font-semibold text-sm mb-1">{title}</h4>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
