# Writeup Format Guide

This guide explains the syntax and structure for creating writeup files for the PicoCTF Writeups website.

## File Structure

Each writeup is a markdown (.md) file located in the `src/writeups/` directory. Files are automatically discovered and loaded by the system.

## Frontmatter

Every writeup file must start with frontmatter metadata enclosed between `---` markers. This metadata controls how the writeup appears on the website.

```yaml
---
title: "Challenge Name"
difficulty: "Easy"
category: "Category Name"
---
```

### Frontmatter Fields

- **title** (required): The name of the CTF challenge. Use quotes around the title.
- **difficulty** (required): One of three levels:
  - `Easy` - Green badge
  - `Medium` - Orange badge
  - `Hard` - Red badge
- **category** (required): The challenge category. Choose from:
  - Web Exploitation
  - Cryptography
  - Reverse Engineering
  - Forensics
  - General Skills
  - Binary Exploitation
  - Blockchain

## Content Structure

After the frontmatter, write your writeup content using standard markdown.

```markdown
# Challenge Title

Description of the challenge...

## Approach

Explanation of your approach...

## Solution

Steps to solve...

## Key Learnings

What you learned...
```

## Special Syntax

### Blurred Text

Wrap any text in double square brackets `[[ ]]` to make it blurred and clickable. When clicked, the text reveals itself.

```markdown
The flag is [[picoCTF{flag_example}]].

Or hide any sensitive information: [[this will be blurred]]
```

Use this for:
- Flags
- Sensitive solutions
- Key findings you want users to discover themselves

### Code Blocks

Use triple backticks with language specification for syntax highlighting:

```markdown
\`\`\`python
# Python code example
print("Hello")
\`\`\`

\`\`\`bash
# Bash commands
cat flag.txt
\`\`\`

\`\`\`html
<!-- HTML code -->
<input type="hidden" name="admin" value="false">
\`\`\`
```

### Lists

Ordered lists:
```markdown
1. First step
2. Second step
3. Third step
```

Unordered lists:
```markdown
- Item one
- Item two
- Item three
```

### Headings

```markdown
# Main Heading (h1)
## Subheading (h2)
### Sub-subheading (h3)
#### Heading Level 4 (h4)
```

### Text Formatting

```markdown
**Bold text** for emphasis

*Italic text* for subtlety

~~Strikethrough~~ for corrections

`inline code` for commands and variables
```

### Links

```markdown
[Link text](https://example.com)

[Relative link](./some-file.txt)
```

## Complete Example

```markdown
---
title: "Simple Login Bypass"
difficulty: "Easy"
category: "Web Exploitation"
---

# Simple Login Bypass

A basic web challenge involving client-side validation bypass.

## Challenge Description

The target application has a login form with client-side validation. The goal is to bypass authentication.

## Initial Analysis

Upon inspection of the page source code, I found:

```html
<input type="hidden" name="isAdmin" value="false">
```

## Solution Steps

1. Open browser Developer Tools (F12)
2. Inspect the HTML form elements
3. Modify the hidden field value
4. Submit the form
5. Access the admin panel

## Flag

Flag: [[picoCTF{web_bypass_123}]]

## Key Learnings

- Always inspect client-side code
- Never trust browser-side validation
- Hidden fields can be modified
```

## File Naming

- Use descriptive names: `easy-web.md`, `medium-crypto.md`
- Avoid special characters except hyphens
- Use lowercase with hyphens for multi-word names

## Tips

- Keep writeups clear and concise
- Explain your thought process, not just the solution
- Use blurred text `[[ ]]` to hide flags and spoilers
- Include relevant code snippets
- Link to resources if helpful
- Test formatting by running `npm run dev`

## Automatic Features

- Files in `src/writeups/` load automatically
- No manual code changes needed
- Simply save your .md file and refresh the browser
- The website handles:
  - Markdown rendering
  - Blurred text interactivity
  - Difficulty color coding
  - Category filtering
