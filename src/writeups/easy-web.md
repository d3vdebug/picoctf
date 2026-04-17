---
title: "Simple Login Bypass"
difficulty: "Easy"
category: "Web Exploitation"
---

# Simple Login Bypass

This was an easy web challenge where the login form could be bypassed by inspecting the source code.

## Solution

The login form had a hidden field that checked for admin privileges. By changing the value in the browser's developer tools, I could log in as admin.

```html
<input type="hidden" name="isAdmin" value="false">
```

Change it to `true` and submit. 

Flag: fds [[picoCTF{web_bypass_123}]]

