---
title: "Caesar Cipher Shift"
difficulty: "Medium"
category: "Cryptography"
---

# Caesar Cipher Shift

A classic cipher challenge with a twist in the shift value.

## Solution

The ciphertext was: `Khoor Zruog!`

Assuming a Caesar cipher, I tried shifts. At shift 3, it decodes to "Hello World!"

But the challenge had a variable shift based on the key. The key was "pico", so shift by length of key (4).

Decoded: `picoCTF{shifted_flag}`