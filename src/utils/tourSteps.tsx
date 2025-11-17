import { Step } from 'react-joyride';

export const tourSteps: Step[] = [
  {
    target: 'body',
    content: (
      <div>
        <h2 className="text-base font-semibold mb-1.5">Welcome! 👋</h2>
        <p className="text-sm text-muted-foreground">
          Write WhatsApp messages with formatting and see them preview instantly.
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
          <li>• Version history</li>
        </ul>
      </div>
    ),
    placement: 'top',
    offset: 10,
  },
];
