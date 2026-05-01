# DECISIONS.md

## 1. Agent Thoughts — Are they shown, and how?

I decided to show agent thoughts but keep them hidden by default behind
a "Show thoughts (n)" toggle. The user for this product is a financial
analyst — not a developer. They care about the result, not the internal
reasoning. But I didn't want to throw the information away entirely,
because some analysts might want to understand why the coordinator made
a certain call (like cancelling a task early).

So the toggle felt like the right middle ground — it's there if you
want it, invisible if you don't. The coordinator's thoughts live in the
run header, and task-level thoughts live inside the task card they
belong to.

I'd reconsider this if analysts started asking "why did it skip that
task?" regularly — that would be a signal to surface thoughts more
prominently, maybe as a small info icon inline.

---

## 2. Parallel Task Layout

Parallel tasks (those sharing a `parallel_group`) are displayed in a
2-column grid, grouped under a "Parallel Tasks" label. The idea was
simple — if three things are happening at the same time, showing them
side by side feels more honest than stacking them vertically, which
implies a sequence.

I kept the grid to 2 columns max so cards don't get too narrow on
smaller screens. The "Parallel Tasks" label above the group makes it
clear this is intentional grouping, not just layout.

I'd reconsider if there were consistently 4+ parallel tasks — at that
point a horizontal layout might get cramped and a different approach
(like a swimlane or a subtle bracket) would work better.

---

## 3. Partial Outputs (is_final: false)

I show intermediate outputs inline as bullet points inside the task
card, and replace them visually when the final output arrives. The
reasoning was that partial outputs often contain genuinely useful
numbers — like "Apple R&D: $16.2B → $29.9B" — and hiding them until
the end means the analyst just stares at a spinner.

Showing them incrementally makes the run feel alive and gives the
analyst something to read while waiting. The final output is styled
differently (green, separated by a border) so it's clear which one is
the confirmed result.

I'd reconsider if partial outputs turned out to be noisy or misleading
in practice — if analysts were frequently confused by intermediate
numbers that changed significantly by the end.

---

## 4. Cancelled with reason: sufficient_data

I labelled this state "✓ Enough data" with a neutral zinc/grey badge
— not red, not green. The reasoning is that this is a normal,
intentional coordinator decision. Showing it in red would alarm the
analyst. Showing it in green would be misleading (the task didn't
complete). Neutral grey with a checkmark felt honest.

Below the badge I show the cancellation message from the event (e.g.
"3 of 4 peers fetched. Coordinator proceeding with available data.")
in small italic text, so the analyst understands what happened without
needing to dig.

I'd reconsider the label if user testing showed analysts were still
confused or worried by it — "Skipped" or "Not needed" might read
better depending on the audience.

---

## 5. Task Dependency Display

I chose not to draw dependency arrows or a graph. The task list already
renders in execution order, so a synthesis task naturally appears after
the tasks it depends on. Drawing explicit arrows felt like it would add
visual noise without adding much understanding for a non-technical
analyst.

For the specific case where `t_005` depends on `t_001`, `t_002`,
`t_003` but `t_004` was cancelled — I treat the completed synthesis as
implicitly resolving the dependency. The coordinator already handled
this decision, so the UI doesn't need to flag it as incomplete. Showing
an "incomplete dependency" warning would confuse analysts who just saw
the run complete successfully.

I'd reconsider if there were cases where a synthesis task ran with
clearly insufficient data and analysts needed to understand why — at
that point making dependencies visible would help build or break trust
in the output.

---

## Tools I Used

## Tools I Used

I used AI tools throughout this project, as expected. Without them,
just understanding the event schema and figuring out where to start
would have taken me a day or two on its own.

ChatGPT helped me debug React state issues — things like why a task
update wasn't re-rendering, or how to correctly match tool results back
to their calls. It also helped me read through the spec and break it
into smaller pieces I could tackle one at a time.

Claude helped me generate the mock fixture data and sometimes helped
me write boilerplate code when I knew what I wanted but just needed
it written out faster.

The product decisions were still mine — how to label a cancelled task,
whether to show agent thoughts by default, how to lay out parallel
tasks visually. The AI helped me build faster and understand quicker,
but I was the one deciding what the UI should feel like and why.