# Drafts for Human Preview — Digisuite

Purpose
- Ensure all AI-generated actions (posts, pages, emails, campaigns) create reviewable drafts for staff review before publishing.
- Provide a safe, consistent preview & approval workflow for DFY client work.

Key behaviors (draft-mode default)
- Draft-only by default during pilot and for all new clients unless explicit auto-publish consent is given.
- Every draft includes:
  - Generated content (post/page/email) rendered as HTML/preview
  - Source prompt and retrieval provenance (KB docs, assets, embeddings)
  - Confidence score and moderation result
  - Suggested publish schedule, UTM parameters, and target audience
  - Suggested A/B variants (if any)
- Draft metadata:
  - agent_actor (Ava/Alex/sub-agent)
  - client_id, project_id
  - created_at, ttl (auto-expire draft if not acted on in X days)
  - requires_approval (boolean) and approval_threshold (confidence %)

Preview & Review UI (developer notes)
- Draft list: filter by client, agent, type (post, page, email), and status (needs_review, ready, scheduled).
- Preview page: side-by-side content + provenance + moderation flags + edit & comment pane.
- Approvals:
  - Single-approval publish (for low-risk clients who opted-in)
  - Two-approval publish (recommended for high-risk or billing-impacting actions)
  - Owner/Founder override control for urgent publishes
- Comment & revision loop:
  - Staff or client can edit draft (WYSIWYG) and re-run moderation & confidence checks.
  - Edits and agent re-runs create a new draft version (version history visible).
- Notifications:
  - Email/Slack (ops) and client notifications when a draft requires review.
  - Webhook support for external approvers.

Audit & retention
- Keep a full audit trail for each draft: who generated it, who edited it, approvals, timestamps, and publish outcome.
- Retain drafts for X days (configurable) then archive.

Operational guardrails (enforced)
- Block posting if moderation flags are present; set `needs_review`.
- Block billing or account ownership changes until manual confirmation + 2FA.
- Auto-expire service tokens used by sub-agents when agent TTL ends or upon revoke.

Developer checklist to implement draft-flow (samples)
- DB: drafts table with versioning & provenance fields
- API: endpoints to create, list, preview, edit, approve, publish drafts
- UI: Drafts dashboard + preview page + approval modal
- Webhooks/notifications: notify staff & clients on status changes
- Tests: moderation gating, approval flows, versions & audit logs

Quick UX copy for review buttons
- "Save as Draft" — creates version, does not run publish
- "Request Approval" — sends to approvers with summary
- "Approve & Publish" — publishes (if approver has rights)
- "Request Changes" — sends comments back to agent/staff
