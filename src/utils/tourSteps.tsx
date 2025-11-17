import { Step } from 'react-joyride';

export const tourSteps: Step[] = [
  {
    target: 'body',
    content: (
      <div>
        <h2 className="text-base font-semibold mb-1.5">Welcome! 👋</h2>
        <p className="text-sm text-muted-foreground mb-2">
          Write WhatsApp messages with formatting and see them preview instantly.
        </p>
        <p className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1.5">
          <span className="text-base">🔒</span>
          <span>100% private - everything stays on your device</span>
        </p>
      </div>
    ),
    placement: 'center',
    disableBeacon: true,
  },
  {
    target: '[data-tour="draft-switcher"]',
    content: (
      <div>
        <h3 className="text-sm font-semibold mb-1.5">Type left, preview right</h3>
        <ul className="text-xs space-y-1 text-muted-foreground">
          <li>• Apply formatting with toolbar</li>
          <li>• Switch between drafts</li>
          <li>• Toggle light/dark mode</li>
        </ul>
      </div>
    ),
    placement: 'top',
    offset: 10,
  },
  {
    target: '[data-tour="formatting-toolbar"]',
    content: (
      <div>
        <h3 className="text-sm font-semibold mb-1.5">Quick Tools</h3>
        <ul className="text-xs space-y-1 text-muted-foreground">
          <li>• Bold, italic, lists & emojis</li>
          <li>• Readability score</li>
          <li>• Long message warnings</li>
        </ul>
      </div>
    ),
    placement: 'top',
    offset: 10,
  },
  {
    target: '[data-tour="help-button"]',
    content: (
      <div>
        <h3 className="text-sm font-semibold mb-1.5">Need Help?</h3>
        <ul className="text-xs space-y-1 text-muted-foreground">
          <li>• Access formatting guides</li>
          <li>• View version history</li>
          <li>• Learn keyboard shortcuts</li>
        </ul>
      </div>
    ),
    placement: 'bottom',
    offset: 10,
  },
];
