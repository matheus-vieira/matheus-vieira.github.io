---
layout: question
title: Which command undoes the last commit but keeps the changes in the working directory?
options:
- git reset --hard HEAD~1
- git revert HEAD
- git reset --soft HEAD~1
- git delete HEAD~1
answer: 3
explanation: git reset --soft HEAD~1 moves the HEAD pointer back one commit but keeps the changes in the staging area, allowing you to modify and recommit them.
---
