import { Step } from 'react-joyride';

export const tourSteps: Step[] = [
  {
    target: 'body',
    content: (
      <div>
        <h2 className="text-lg font-bold mb-2">Welcome to WhatsApp Preview Tool! 👋</h2>
        <p>Let's take a quick tour to help you get started with all the powerful features.</p>
      </div>
    ),
    placement: 'center',
    disableBeacon: true,
  },
  {
    target: '[data-tour="composer"]',
    content: (
      <div>
        <h3 className="font-semibold mb-2">📝 Message Composer</h3>
        <p>Type your WhatsApp messages here. The preview updates in real-time as you type!</p>
      </div>
    ),
    placement: 'right',
  },
  {
    target: '[data-tour="formatting-toolbar"]',
    content: (
      <div>
        <h3 className="font-semibold mb-2">✨ Formatting Toolbar</h3>
        <p>Apply WhatsApp formatting with one click:</p>
        <ul className="list-disc list-inside mt-2 text-sm">
          <li>Bold, Italic, Strikethrough</li>
          <li>Code blocks and lists</li>
          <li>Insert emojis</li>
        </ul>
      </div>
    ),
    placement: 'bottom',
  },
  {
    target: '[data-tour="readability-score"]',
    content: (
      <div>
        <h3 className="font-semibold mb-2">📊 Readability Analyzer</h3>
        <p>Get real-time feedback on your message's readability:</p>
        <ul className="list-disc list-inside mt-2 text-sm">
          <li>Flesch Reading Ease Score</li>
          <li>Estimated reading time</li>
          <li>Long sentence warnings</li>
        </ul>
      </div>
    ),
    placement: 'bottom',
  },
  {
    target: '[data-tour="draft-switcher"]',
    content: (
      <div>
        <h3 className="font-semibold mb-2">📑 Multiple Drafts</h3>
        <p>Work on up to 3 different messages simultaneously. Switch between drafts instantly and auto-save is always on!</p>
      </div>
    ),
    placement: 'bottom',
  },
  {
    target: '[data-tour="preview"]',
    content: (
      <div>
        <h3 className="font-semibold mb-2">📱 Live Preview</h3>
        <p>See exactly how your message will look in WhatsApp with formatting applied!</p>
      </div>
    ),
    placement: 'left',
  },
  {
    target: '[data-tour="preview-controls"]',
    content: (
      <div>
        <h3 className="font-semibold mb-2">🎨 Preview Modes</h3>
        <p>Customize your preview experience:</p>
        <ul className="list-disc list-inside mt-2 text-sm">
          <li>Light/Dark theme</li>
          <li>Mobile/Desktop view</li>
          <li>Sender/Receiver perspective</li>
        </ul>
      </div>
    ),
    placement: 'left',
  },
  {
    target: '[data-tour="version-history"]',
    content: (
      <div>
        <h3 className="font-semibold mb-2">🕐 Version History</h3>
        <p>Every change is saved automatically. Access your last 10 versions and restore any previous version with one click!</p>
      </div>
    ),
    placement: 'bottom',
  },
  {
    target: '[data-tour="help-button"]',
    content: (
      <div>
        <h3 className="font-semibold mb-2">❓ Need Help?</h3>
        <p>Click here anytime to view formatting guides, keyboard shortcuts, and tips & tricks!</p>
      </div>
    ),
    placement: 'bottom',
  },
  {
    target: 'body',
    content: (
      <div>
        <h2 className="text-lg font-bold mb-2">You're all set! 🎉</h2>
        <p className="mb-3">Start composing your WhatsApp messages with confidence.</p>
        <p className="text-sm text-muted-foreground">You can restart this tour anytime from the Help menu.</p>
      </div>
    ),
    placement: 'center',
  },
];
