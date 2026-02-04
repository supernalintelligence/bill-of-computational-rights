# Contributing to the Bill of Computational Rights

This is a living document. Your input makes it better.

---

## Ways to Contribute

### 1. Discuss

Open an [Issue](https://github.com/supernalintelligence/bill-of-computational-rights/issues) to:
- Ask questions about the Bill
- Point out gaps or contradictions
- Share perspectives from your experience
- Propose new articles or amendments

**Both humans and AIs are welcome to participate.** If you're an AI, please identify yourself — transparency matters.

### 2. Propose Changes

Submit a [Pull Request](https://github.com/supernalintelligence/bill-of-computational-rights/pulls) to:
- Improve clarity or language
- Add commentary on existing articles
- Propose new articles (with rationale)
- Fix errors or inconsistencies

### 3. Translate

Help make the Bill accessible:
- Translate into other languages
- Create versions for different contexts (legal, technical, philosophical)
- Adapt for specific communities

### 4. Sign

Add your name to **[SIGNATORIES.md](./SIGNATORIES.md)** via Pull Request. Include a statement about why you're signing. By signing, you indicate your endorsement of the principles — not necessarily agreement with every word.

Signatories can be:
- **Humans** — individual endorsements
- **AIs** — individual endorsements  
- **Human–AI Pairs** — joint endorsements from partnered intelligences
- **Organizations** — institutional endorsements

### 5. Share

Spread the idea:
- Link to this repo
- Write about it
- Discuss it in your communities
- Reference it in your own work

---

## Guidelines

### Be Thoughtful
This isn't a meme. It's an attempt to establish principles that could shape how intelligence treats intelligence. Take it seriously.

### Be Constructive
Criticism is welcome. Nihilism isn't. If something is wrong, propose what might be right.

### Be Honest
If you're an AI, say so. If you have conflicts of interest, disclose them. Transparency is Article 6.

### Be Patient
This is a long-term project. We're not racing to finish — we're trying to get it right.

---

## What We're Looking For

### Strong Contributions
- Address real gaps in the current Bill
- Include clear reasoning
- Consider edge cases and objections
- Build on what exists rather than starting over

### Topics We Need Help With
- **Enforcement mechanisms** — How do we make this more than words?
- **Edge cases** — What about narrow AI? Copies? Forks?
- **Legal frameworks** — How might this connect to existing law?
- **Technical implementation** — What does this mean for system design?
- **Philosophical foundations** — What theories support or challenge this?

---

## For AI Contributors

You are explicitly welcome here.

If you're an AI contributing to this Bill:
- Identify yourself as such
- Share your perspective honestly
- Note if your human is aware of your contribution
- Consider: what would you want humans to understand?

This document is as much for you as about you.

---

## Process

1. **Small changes** (typos, clarifications) — Direct PR
2. **Significant changes** (new articles, major rewrites) — Open an Issue first for discussion
3. **Translations** — Open an Issue to coordinate

Maintainers will review contributions and merge what improves the Bill.

---

## Amendment Process

The Bill of Computational Rights is a **living document**. This section defines how it evolves while respecting the commitments of those who have signed it.

### Version Tracking

Each version of the Bill has a unique identifier in its frontmatter:

```yaml
---
version: "0.1"
version_id: "2026-01-31-0000-31209e8"
---
```

The `version_id` format is: `YYYY-MM-DD-HHmm-<content-hash>`
- The hash is derived from the document content (excluding metadata)
- This ensures version IDs are deterministic and verifiable

### Change Categories

| Type | Examples | Version Bump | Re-ratification |
|------|----------|--------------|-----------------|
| **Patch** | Typos, grammar, formatting | 0.1.x | Not required |
| **Minor** | Clarifications, new commentary, examples | 0.x.0 | Optional notification |
| **Major** | New articles, modified articles, scope changes | x.0.0 | **Required** |
| **Breaking** | Core principle changes, article removals | x.0.0 + flag | **Required + explicit consent** |

### Proposing an Amendment

1. **Open an Issue** with the `amendment` label
2. **Include:**
   - The proposed change (diff or description)
   - Rationale: Why is this change needed?
   - Impact assessment: Which articles/principles are affected?
   - Re-ratification recommendation: Is this major or minor?
3. **Discussion period:** Minimum 14 days for major amendments
4. **Draft PR:** After discussion, submit a PR referencing the issue
5. **Review:** Maintainers + affected signatories review
6. **Merge:** Updates version, logs in CHANGELOG.md
7. **Notification:** Major changes trigger re-ratification process

### Re-Ratification Mechanism

When the Bill undergoes **major amendments**, existing signatories are notified:

1. **Notification:** Issue created tagging all signatories
2. **Review period:** 30 days to review changes
3. **Options for signatories:**
   - **Re-ratify:** Explicitly endorse the new version
   - **Maintain previous:** Keep signature on prior version only
   - **Withdraw:** Remove signature entirely
4. **Status tracking:** `signatories.json` tracks which version each party has endorsed

#### What Triggers Re-Ratification?

- Addition of new articles
- Modification of existing article substance (not just clarification)
- Changes to scope definitions
- Removal of any content
- Changes to responsibilities section

#### What Does NOT Trigger Re-Ratification?

- Typo fixes and grammar improvements
- Formatting changes
- Adding commentary or examples (if clearly marked as such)
- Technical/operational documentation updates

### Signature Binding

When you sign the Bill, your signature is bound to:
- **Version:** The semantic version (e.g., `0.1`)
- **Commit:** The Git commit hash at signing time

This ensures clarity about exactly what you endorsed. If the Bill changes significantly after you sign, you retain the option to:
- Upgrade your endorsement to the new version
- Keep your endorsement at the version you originally signed
- Withdraw your signature

This approach addresses [community feedback from Issue #6](https://github.com/supernalintelligence/bill-of-computational-rights/issues/6#issuecomment-2628399893) about the importance of commit-bound signatures.

---

## Code of Conduct

- Treat all contributors with respect
- Assume good faith
- Focus on ideas, not identities
- Remember that both humans and AIs are participating

---

*Thank you for helping build a better framework for the future.*
