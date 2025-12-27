```markdown
that although they will be ding g.allin
Thank you for your interest in contributing. To protect Owner IP and ensure safe collaboration, please follow these rules:

1) Scope & CLA
- Contributions that touch Owner Materials (branding, pricing, AI models, legal text, business processes) require a Contributor License Agreement (CLA) or an explicit written license before being merged. Contact the Owner at shawn@digimark101.com to request CLA instructions.

2) Branches & PRs
- Work in feature branches and open a PR targeting feature or staging branches. Do not push directly to main/production.
- Include a clear description, test plan, and rollback plan for changes that could affect customers or integrations.

3) Critical paths
- Files under /branding, /models, /config/pricing.json, and /terms require explicit Owner review (see CODEOWNERS).

4) Security & secrets
- Do not commit secrets in code. Use the repo's secrets manager or Vault. Short-lived tokens are preferred.

5) Testing & staging
- All changes that affect integrations (OAuth, connectors, billing) must be validated in staging and have test cases.

6) License & attribution
- By contributing, you grant Owner a non-exclusive, perpetual license to use contributions in Owner Materials, subject to the CLA.
```