# Branch rulesets

GitHub does not apply rulesets from files in the repository — this directory is
the source of truth for what *should* be configured, so the settings are
reviewable and restorable. Import a file here to apply it.

## Applying `main-protection.json`

1. Go to **Settings → Rules → Rulesets** in the repository.
2. Click **New ruleset → Import a ruleset**, then upload `main-protection.json`.
3. Review the summary and click **Create**.

## What `main-protection.json` enforces on `main`

- **No direct pushes.** Every change reaches `main` through a pull request.
- **No approval required.** A single maintainer can merge their own PR; there is
  no second-reviewer requirement to get stuck behind.
- **Conversations must be resolved** before a PR can merge.
- **No force-pushes** (`non_fast_forward`) — history on `main` cannot be rewritten.
- **No branch deletion** — `main` cannot be deleted.
- **Repository admins may bypass**, so the repo owner can still push directly in
  an emergency. Remove the `bypass_actors` entry to make the rules absolute.

## Changing it later

- **Require review** once there is more than one maintainer: raise
  `required_approving_review_count` to `1`. Note that GitHub does not let anyone
  approve their own PR, so do this only when a second person can review.
- **Require CI to pass** once a workflow exists: add a `required_status_checks`
  rule naming the check, e.g.

  ```json
  {
    "type": "required_status_checks",
    "parameters": {
      "strict_required_status_checks_policy": true,
      "required_status_checks": [{ "context": "build" }]
    }
  }
  ```

After changing settings in the GitHub UI, export the ruleset (**⋯ → Export**)
and commit it back here so this file stays accurate.
