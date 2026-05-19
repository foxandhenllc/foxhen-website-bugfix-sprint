export type Severity = 'blocker' | 'high' | 'medium' | 'low';
export type Device = 'mobile' | 'tablet' | 'desktop';
export type BugStatus = 'queued' | 'fixing' | 'qa' | 'ready';

export type ReproStep = {
  step: string;
  expected: string;
  observed: string;
};

export type FixNote = {
  time: string;
  title: string;
  note: string;
};

export type QaCheck = {
  id: string;
  label: string;
  area: string;
};

export type BugReport = {
  id: string;
  title: string;
  severity: Severity;
  status: BugStatus;
  affectedViewports: Device[];
  surface: string;
  symptom: string;
  rootCause: string;
  reproSteps: ReproStep[];
  fixNotes: FixNote[];
  qaChecks: QaCheck[];
  beforeAfter: {
    label: string;
    before: string;
    after: string;
  }[];
  handoffNote: string;
};

export type SprintMetric = {
  label: string;
  before: string;
  after: string;
  delta: string;
};

export type HandoffAsset = {
  title: string;
  description: string;
  includes: string[];
};

export type DemoData = {
  repo: string;
  liveUrl: string;
  sprint: {
    title: string;
    subtitle: string;
    timeframe: string;
    service: string;
    promise: string;
  };
  metrics: SprintMetric[];
  bugs: BugReport[];
  devices: {
    id: Device;
    label: string;
    width: string;
  }[];
  handoffAssets: HandoffAsset[];
};

