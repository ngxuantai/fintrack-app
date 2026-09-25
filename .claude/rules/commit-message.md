# Commit Message Rules

Follow these rules whenever creating a Git commit:

- Write the commit subject and body in English.
- Use a clear, concise, and descriptive commit message.
- Use Conventional Commits prefixes for the subject line: `feat`, `fix`, `chore`, `docs`, `refactor`, `style`, `test`, `perf`, `build`, `ci`. Format: `<type>(<optional scope>): <description>`, e.g. `feat(transactions): add filter by category`.
- Write the description in lowercase imperative mood, such as `add`, `fix`, `update`, or `remove`.
- Do not add `Co-authored-by` trailers.
- Do not add Claude, AI, bot, or other authorship attribution to the commit message.
- Keep the commit focused on the changes included in that commit.
- For large or non-trivial changes (many files, complex logic, refactors), add a commit body after a blank line. Briefly explain what changed and why, using bullet points when listing multiple changes. Small, self-explanatory changes need only the subject line.
