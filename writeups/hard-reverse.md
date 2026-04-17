---
title: "Binary Reversing Challenge"
difficulty: "Hard"
category: "Reverse Engineering"
---



A compiled binary that required disassembly to find the flag.

## Solution

Using Ghidra, I analyzed the main function. It checked for a specific input.


The flag was embedded in the binary as a string: `picoCTF{reversed_binary_456}`

Steps:
1. Load in Ghidra.
2. Find the string in the strings window.
3. Trace back to the check function.
