#!/bin/bash
cd "$(dirname "$BASH_SOURCE")"
python -m SimpleHTTPServer 1987
open http://localhost:1987/
