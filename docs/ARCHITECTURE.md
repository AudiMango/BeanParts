# BeanParts — Architecture

Status: Current architecture decision. Last updated September 18, 2026.

This document is the canonical summary of the BeanParts system architecture. Product requirements and workflow details remain in the other planning documents.

## 1. Current architecture decisions

| Area | Decision |
|---|---|
| Client | Responsive browser application for students' and mentors' personal laptops and phones |
| Backend/API | Google Apps Script |
| Authentication | Google account authentication/OAuth |
| Authorization | BeanParts roles enforced by the Apps Script backend |
| Data store | Google Sheets |
| Source of truth | The underlying Sheets, including direct/manual edits |
| Current hosting direction | Investigate serving the frontend from Google Apps Script as well as the backend |
| Deployment shape | Central shared application and data; not a local Windows-only application |

The previous Sites prototype → Vercel/Supabase production assumption is superseded. The current design does not require Vercel, Supabase, Firebase, or another cloud database/host.

## 2. System boundaries

The browser provides the interface. It may validate input for quick feedback, filter and sort loaded data, and cache temporary view state. It is not trusted to authorize protected actions and must not contain privileged Google API credentials.

Google Apps Script is the trusted application boundary. It is responsible for:

- identifying the signed-in Google account through the selected authentication flow;
- mapping that identity to BeanParts authorization and role permissions;
- validating requests and applying business rules;
- reading and writing Google Sheets;
- enforcing protected actions in the backend even if a client is modified;
- using locking, stable IDs, expected timestamps/versions, or other conflict controls where appropriate;
- reporting verified success, conflicts, partial failure, or stale data to the frontend.

Google Sheets stores the durable BeanParts business records. Team members must remain able to edit the Sheets directly outside BeanParts. Manual Sheet changes appear in BeanParts after refresh; verified BeanParts writes appear in those same Sheets.

Authentication and authorization are separate:

1. Google establishes who the account is.
2. BeanParts determines whether that account is active and what Student, Lead, Mentor, Admin, or combined responsibilities it has.
3. Apps Script enforces the allowed action before touching Sheets.

An Admin responsibility does not automatically grant Mentor purchasing authority.

## 3. Multi-user and data rules

BeanParts is a multi-user system. Students, leads, and mentors may read and update shared records simultaneously from different devices and locations.

Implementation must therefore:

- use stable record IDs rather than row positions;
- batch range reads and writes instead of performing per-cell API operations;
- filter and sort client-side when practical for an already-loaded data set;
- use cache only for disposable or derived data that can be rebuilt from Sheets;
- define a freshness target so direct Sheet edits become visible predictably;
- detect unexpected sheet/tab/column structure before writing;
- verify the durable Sheet write before reporting success;
- test simultaneous app edits, direct Sheet edits, retries, and partial operations;
- document race conditions that Apps Script locks cannot eliminate, especially direct human edits during an app transaction.

## 4. Security constraints

- Do not expose service-account keys, privileged OAuth tokens, or other privileged Google API credentials to browser code.
- Treat all browser requests and role claims as untrusted.
- Enforce authorization and validation in Apps Script, not only through visible/hidden UI controls.
- Store secrets in an appropriate server-side configuration mechanism, not in Sheets or the repository.
- Review direct Google Sheet sharing and protected ranges separately; backend authorization cannot prevent a person with direct Sheet edit access from editing permitted cells.

## 5. Implementation details still undecided

The architecture does not yet decide:

- whether the first frontend uses Apps Script HTML Service and `google.script.run`, an HTTP-style Apps Script API, or another Apps Script-compatible boundary;
- the exact OAuth/deployment configuration and how reliably account email/identity is available for the team's personal or school Google accounts;
- which Google account owns and deploys the Apps Script project and Sheets;
- the role/membership table schema and onboarding/removal workflow;
- the API request/response format and error model;
- cache location, cache duration, refresh behavior, and the visible freshness target;
- transaction boundaries, locking strategy, optimistic concurrency fields, idempotency, and conflict-resolution UI;
- quota/load targets based on expected users, record counts, and peak activity;
- frontend framework/build tooling and how it will be packaged if served by Apps Script;
- PWA/offline scope, custom-domain needs, and notification behavior;
- final spreadsheet structural changes and migration/recovery steps;
- Onshape integration details.

These questions require small feasibility tests and team decisions. They are not reasons to introduce another authoritative database.

## 6. Possible future migration paths

Apps Script frontend hosting is the first hosting direction to investigate. If it later creates a specific demonstrated limitation—such as frontend tooling, performance, PWA support, custom domains, or maintainability—the frontend may move to a platform such as Vercel.

A frontend move must preserve this boundary:

- Google Apps Script remains the backend/API.
- Google Sheets remains the authoritative and directly editable data store.
- Backend role checks and business rules remain server-side.
- The frontend communicates through a documented backend contract.

A separate database would be a new architecture decision requiring explicit approval and a migration plan. It is not the default next step and must not silently replace Sheets as the source of truth.

## 7. Architecture validation before implementation

Before building production workflows:

1. Test Google sign-in/identity with representative team accounts.
2. Test the Apps Script deployment and frontend-hosting options on phone and laptop.
3. Measure batched read/write performance and relevant quotas with representative sheet copies.
4. Test backend role rejection independently of hidden UI controls.
5. Test concurrent app writes, a simultaneous direct Sheet edit, retry/idempotency, and partial failure.
6. Confirm the team-owned Google account/project arrangement and recovery access.
7. Record the selected implementation details in this document or a future ADR before production use.
