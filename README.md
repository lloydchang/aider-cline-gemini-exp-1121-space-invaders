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

---

Subsequently, I'm amending https://github.com/lloydchang/aider-cline-gemini-exp-1121-space-invaders with Aider

> Subsequently, I'm amending https://github.com/lloydchang/aider-cline-gemini-exp-1121-space-invaders with Aider

---

Related information from:

---

Aider Discord's `#general` channel at https://discord.com/channels/1131200896827654144/1131200896827654149/1313122186797514793

https://discord.gg/Tv2uQnR88V

---

Cline Discord's `#prompts` channel at https://discord.com/channels/1275535550845292637/1275555786621325382/1313115383070330921

https://discord.gg/cline

---

Aider's `--watch-files` feature allows me to experiment with having Cline and Aider pair program with each other.

For example, I tasked Cline to pair program with Aider:

> To facilitate pair programming between Cline and Aider, please review the currently open file and add comments that begin with "// AI " followed by any programming instructions you would like Aider, an AI pair programming tool, to execute. Conclude with a final line "// AI!" Afterward, when Aider edits the file, do not allow Cline to make any changes.

1. Cline edits the file and asks Aider to pair program

2. Aider edits the file in response to Cline

The nice thing about Aider is that it is a command line tool that now runs in the background, so I can try experiments like the above pair programming exercise between Cline and Aider.
