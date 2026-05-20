import { useMemo, useState } from 'react';
import type { BugReport, DemoData, Device, Severity } from '../data/sample';

type DemoShellProps = {
  demo: DemoData;
};

const severityLabels: Record<Severity | 'all', string> = {
  all: 'All',
  blocker: 'Blocker',
  high: 'High',
  medium: 'Medium',
  low: 'Low',
};

const severityStyles: Record<Severity, string> = {
  blocker: 'border-rose-300 bg-rose-200/90 text-rose-950',
  high: 'border-orange-300 bg-orange-200/90 text-orange-950',
  medium: 'border-amber-300 bg-amber-200/90 text-amber-950',
  low: 'border-sky-300 bg-sky-200/90 text-sky-950',
};

const statusStyles: Record<BugReport['status'], string> = {
  queued: 'bg-slate-800 text-slate-200',
  fixing: 'bg-indigo-500 text-white',
  qa: 'bg-amber-300 text-amber-950',
  ready: 'bg-emerald-300 text-emerald-950',
};

function cx(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(' ');
}

function Icon({ name }: { name: 'check' | 'arrow' | 'spark' | 'scan' }) {
  if (name === 'check') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="m5 12 4.2 4.2L19 6.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (name === 'arrow') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (name === 'scan') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M7 4H5a1 1 0 0 0-1 1v2M17 4h2a1 1 0 0 1 1 1v2M7 20H5a1 1 0 0 1-1-1v-2M20 17v2a1 1 0 0 1-1 1h-2M8 12h8" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 3l1.7 5.2L19 10l-5.3 1.8L12 17l-1.7-5.2L5 10l5.3-1.8L12 3ZM18 15l.8 2.2L21 18l-2.2.8L18 21l-.8-2.2L15 18l2.2-.8L18 15Z" strokeLinejoin="round" />
    </svg>
  );
}

function BoardPreview({ selectedDevice }: { selectedDevice: Device }) {
  const compact = selectedDevice === 'mobile';
  const medium = selectedDevice === 'tablet';

  return (
    <div className="rounded-[2rem] border border-white/10 bg-slate-950/90 p-3 shadow-2xl shadow-black/30">
      <div className="flex items-center justify-between rounded-[1.35rem] border border-white/10 bg-white/[0.06] px-4 py-3 text-xs text-slate-300">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
        </div>
        <span>{compact ? '390px' : medium ? '768px' : '1280px'} preview</span>
      </div>
      <div className={cx('mt-3 grid gap-3 transition-all duration-500', compact ? 'grid-cols-1' : medium ? 'grid-cols-[0.85fr_1.15fr]' : 'grid-cols-[0.7fr_1fr_0.8fr]')}>
        <div className="rounded-3xl border border-white/10 bg-slate-900 p-4">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-200/70">Before</p>
          <div className="mt-4 space-y-2">
            <div className="h-4 w-5/6 rounded-full bg-white/20" />
            <div className="h-4 w-2/3 rounded-full bg-white/10" />
            <div className="h-24 rounded-2xl border border-rose-300/30 bg-rose-400/10" />
            <div className="h-9 w-1/2 rounded-full bg-white/10" />
          </div>
        </div>
        <div className="rounded-3xl border border-emerald-300/20 bg-gradient-to-br from-emerald-300/15 to-cyan-300/10 p-4">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-200/80">After</p>
          <div className="mt-4 space-y-3">
            <div className="h-4 w-4/5 rounded-full bg-white/70" />
            <div className="h-4 w-3/5 rounded-full bg-white/35" />
            <div className="grid grid-cols-[1fr_auto] gap-3">
              <div className="h-24 rounded-2xl bg-white/15" />
              <div className="h-24 w-16 rounded-2xl bg-emerald-300/30" />
            </div>
            <div className="h-10 w-40 rounded-full bg-emerald-300" />
          </div>
        </div>
        {!compact && <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-4">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Checks</p>
          <div className="mt-4 space-y-3 text-sm text-slate-200">
            {['CTA visible', 'No overlap', 'Focus order'].map((item) => (
              <div key={item} className="flex items-center gap-2 rounded-2xl bg-white/[0.06] px-3 py-2">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-emerald-300 text-emerald-950"><Icon name="check" /></span>
                {item}
              </div>
            ))}
          </div>
        </div>}
      </div>
    </div>
  );
}

