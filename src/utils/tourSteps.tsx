import { Step } from 'react-joyride';
import { Lightbulb } from 'lucide-react';

const isMobileViewport = () => window.innerWidth < 768;

export const tourSteps: Step[] = [
  {
    target: 'body',
    content: (
      <div>
        <h2 className="text-lg font-bold mb-2">Welcome to WhatsApp Preview Tool! 👋</h2>
        <p className="mb-3">
          Write WhatsApp messages with rich formatting and see them preview in real-time.
        </p>
        <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-md text-sm">
          <Lightbulb className="h-4 w-4 text-amber-500" />
          <span>This quick tour takes just 30 seconds</span>
        </div>
      </div>
    ),
    placement: 'center',
    disableBeacon: true,
  },
  {
    target: '[data-tour="main-grid"]',
    content: (
      <div>
        <h3 className="font-semibold mb-2">✨ Side-by-Side Magic</h3>
        <p className="mb-2">Type on the left, preview on the right - updates instantly!</p>
        <ul className="text-sm space-y-1 text-muted-foreground">
          <li>• Apply formatting with toolbar buttons</li>
          <li>• Switch between 3 draft slots</li>
          <li>• Toggle preview modes (light/dark, mobile/desktop)</li>
        </ul>
      </div>
    ),
    placement: isMobileViewport() ? 'bottom' : 'top',
    offset: 10,
  },
  {
    target: '[data-tour="formatting-toolbar"]',
    content: (
      <div>
        <h3 className="font-semibold mb-2">🚀 Powerful Tools Available</h3>
        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold">1</div>
            <div className="flex-1">
              <p className="font-medium text-sm">Formatting Toolbar</p>
              <p className="text-xs text-muted-foreground">Bold, italic, lists, emojis & more</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold">2</div>
            <div className="flex-1">
              <p className="font-medium text-sm">Readability Score</p>
              <p className="text-xs text-muted-foreground">Check if your message is easy to read</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold">3</div>
            <div className="flex-1">
              <p className="font-medium text-sm">Version History</p>
              <p className="text-xs text-muted-foreground">Restore previous versions anytime</p>
            </div>
          </div>
        </div>
        <div className="mt-3 p-2 bg-muted/30 rounded text-xs">
          💡 Click Help button anytime for detailed guides
        </div>
      </div>
    ),
    placement: 'bottom',
  },
];
