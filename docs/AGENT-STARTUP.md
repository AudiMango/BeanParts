# Agent Startup

What every agent must do **at the start of every session**, before making any changes, and how to get the right context quickly.

## 1. Required Reading (every session)

Read these in order:

| # | File | Why |
| --- | --- | --- |
| 1 | [AGENT-GUIDELINES.md](AGENT-GUIDELINES.md) | The rules you must follow |
| 2 | [README.md](../README.md) | Project status and where everything is |
| 3 | [OVERVIEW.md](OVERVIEW.md) | What BeanPARTS is, its principles, and V1 scope |
| 4 | **Latest report** in [reports/](../reports/) | What was last done, the current state, known bugs, and planned tasks |
| 5 | [DECISIONS.md](DECISIONS.md) | What has already been decided. Don't re-ask or contradict these. |
| 6 | [OPEN-QUESTIONS.md](OPEN-QUESTIONS.md) | What is still undecided. Don't assume answers. |
| 7 | [GLOSSARY.md](GLOSSARY.md) | The terms to use |

### Finding the latest report

Reports are named `YYYY-MM-DD-short-title.md`, so the newest date is the latest. Ignore `TEMPLATE.md`.

```bash
ls reports/ | grep -v TEMPLATE | sort | tail -3
```

If several reports share the latest date, read all of them. They may come from agents working in parallel.

## 2. Check the Repository State

```bash
git status                 # uncommitted changes left behind?
git log --oneline -15      # recent history
git branch -a              # other agents' task branches
```

- **Uncommitted changes you didn't make:** don't delete or overwrite them. Ask the user.
- **Recent commits with no report:** mention this to the user.

## 3. Task-Specific Reading

After the required reading, read only what your task needs:

| If your task involves… | Also read |
| --- | --- |
| Projects, assemblies, BOM | [spec/01-projects-and-bom.md](spec/01-projects-and-bom.md) |
| Onshape import or sync | [spec/02-onshape.md](spec/02-onshape.md) |
| Part status, quantities, Ready | [PART-LIFECYCLE.md](PART-LIFECYCLE.md), [spec/03-parts-and-quantities.md](spec/03-parts-and-quantities.md) |
| Manufacturing, CAM files | [spec/04-manufacturing.md](spec/04-manufacturing.md), [PART-LIFECYCLE.md](PART-LIFECYCLE.md) |
| Requests, orders, receiving | [spec/05-ordering.md](spec/05-ordering.md), [PART-LIFECYCLE.md](PART-LIFECYCLE.md) |
| Budgets, invoices | [spec/06-budget-and-invoices.md](spec/06-budget-and-invoices.md) |
| Activity log | [spec/07-activity-history.md](spec/07-activity-history.md) |
| Anything the user will see | [UI-GUIDELINES.md](UI-GUIDELINES.md) |
| An assigned task from a task list | The report containing that task list, and your task's **May change** list |

## 4. Before You Change Anything

Confirm you can answer these questions:

1. What is the project's current state (from the latest report)?
2. What exactly am I asked to do, and which files will I change?
3. Does it conflict with any decision in `DECISIONS.md`?
4. Does it depend on an open question? If so, **ask the user** instead of guessing.
5. If this is an assigned task: am I staying inside my allowed files?

If any answer is unclear, ask the user before starting.

## 5. Quick Checklist

- [ ] Read AGENT-GUIDELINES, README, OVERVIEW
- [ ] Read the latest report(s)
- [ ] Read DECISIONS, OPEN-QUESTIONS, GLOSSARY
- [ ] Checked `git status` and recent history
- [ ] Read the task-specific docs
- [ ] Understood the task and the files it touches
- [ ] Asked about anything unclear

At the end of the session, follow [AGENT-GUIDELINES.md](AGENT-GUIDELINES.md): record everything in git, write a report, and push.
