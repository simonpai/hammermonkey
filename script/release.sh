#!/usr/bin/env bash
#CURR_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
VERSION=$(node -p -e "require('./package.json').version")
RELEASE_DIR="release/$VERSION"

if [ -d "$RELEASE_DIR" ]; then rm -rf $RELEASE_DIR; fi
mkdir -p $RELEASE_DIR
cp dist/*.dmg $RELEASE_DIR