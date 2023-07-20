#!/bin/bash

git rm -r --cached .
git add --all .
git commit -a -m "cleanup: clean git cache"
git push origin dev