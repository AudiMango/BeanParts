# Agent Guidelines

Rules for any AI agent (Claude or others) working on BeanPARTS. Every agent must follow them.

## 1. Git Is the Record

**Everything must be recorded in git**: context, decisions, changes, and reports.

- Assume the next agent knows nothing except what is in the repo. Chat history is not a record.
- If a user tells you something important (a decision, a requirement, a preference), write it into the right file:

  | Kind of information | Where it goes |
  | --- | --- |
  | Product decision | [DECISIONS.md](DECISIONS.md) |
  | Unanswered question | [OPEN-QUESTIONS.md](OPEN-QUESTIONS.md) |
  | How a feature works | [spec/](spec/) or [PART-LIFECYCLE.md](PART-LIFECYCLE.md) |
  | New term | [GLOSSARY.md](GLOSSARY.md) |
  | What you did | A report in [reports/](../reports/) |

- Commit and push your work before you finish. Unpushed work is lost.
- Use clear commit messages that say what changed and why.

## 2. Before You Start

1. Read [README.md](../README.md), [OVERVIEW.md](OVERVIEW.md), and these guidelines.
2. Read the **latest report** in [reports/](../reports/) to learn the current state.
3. If you were given a task from a task list, read that task list and stay inside your task's boundaries (see section 4).
4. If something is unclear, ask the user. Don't guess on product decisions.

## 3. Reports

**After every edit session or pull request, the agent must write a report.**

- Location: `reports/`
- File name: `YYYY-MM-DD-short-title.md`, for example `2026-09-24-add-part-lifecycle.md`. If there is already a report with the same name, add `-2`, `-3`, and so on.
- Use the template: [reports/TEMPLATE.md](../reports/TEMPLATE.md)
- Commit the report in the same push as the work.

### Write for a non-technical reader

Reports must make sense to someone who is not a programmer, such as a team mentor or a new student.

- Use plain language. Avoid jargon; if you must use a technical term, explain it in a few words.
- Say **what changed for the user or the project**, not only which files changed.
- Keep it short. Use headings and bullet lists.
- Be honest: if something failed, was skipped, or is uncertain, say so.

### Required sections

| Section | What to write |
| --- | --- |
| **Summary** | 1–3 sentences: what was done and why. |
| **What Changed** | Bullet list in plain language. Link the files. |
| **Current State of the Project** | Where the project stands now: what works, what is still planning, what's next. |
| **Errors and Known Bugs** | Anything broken, failing, or risky. Write "None known" if there are none. |
| **Next Tasks** | Only if the user asked for them. Otherwise write "Not requested." |

## 4. Task Lists for Multiple Agents

A user may ask an agent to list upcoming tasks so several agents can work **at the same time**.

**The agent creating the task list is responsible for making sure the tasks don't overlap or conflict.** For each task, it must:

1. **Make it independent.** It can be finished without waiting on another task in the same group, or its dependency is stated clearly.
2. **Assign file ownership.** List the exact files or folders the task may change. **No two tasks in the same group may change the same file.**
3. **Handle shared files.** Files many tasks might want to edit (such as `DECISIONS.md`, `OPEN-QUESTIONS.md`, `GLOSSARY.md`, `README.md`) belong to **one** task only. Other tasks put their notes for those files in their own report, and the owning task (or a final "merge" task) applies them.
4. **Give it its own branch.** Name one per task, for example `task/03-ordering-spec`.
5. **Define "done".** A short, checkable description of when the task is complete.
6. **Order into waves** when some tasks depend on others: all tasks in Wave 1 run in parallel, then Wave 2, and so on.

Put the task list in the **Next Tasks** section of the report using this format:

```markdown
### Wave 1 (run in parallel)

#### Task 1: <title>
- **Goal:** <one sentence>
- **Branch:** task/01-<short-name>
- **May change:** <files/folders>
- **Must not change:** <anything likely to be touched by mistake>
- **Depends on:** none
- **Done when:** <checkable result>

### Wave 2 (after Wave 1 is merged)
...
```

Before finishing, the agent creating the list must double-check that no file appears under **May change** in two tasks of the same wave.

### When working on an assigned task

- Change only the files your task owns. If you need to change something outside it, stop and tell the user instead.
- Write your own report when done.

## 5. General Rules

- Keep changes focused on what was asked.
- Use the terms in [GLOSSARY.md](GLOSSARY.md).
- Don't delete history: add new decisions instead of rewriting old ones.
- Never commit secrets (passwords, API keys, tokens).