export function DemoShell({ demo }: DemoShellProps) {
  const [severity, setSeverity] = useState<Severity | 'all'>('all');
  const [selectedBugId, setSelectedBugId] = useState(demo.bugs[0]?.id ?? '');
  const [selectedDevice, setSelectedDevice] = useState<Device>('mobile');
  const [checkedQa, setCheckedQa] = useState<Record<string, boolean>>({});

  const filteredBugs = useMemo(
    () => (severity === 'all' ? demo.bugs : demo.bugs.filter((bug) => bug.severity === severity)),
    [demo.bugs, severity],
  );

  const selectedBug = filteredBugs.find((bug) => bug.id === selectedBugId) ?? filteredBugs[0] ?? demo.bugs[0];
  const currentDevice = demo.devices.find((device) => device.id === selectedDevice) ?? demo.devices[0];
  const selectedChecks = selectedBug.qaChecks;
  const passedChecks = selectedChecks.filter((check) => checkedQa[check.id]).length;
  const qaPercent = Math.round((passedChecks / Math.max(selectedChecks.length, 1)) * 100);

  function selectSeverity(nextSeverity: Severity | 'all') {
    setSeverity(nextSeverity);
    const nextBug = nextSeverity === 'all' ? demo.bugs[0] : demo.bugs.find((bug) => bug.severity === nextSeverity);
    if (nextBug) setSelectedBugId(nextBug.id);
  }

  function runAcceptanceChecks() {
    setCheckedQa((current) => ({
      ...current,
      ...Object.fromEntries(selectedChecks.map((check) => [check.id, true])),
    }));
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#07111f] text-white">
      <section className="relative isolate px-5 py-6 sm:px-8 lg:px-12">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_8%,rgba(94,234,212,0.22),transparent_28%),radial-gradient(circle_at_88%_14%,rgba(251,191,36,0.18),transparent_30%),linear-gradient(135deg,#08111f_0%,#101828_48%,#111827_100%)]" />
        <div className="absolute left-1/2 top-0 -z-10 h-px w-[84rem] -translate-x-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent" />

        <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/10 bg-white/[0.06] px-4 py-3 shadow-2xl shadow-black/20 backdrop-blur-xl">
          <a href={demo.repo} className="flex items-center gap-3" aria-label="Open repository">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-amber-200 to-emerald-300 text-sm font-black text-slate-950">24</span>
            <span>
              <span className="block text-sm font-black tracking-tight">Bugfix Sprint</span>
              <span className="block text-xs text-slate-400">Public sample board</span>
            </span>
          </a>
          <div className="hidden items-center gap-2 text-sm text-slate-300 md:flex">
            <a className="rounded-full px-4 py-2 hover:bg-white/10" href="#board">Sprint board</a>
            <a className="rounded-full px-4 py-2 hover:bg-white/10" href="#handoff">Handoff</a>
            <a className="rounded-full bg-white px-4 py-2 font-black !text-slate-950 shadow-sm ring-1 ring-white/20 transition hover:-translate-y-0.5 hover:bg-slate-100" href={demo.repo}>Repo</a>
          </div>
        </nav>

        <div className="mx-auto grid max-w-7xl gap-9 py-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:py-16">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-4 py-2 text-sm font-bold text-emerald-100">
              <Icon name="spark" />
              {demo.sprint.timeframe}
            </div>
            <h1 className="max-w-4xl text-5xl font-black leading-[0.92] tracking-[-0.06em] text-white sm:text-7xl lg:text-8xl">{demo.sprint.title}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">{demo.sprint.subtitle}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#board" className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-200 px-6 py-3 text-sm font-black text-slate-950 shadow-lg shadow-amber-500/10">
                Inspect the sprint <Icon name="arrow" />
              </a>
              <a href="#handoff" className="rounded-full border border-white/10 bg-white/[0.06] px-6 py-3 text-center text-sm font-black text-white hover:bg-white/10">View package</a>
            </div>
            <div className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {demo.metrics.map((metric) => (
                <div key={metric.label} className="rounded-3xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">{metric.label}</p>
                  <div className="mt-3 flex items-end gap-2">
                    <span className="text-3xl font-black tracking-tight text-white">{metric.after}</span>
                    <span className="pb-1 text-xs text-slate-500 line-through">{metric.before}</span>
                  </div>
                  <p className="mt-2 text-sm font-bold text-emerald-200">{metric.delta}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-[2rem] border border-white/10 bg-white/[0.06] p-3 backdrop-blur">
              <div className="flex items-center gap-3 px-2">
                <span className="grid h-10 w-10 place-items-center rounded-2xl bg-cyan-300/15 text-cyan-100"><Icon name="scan" /></span>
                <div>
                  <p className="text-sm font-black">Responsive preview</p>
                  <p className="text-xs text-slate-400">Current width: {currentDevice.width}</p>
                </div>
              </div>
              <div className="flex rounded-full border border-white/10 bg-slate-950/60 p-1">
                {demo.devices.map((device) => (
                  <button
                    key={device.id}
                    className={cx('rounded-full px-3 py-2 text-xs font-black transition', selectedDevice === device.id ? 'bg-white text-slate-950' : 'text-slate-400 hover:text-white')}
                    onClick={() => setSelectedDevice(device.id)}
                    type="button"
                  >
                    {device.label}
                  </button>
                ))}
              </div>
            </div>
            <BoardPreview selectedDevice={selectedDevice} />
          </div>
        </div>
      </section>

      <section id="board" className="bg-[#eef3ee] px-5 py-12 text-slate-950 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-7 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.24em] text-emerald-800/70">Sprint command center</p>
              <h2 className="mt-3 text-4xl font-black tracking-[-0.04em] sm:text-5xl">Prioritized defects, repro proof, and QA gates.</h2>
            </div>
            <div className="flex flex-wrap gap-2 rounded-[1.6rem] border border-slate-950/10 bg-white p-2 shadow-sm">
              {(Object.keys(severityLabels) as Array<Severity | 'all'>).map((item) => (
                <button
                  key={item}
                  className={cx('rounded-full px-4 py-2 text-sm font-black transition', severity === item ? 'bg-slate-950 text-white' : 'text-slate-600 hover:bg-slate-100')}
                  onClick={() => selectSeverity(item)}
                  type="button"
                >
                  {severityLabels[item]}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-5 lg:grid-cols-[0.82fr_1.18fr]">
            <div className="space-y-3">
              {filteredBugs.map((bug) => (
                <button
                  key={bug.id}
                  className={cx('w-full rounded-[1.65rem] border p-4 text-left shadow-sm transition hover:-translate-y-0.5', selectedBug.id === bug.id ? 'border-slate-950 bg-white shadow-xl shadow-slate-950/10' : 'border-slate-950/10 bg-white/70')}
                  onClick={() => setSelectedBugId(bug.id)}
                  type="button"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-xs font-black text-slate-500">{bug.id}</span>
                    <span className={cx('rounded-full border px-3 py-1 text-xs font-black uppercase', severityStyles[bug.severity])}>{bug.severity}</span>
                  </div>
                  <h3 className="mt-3 text-lg font-black leading-tight tracking-[-0.02em]">{bug.title}</h3>
                  <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-bold text-slate-500">
                    <span className={cx('rounded-full px-3 py-1 uppercase', statusStyles[bug.status])}>{bug.status}</span>
                    <span>{bug.surface}</span>
                    <span>{bug.affectedViewports.join(' / ')}</span>
                  </div>
                </button>
              ))}
            </div>

            <article className="rounded-[2rem] border border-slate-950/10 bg-white p-5 shadow-2xl shadow-slate-950/10 lg:p-7">
              <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-start">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-sm font-black text-slate-500">{selectedBug.id}</span>
                    <span className={cx('rounded-full px-3 py-1 text-xs font-black uppercase', statusStyles[selectedBug.status])}>{selectedBug.status}</span>
                  </div>
                  <h3 className="mt-3 max-w-2xl text-3xl font-black tracking-[-0.04em]">{selectedBug.title}</h3>
                  <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">{selectedBug.symptom}</p>
                </div>
                <div className="rounded-3xl bg-slate-950 p-4 text-white">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">QA runner</p>
                  <p className="mt-2 text-3xl font-black">{passedChecks}/{selectedChecks.length}</p>
                  <div className="mt-3 h-2 rounded-full bg-white/10">
                    <div className="h-2 rounded-full bg-emerald-300 transition-all duration-500" style={{ width: `${qaPercent}%` }} />
                  </div>
                  <button className="mt-3 rounded-full bg-emerald-300 px-4 py-2 text-xs font-black text-emerald-950" onClick={runAcceptanceChecks} type="button">
                    Run checks
                  </button>
                </div>
              </div>

              <div className="mt-6 grid gap-4 xl:grid-cols-[1fr_0.95fr]">
                <div className="rounded-[1.5rem] bg-slate-50 p-5">
                  <h4 className="text-sm font-black uppercase tracking-[0.18em] text-slate-500">Repro steps</h4>
                  <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-950">
                    <span className="font-black">Root cause note:</span> {selectedBug.rootCause}
                  </div>
                  <div className="mt-4 space-y-4">
                    {selectedBug.reproSteps.map((step, index) => (
                      <div key={step.step} className="rounded-2xl border border-slate-950/10 bg-white p-4">
                        <p className="font-black">{index + 1}. {step.step}</p>
                        <div className="mt-3 grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
                          <p><span className="font-black text-emerald-700">Expected:</span> {step.expected}</p>
                          <p><span className="font-black text-rose-700">Observed:</span> {step.observed}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[1.5rem] bg-slate-950 p-5 text-white">
                  <h4 className="text-sm font-black uppercase tracking-[0.18em] text-slate-400">Fix log timeline</h4>
                  <div className="mt-5 space-y-4">
                    {selectedBug.fixNotes.map((note) => (
                      <div key={note.time + note.title} className="relative border-l border-white/10 pl-4">
                        <span className="absolute -left-1.5 top-1 h-3 w-3 rounded-full bg-amber-200" />
                        <p className="text-xs font-black text-amber-100">{note.time}</p>
                        <p className="mt-1 font-black">{note.title}</p>
                        <p className="mt-1 text-sm leading-6 text-slate-400">{note.note}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 grid gap-4 lg:grid-cols-2">
                <div className="rounded-[1.5rem] border border-slate-950/10 p-5">
                  <h4 className="text-sm font-black uppercase tracking-[0.18em] text-slate-500">Before / after</h4>
                  <div className="mt-4 space-y-3">
                    {selectedBug.beforeAfter.map((metric) => (
                      <div key={metric.label} className="grid grid-cols-[1fr_auto_auto] items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3 text-sm">
                        <span className="font-bold text-slate-700">{metric.label}</span>
                        <span className="text-slate-400 line-through">{metric.before}</span>
                        <span className="font-black text-emerald-700">{metric.after}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[1.5rem] border border-slate-950/10 p-5">
                  <h4 className="text-sm font-black uppercase tracking-[0.18em] text-slate-500">Acceptance checks</h4>
                  <div className="mt-4 space-y-2">
                    {selectedChecks.map((check) => (
                      <label key={check.id} className="flex cursor-pointer items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700">
                        <input
                          checked={Boolean(checkedQa[check.id])}
                          className="h-4 w-4 accent-emerald-600"
                          onChange={(event) => setCheckedQa((current) => ({ ...current, [check.id]: event.target.checked }))}
                          type="checkbox"
                        />
                        <span className="flex-1">{check.label}</span>
                        <span className="text-xs uppercase tracking-[0.14em] text-slate-400">{check.area}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 rounded-[1.5rem] bg-emerald-50 p-5 text-sm leading-6 text-emerald-950">
                <span className="font-black">Handoff note:</span> {selectedBug.handoffNote}
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="handoff" className="bg-[#07111f] px-5 py-14 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div className="sticky top-6 rounded-[2rem] border border-white/10 bg-white/[0.06] p-7 backdrop-blur">
              <p className="text-sm font-black uppercase tracking-[0.24em] text-amber-100/70">Service mapping</p>
              <h2 className="mt-3 text-4xl font-black tracking-[-0.05em]">{demo.sprint.service}</h2>
              <p className="mt-5 text-base leading-7 text-slate-300">{demo.sprint.promise}</p>
              <div className="mt-7 rounded-3xl border border-amber-200/20 bg-amber-200/10 p-5">
                <p className="text-sm font-black text-amber-100">Static and public-safe</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">All rows, notes, checks, metrics, and package contents are fictional local data rendered in the browser.</p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {demo.handoffAssets.map((asset) => (
                <article key={asset.title} className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 shadow-xl shadow-black/20 backdrop-blur">
                  <h3 className="text-2xl font-black tracking-[-0.03em]">{asset.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-400">{asset.description}</p>
                  <div className="mt-5 space-y-2">
                    {asset.includes.map((item) => (
                      <div key={item} className="flex items-center gap-2 rounded-2xl bg-white/[0.06] px-3 py-2 text-sm font-bold text-slate-200">
                        <span className="text-emerald-200"><Icon name="check" /></span>
                        {item}
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
