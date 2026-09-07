#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
rm -f wish-candle.zip
zip -qr wish-candle.zip wish-candle -x '*.DS_Store'
echo "Created wordpress-theme/wish-candle.zip"
