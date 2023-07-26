#!/bin/bash

git rm -r --cached .
git add --all .
git commit -a -m "cleanup: git clean cache"
git push origin dev