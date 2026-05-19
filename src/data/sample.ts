export type Metric = readonly [label: string, value: string, note: string];

export type WorkCard = {
  title: string;
  stage: string;
  detail: string;
  health: number;
};

export type DemoSection = readonly [title: string, body: string];

export type DemoData = {
  title: string;
  offer: string;
  service: string;
  tagline: string;
  demoLabel: string;
  accent: string;
  warm: string;
  bg: string;
  repo: string;
  liveUrl: string;
  metrics: Metric[];
  pipeline: string[];
  cards: WorkCard[];
  sections: DemoSection[];
  deliverables: string[];
};

export const demo: DemoData = {
  "title": "Website Bugfix Sprint",
  "offer": "24-hour website bug fix or polish pass",
  "service": "Focused web repair sprint",
  "tagline": "Reproduce one clear site issue, make the smallest useful fix, and hand off the acceptance checks.",
  "demoLabel": "Bugfix sprint demo",
  "accent": "#4d5f38",
  "warm": "#c27550",
  "bg": "#f8f5ef",
  "repo": "https://github.com/foxandhenllc/foxhen-website-bugfix-sprint",
  "liveUrl": "https://foxhen-website-bugfix-sprint.vercel.app",
  "metrics": [
    [
      "Open defects",
      "5 → 1",
      "Only non-blocking polish remains"
    ],
    [
      "Mobile score",
      "61 → 93",
      "Primary layout issues resolved"
    ],
    [
      "Acceptance checks",
      "8/8",
      "Core path verified against the brief"
    ]
  ],
  "pipeline": [
    "Bug reproduced",
    "Cause isolated",
    "Patch applied",
    "Checks passed"
  ],
  "cards": [
    {
      "title": "Mobile hero wrap",
      "stage": "Reproduce",
      "detail": "CTA wraps under the fold at 390px viewport width.",
      "health": 42
    },
    {
      "title": "Form success state",
      "stage": "Patch",
      "detail": "Submission confirmation now preserves context and next action.",
      "health": 86
    },
    {
      "title": "Responsive QA pass",
      "stage": "Verify",
      "detail": "Desktop, tablet, and phone breakpoints are checked.",
      "health": 96
    }
  ],
  "sections": [
    [
      "Reproduce",
      "Capture the issue, environment, expected behavior, and severity."
    ],
    [
      "Patch",
      "Make the smallest safe UI or interaction fix inside the agreed scope."
    ],
    [
      "Verify",
      "Run acceptance checks and document what changed for the handoff."
    ]
  ],
  "deliverables": [
    "Fix log",
    "Responsive checks",
    "Handoff notes"
  ]
};
