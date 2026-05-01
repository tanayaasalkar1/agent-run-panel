# Agent Run Panel

A React UI component that shows a live AI agent run unfolding in real
time. Built as a take-home assessment for JcurveIQ.

## What it does

When a financial analyst submits a research query, this panel shows
the entire run as it happens — tasks being spawned, tools being called,
intermediate outputs appearing, failures being recovered, and a final
result at the end. The goal is to make the process legible and build
trust in the output.

## Tech stack

- React (hooks, functional components)
- Tailwind CSS
- Vite
- No backend — mock event stream only

## How to run locally

1. Clone the repo and install dependencies:

  npm install

2. Start the dev server:

  npm run dev

3. Open http://localhost:5173 in your browser.

## How to switch between fixtures

In the top right of the panel there is a dropdown with two options:

- **Success** — a full run that completes with a final output and
  citations. Covers parallel tasks, a retry sequence, a cancelled
  task, and synthesis.

- **Error** — a run that fails partway through. Some tasks complete,
  one is in flight, and one never starts.

Select the fixture you want, then click **Start**. Click **Reset** to
clear the panel and start again.

## Project structure

/
├── src/
│   ├── App.jsx          # Main component and all event handling
│   └── main.jsx
├── mock/
│   ├── fixtures/
│   │   ├── run_success.json
│   │   └── run_error.json
│   └── emitter.js       # setTimeout-driven event replayer
├── DECISIONS.md
├── README.md
└── package.json

## Known gaps I'd address with more time

- **Mobile layout** — the 2-column parallel task grid gets cramped on
  narrow screens. I'd make it stack to 1 column below a breakpoint.

- **Replay speed control** — right now the timing multiplier is hardcoded.
  A slider to speed up or slow down the replay would be useful for
  testing and demos.

- **Accessibility** — status colours alone aren't enough. I'd add
  aria labels and make the thought toggles keyboard navigable.

- **Error fixture polish** — the error state is handled but the UI
  could do more to show which tasks have partial results worth reading
  vs which ones have nothing useful.

- **Timestamps** — each task card could show when it started and how
  long it took, which would help analysts understand where time was
  spent in a real run.