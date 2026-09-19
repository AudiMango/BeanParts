# BeanParts Session Reports

This directory is the durable handoff log for repository work. Every session that modifies the repository creates one report, including documentation-only, tooling, refactor, feature, and fix sessions.

## Why reports exist

Reports let the next human or AI contributor answer:

- Which branch and baseline did this work use?
- What actually changed?
- What was verified, skipped, or failed?
- What is the current project state relevant to this change?
- Which decisions remain open?
- What is the next safe action?

Reports supplement Git history and pull requests. They do not replace canonical documentation, tests, issues, or architecture decision records.

## File naming

Use UTC and a short descriptive slug:

```text
YYYY-MM-DD-HHMMZ-short-slug.md
```

Example:

```text
2026-09-19-1430Z-order-contract.md
```

If two reports could share the same timestamp and slug, add the branch or contributor identifier to the slug.

## Required contents

Copy `reports/_TEMPLATE.md` and complete every section. Use `None` rather than deleting a section. Reports must include:

- date/time in UTC;
- contributor or agent identifier;
- branch and starting commit;
- related issue/pull request when available;
- goal and scope;
- project status at handoff;
- changed files and behavior;
- decisions made and canonical docs updated;
- verification commands and results;
- known limitations, unresolved questions, and risks;
- exact next recommended action;
- ending commit or an explicit note that the report was written before the final commit.

Never place credentials, private team records, personal account data, invoice documents, or payment information in a report.

## When to write and update the report

Create the report before handoff. Update it after final verification so it matches the final diff. Link it in the pull request.

Each concurrent branch creates its own report. Do not edit another active branch's report as a coordination mechanism.

After a report is merged into `main`, treat it as append-only history. If a material statement later proves wrong, create a new report that links to the earlier one and explains the correction. Canonical documents must also be corrected when the issue affects current behavior or decisions.

## Reading reports

At the start of a task:

1. Read the newest reports that affect the task's area.
2. Verify their branch and ending commit against current Git history.
3. Treat newer canonical documentation and code as authoritative if later changes superseded the report.
4. Read dependent or unresolved reports linked by the task or pull request.

Do not assume that the newest timestamp alone represents the whole project; parallel branches may have been written from different baselines.
