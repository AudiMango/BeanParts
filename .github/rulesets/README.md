# Branch rulesets

GitHub does not apply rulesets from files in the repository. This directory records the intended settings so they are reviewable, restorable, and changeable through pull requests.

## Applying `main-protection.json`

1. Open the repository's **Settings → Rules → Rulesets** page.
2. Choose **New ruleset → Import a ruleset** and upload `main-protection.json`.
3. Review the target, bypass, and pull-request settings before selecting **Create**.

The import is an administrative action and is not completed merely because this file exists.

## Intended protection for `main`

- Changes normally reach `main` through a pull request.
- Review conversations must be resolved before merge.
- Force-pushes and branch deletion are blocked.
- No approving review is initially required so a single maintainer is not unable to merge.
- Repository administrators retain emergency bypass permission.

When a second regular reviewer is available, set `required_approving_review_count` to `1`. When reliable continuous-integration workflows exist, add their exact status-check names as required checks.

After changing the live GitHub settings, export the ruleset and update this file and `main-protection.json` so the repository continues to match the intended configuration.
