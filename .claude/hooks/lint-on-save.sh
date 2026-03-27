#!/bin/bash
# ============================================================
# lint-on-save.sh — Runs after every Edit/Write tool use
# Lightweight check — fast feedback, not blocking
# ============================================================

FILE="$1"

if [ -z "$FILE" ]; then
  exit 0
fi

# ── CSS files: check for missing var() ──
if [[ "$FILE" == *.css ]] && [[ "$FILE" != *base.css ]]; then
  HARDCODED=$(grep -n "color: #\|background: #\|background-color: #" "$FILE" | grep -v "/\*" || true)
  if [ -n "$HARDCODED" ]; then
    echo "⚠️  [lint] Hardcoded colors in $FILE (use CSS variables instead):"
    echo "$HARDCODED"
  fi
fi

# ── JS files: warn on console.log ──
if [[ "$FILE" == *.js ]]; then
  LOGS=$(grep -n "console\.log" "$FILE" || true)
  if [ -n "$LOGS" ]; then
    echo "⚠️  [lint] console.log found in $FILE — remove before commit:"
    echo "$LOGS"
  fi
fi

# ── HTML files: check for missing alt on img ──
if [[ "$FILE" == *.html ]]; then
  NOALT=$(grep -n "<img " "$FILE" | grep -v 'alt=' || true)
  if [ -n "$NOALT" ]; then
    echo "⚠️  [lint] <img> missing alt attribute in $FILE:"
    echo "$NOALT"
  fi
fi

exit 0
