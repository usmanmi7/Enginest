#!/bin/bash
# Background watcher that polls for git changes every 30s and auto-pushes
# PID is written to /home/z/my-project/scripts/auto-push-watcher.pid

POLL_INTERVAL=30
PID_FILE="/home/z/my-project/scripts/auto-push-watcher.pid"
PUSH_SCRIPT="/home/z/my-project/scripts/auto-push.sh"
LOG_FILE="/home/z/my-project/scripts/auto-push-watcher.log"

echo $$ > "$PID_FILE"

while true; do
  sleep "$POLL_INTERVAL"
  bash "$PUSH_SCRIPT" >> "$LOG_FILE" 2>&1
done