export const demo: DemoData = {
  repo: 'https://github.com/foxandhenllc/foxhen-website-bugfix-sprint',
  liveUrl: 'https://foxhen-website-bugfix-sprint.vercel.app',
  sprint: {
    title: '24-hour website bugfix sprint board',
    subtitle:
      'A public-safe mini product that shows how a focused polish pass turns scattered visual defects into verified handoff notes.',
    timeframe: '24h sprint simulation',
    service: 'Website bugfix + polish pass',
    promise: 'Reproduce, prioritize, patch, QA, and package the result without backend setup.',
  },
  metrics: [
    { label: 'Open defects', before: '8', after: '1', delta: '7 resolved' },
    { label: 'Mobile layout score', before: '61', after: '94', delta: '+33 pts' },
    { label: 'CTA clarity', before: '70%', after: '96%', delta: '+26%' },
    { label: 'QA checks', before: '0/14', after: '14/14', delta: 'complete' },
  ],
  devices: [
    { id: 'mobile', label: 'Mobile', width: '390px' },
    { id: 'tablet', label: 'Tablet', width: '768px' },
    { id: 'desktop', label: 'Desktop', width: '1280px' },
  ],
  bugs: [
    {
      id: 'BUG-241',
      title: 'Hero call-to-action drops below the first viewport',
      severity: 'blocker',
      status: 'ready',
      affectedViewports: ['mobile', 'tablet'],
      surface: 'Homepage hero',
      symptom: 'Primary action is pushed below the fold on narrow screens after the headline wraps.',
      rootCause: 'Hero grid used fixed vertical spacing and a desktop-only media height.',
      reproSteps: [
        {
          step: 'Open the homepage at 390px wide.',
          expected: 'Headline, proof line, and primary action are visible without scrolling.',
          observed: 'The primary action starts below the fold.',
        },
        {
          step: 'Rotate to a tablet portrait width.',
          expected: 'Media panel stacks below content with compact spacing.',
          observed: 'Media panel keeps desktop spacing and crowds the content.',
        },
      ],
      fixNotes: [
        { time: '09:15', title: 'Reproduced', note: 'Captured mobile and tablet screenshots with the CTA hidden.' },
        { time: '10:05', title: 'Layout patch', note: 'Swapped fixed hero height for clamp-based spacing and reordered the media stack.' },
        { time: '11:20', title: 'QA pass', note: 'Verified first viewport at 390px, 768px, and 1280px widths.' },
      ],
      qaChecks: [
        { id: 'qa-241-1', label: 'Primary action visible at 390px', area: 'Mobile' },
        { id: 'qa-241-2', label: 'Hero media does not overlap copy', area: 'Tablet' },
        { id: 'qa-241-3', label: 'Keyboard focus order follows visual order', area: 'Accessibility' },
      ],
      beforeAfter: [
        { label: 'First viewport coverage', before: '62%', after: '94%' },
        { label: 'Scroll needed to CTA', before: '420px', after: '0px' },
      ],
      handoffNote: 'Hero now prioritizes the action on small screens while preserving the desktop visual rhythm.',
    },
    {
      id: 'BUG-318',
      title: 'Pricing card comparison feels uneven',
      severity: 'high',
      status: 'qa',
      affectedViewports: ['desktop'],
      surface: 'Pricing section',
      symptom: 'Plan cards use inconsistent heights, making the recommended option look accidental.',
      rootCause: 'Feature lists had variable spacing and no shared card footer alignment.',
      reproSteps: [
        {
          step: 'Open the pricing section at desktop width.',
          expected: 'All cards align and the recommended option has deliberate emphasis.',
          observed: 'Cards have staggered footers and mixed button alignment.',
        },
      ],
      fixNotes: [
        { time: '12:10', title: 'Audit', note: 'Mapped all card content and identified inconsistent list spacing.' },
        { time: '12:45', title: 'Component cleanup', note: 'Normalized card grids, list rhythm, button placement, and selected-card treatment.' },
      ],
      qaChecks: [
        { id: 'qa-318-1', label: 'Plan card buttons align on desktop', area: 'Layout' },
        { id: 'qa-318-2', label: 'Recommended card state is visually distinct', area: 'Visual QA' },
      ],
      beforeAfter: [
        { label: 'Card height drift', before: '76px', after: '0px' },
        { label: 'Section scan time', before: '11s', after: '5s' },
      ],
      handoffNote: 'Pricing can now be scanned quickly, with the recommended tier clearly framed.',
    },
    {
      id: 'BUG-406',
      title: 'Form confirmation loses the next step',
      severity: 'medium',
      status: 'ready',
      affectedViewports: ['mobile', 'desktop'],
      surface: 'Inquiry form',
      symptom: 'Success message appears, but the page does not explain what happens next.',
      rootCause: 'Confirmation copy was treated as a temporary toast instead of an inline state.',
      reproSteps: [
        {
          step: 'Submit the sample form with valid fields.',
          expected: 'Inline confirmation explains the next action and preserves submitted context.',
          observed: 'A short toast appears and fades without useful follow-up copy.',
        },
      ],
      fixNotes: [
        { time: '14:05', title: 'State redesign', note: 'Replaced transient toast with a persistent confirmation panel.' },
        { time: '14:50', title: 'Copy polish', note: 'Added concise next-step language and a reset action for repeat testing.' },
      ],
      qaChecks: [
        { id: 'qa-406-1', label: 'Confirmation persists after submit', area: 'Interaction' },
        { id: 'qa-406-2', label: 'Reset action returns to editable state', area: 'Interaction' },
        { id: 'qa-406-3', label: 'Message remains readable at 390px', area: 'Mobile' },
      ],
      beforeAfter: [
        { label: 'Next-step clarity', before: '40%', after: '92%' },
        { label: 'Confirmation duration', before: '3s', after: 'persistent' },
      ],
      handoffNote: 'Form now leaves the visitor with a visible next action and a recoverable state.',
    },
    {
      id: 'BUG-527',
      title: 'Gallery images crop important product details',
      severity: 'medium',
      status: 'fixing',
      affectedViewports: ['tablet', 'desktop'],
      surface: 'Product gallery',
      symptom: 'Key visual details are clipped when cards switch from two columns to three.',
      rootCause: 'Gallery used a single object-position value across all breakpoints.',
      reproSteps: [
        {
          step: 'Resize from tablet to desktop width.',
          expected: 'Image subject remains centered in every gallery card.',
          observed: 'Subject is clipped on the right side of two cards.',
        },
      ],
      fixNotes: [
        { time: '15:30', title: 'Breakpoint review', note: 'Marked images that need custom crop positions at larger widths.' },
      ],
      qaChecks: [
        { id: 'qa-527-1', label: 'Subject remains visible at tablet width', area: 'Visual QA' },
        { id: 'qa-527-2', label: 'Three-column gallery keeps consistent rhythm', area: 'Desktop' },
      ],
      beforeAfter: [
        { label: 'Clipped images', before: '3', after: '0' },
        { label: 'Gallery rhythm', before: 'uneven', after: 'balanced' },
      ],
      handoffNote: 'Gallery crop rules are documented so future images can follow the same pattern.',
    },
    {
      id: 'BUG-612',
      title: 'Footer links lack usable focus states',
      severity: 'low',
      status: 'queued',
      affectedViewports: ['mobile', 'tablet', 'desktop'],
      surface: 'Global footer',
      symptom: 'Keyboard users can tab through links, but the focus ring blends into the background.',
      rootCause: 'Footer link styles only defined hover states.',
      reproSteps: [
        {
          step: 'Use keyboard navigation in the footer.',
          expected: 'Every link receives a visible focus state.',
          observed: 'Focus is technically present but visually faint.',
        },
      ],
      fixNotes: [
        { time: '16:20', title: 'Queued polish', note: 'Logged as low-risk accessibility polish for the next sweep.' },
      ],
      qaChecks: [
        { id: 'qa-612-1', label: 'Focus outline passes contrast check', area: 'Accessibility' },
      ],
      beforeAfter: [
        { label: 'Focus visibility', before: 'faint', after: 'clear' },
      ],
      handoffNote: 'Footer focus styling is scoped and safe for a small follow-up patch.',
    },
  ],
  handoffAssets: [
    {
      title: 'Fix log',
      description: 'Timestamped summary of what changed and why each patch stayed inside scope.',
      includes: ['Repro evidence', 'Patch notes', 'Risk notes'],
    },
    {
      title: 'Responsive QA sheet',
      description: 'Device checklist covering mobile, tablet, desktop, focus states, and acceptance criteria.',
      includes: ['Viewport matrix', 'Acceptance checks', 'Known leftovers'],
    },
    {
      title: 'Handoff memo',
      description: 'Plain-English wrap-up that explains the visible improvements and suggested next polish pass.',
      includes: ['Before/after metrics', 'Priority queue', 'Implementation notes'],
    },
  ],
};
