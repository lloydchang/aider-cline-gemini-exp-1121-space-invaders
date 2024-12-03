Relates to [added gemini exp 1121 to api.ts #851](https://github.com/cline/cline/pull/851) https://github.com/cline/cline/pull/851

---
# cline-gemini-exp-1121-space-invaders

---

My custom instrucions are at https://github.com/lloydchang/cline-gemini-exp-1121-space-invaders/blob/main/CLINE.md

---

My subsequent instruction to Cline is:

> make space invaders and publish it

---

I tried that https://github.com/cline/cline/pull/851 pull request:

> [GoogleGenerativeAI Error]: Error fetching from https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-exp-0827:streamGenerateContent?alt=sse: [429 Too Many Requests] Resource has been exhausted (e.g. check quota).

can happen periodically.

---

I believe there's a quota of 2 requests per minute.

---

According to https://discuss.ai.google.dev/t/whats-the-rate-limit-for-the-experimental-models/38226

> In your case (gemini-1.5-pro-exp-0827) Rate limits are 2 RPM, 32,000 TPM, 50 RPD.

---

I was able to use that https://github.com/cline/cline/pull/851 pull request to make a basic space invader game, but it wasn't playable.

Its logic only seems to load the main page.

More iterations would be needed via additional Cline steps.
