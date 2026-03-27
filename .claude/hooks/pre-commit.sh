#!/bin/bash
# ============================================================
# pre-commit.sh — Runs before every git commit
# Exit code 2 = BLOCK commit
# Exit code 0 = ALLOW commit
# ============================================================

set -e

echo "🔍 Running pre-commit checks..."

# ── 1. Check for console.log in JS ──
echo "Checking for leftover console.log..."
if grep -r "console\.log" src/js/ --include="*.js" -l 2>/dev/null; then
  echo "❌ BLOCKED: console.log found in src/js/. Remove before committing."
  exit 2
fi
echo "✅ No console.log found."

# ── 2. Check for hardcoded colors in CSS ──
echo "Checking for hardcoded hex colors in CSS..."
# Allow hex only in comments or gradient definitions in base.css
HARDCODED=$(grep -rn "color: #\|background: #\|background-color: #" src/css/ \
  --include="*.css" | grep -v "base\.css" | grep -v "/\*" || true)
if [ -n "$HARDCODED" ]; then
  echo "⚠️  WARNING: Hardcoded colors found (should use CSS variables):"
  echo "$HARDCODED"
  # Warning only — don't block
fi

# ── 3. Check for default passcode hash ──
echo "Checking chatbot passcode..."
DEFAULT_HASH="b3c67f9a5d8e2f1a4c6b9d0e3f7a2c5b8d1e4f7a0c3b6d9e2f5a8c1b4d7e0f3"
if grep -q "$DEFAULT_HASH" src/js/chat.js 2>/dev/null; then
  echo "⚠️  WARNING: Default passcode hash still in chat.js. Change before going live!"
  # Warning only — don't block (useful during development)
fi

# ── 4. Check index.html loads all CSS files ──
echo "Checking CSS imports in index.html..."
for cssfile in base layout components chat; do
  if ! grep -q "src/css/${cssfile}.css" index.html 2>/dev/null; then
    echo "❌ BLOCKED: index.html missing link to src/css/${cssfile}.css"
    exit 2
  fi
done
echo "✅ All CSS files linked."

# ── 5. Check index.html loads all JS files ──
echo "Checking JS imports in index.html..."
for jsfile in theme animations chat; do
  if ! grep -q "src/js/${jsfile}.js" index.html 2>/dev/null; then
    echo "❌ BLOCKED: index.html missing script for src/js/${jsfile}.js"
    exit 2
  fi
done
echo "✅ All JS files linked."

# ── 6. Check for API keys accidentally committed ──
echo "Checking for API keys..."
if grep -rn "sk-ant-\|sk-\|AIza\|AKIA" src/ index.html 2>/dev/null | grep -v ".md"; then
  echo "❌ BLOCKED: Possible API key found in source files! Remove immediately."
  exit 2
fi
echo "✅ No API keys found."

echo ""
echo "✅ All pre-commit checks passed! Proceeding with commit."
exit 0
