#!/bin/bash
cd /home/kavia/workspace/code-generation/noteease-17407-4b1ab19f/note_app
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

