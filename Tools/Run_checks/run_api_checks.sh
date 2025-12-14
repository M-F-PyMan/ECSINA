#!/usr/bin/env bash
# run_api_checks.sh
# Usage:
#   BASE_URL="https://staging.example.com" USER_TOKEN="user_jwt" ADMIN_TOKEN="admin_jwt" ./run_api_checks.sh

set -euo pipefail

BASE_URL="${BASE_URL:-http://localhost:8000}"
USER_TOKEN="${USER_TOKEN:-}"
ADMIN_TOKEN="${ADMIN_TOKEN:-}"

echo "Base URL: $BASE_URL"
echo

# helper for curl with JSON auth
curl_json() {
  local method=$1; shift
  local url="$BASE_URL$1"; shift
  local token="$1"; shift || true
  local data="$1"; shift || true

  if [ -n "$token" ]; then
    AUTH_HDR=(-H "Authorization: Bearer $token")
  else
    AUTH_HDR=()
  fi

  if [ -n "$data" ]; then
    curl -sS -X "$method" "${AUTH_HDR[@]}" -H "Content-Type: application/json" -d "$data" "$url"
  else
    curl -sS -X "$method" "${AUTH_HDR[@]}" "$url"
  fi
  echo
}

# helper for curl multipart
curl_multipart() {
  local url="$BASE_URL$1"; shift
  local token="$1"; shift
  shift || true
  if [ -n "$token" ]; then
    AUTH_HDR=(-H "Authorization: Bearer $token")
  else
    AUTH_HDR=()
  fi
  curl -sS -X POST "${AUTH_HDR[@]}" -F "$@" "$url"
  echo
}

echo "1) Health / basic check (GET /api/ or /api/tickets/)"
curl -sS "${BASE_URL}/api/" || true
echo
echo "GET /api/tickets/ (as user)"
curl_json GET "/api/tickets/" "$USER_TOKEN"

echo "----------------------------------------"
echo "2) Create ticket (JSON) as USER (should succeed for non-admin users)"
create_payload='{"subject":"test from script","message":"hello from script","priority":"low"}'
echo "POST /api/tickets/ -> payload: $create_payload"
resp=$(curl -sS -X POST -H "Content-Type: application/json" -H "Authorization: Bearer $USER_TOKEN" -d "$create_payload" "$BASE_URL/api/tickets/")
echo "Response: $resp"
ticket_id=$(echo "$resp" | python3 -c "import sys, json as j; d=j.load(sys.stdin); print(d.get('id',''))" 2>/dev/null || echo "")
echo "Created ticket id: $ticket_id"
echo "----------------------------------------"

echo "3) Create ticket (multipart with files) as USER (tests attachments)"
# create a small temp file
tmpfile=$(mktemp /tmp/testfile.XXXX.txt)
echo "sample file content" > "$tmpfile"
echo "POST multipart /api/tickets/ with files (key=files)"
curl_multipart "/api/tickets/" "$USER_TOKEN" "subject=upload test" "message=uploading file via script" "priority=medium" "files=@${tmpfile}"
rm -f "$tmpfile"
echo "----------------------------------------"

echo "4) If ticket created above, list attachments for that ticket (GET ticket detail)"
if [ -n "$ticket_id" ]; then
  echo "GET /api/tickets/$ticket_id/ (expect attachments field)"
  curl_json GET "/api/tickets/$ticket_id/" "$USER_TOKEN"
else
  echo "No ticket id from step 2; skipping ticket detail check."
fi
echo "----------------------------------------"

echo "5) List ticket replies filtered by ticket (GET /api/ticket-replies/?ticket=<id>)"
if [ -n "$ticket_id" ]; then
  curl_json GET "/api/ticket-replies/?ticket=${ticket_id}" "$USER_TOKEN"
else
  echo "Skipping replies check (no ticket id)."
fi
echo "----------------------------------------"

echo "6) Try to create a reply as USER (should be forbidden unless user has role)"
reply_payload='{"ticket":'"${ticket_id:-null}"',"message":"user reply attempt from script"}'
echo "POST /api/ticket-replies/ as USER (expected: 403 if user not consultant/admin)"
curl_json POST "/api/ticket-replies/" "$USER_TOKEN" "$reply_payload"
echo "Now try as ADMIN (if ADMIN_TOKEN provided)"
if [ -n "$ADMIN_TOKEN" ]; then
  curl_json POST "/api/ticket-replies/" "$ADMIN_TOKEN" "$reply_payload"
else
  echo "ADMIN_TOKEN not provided; skipping admin reply test."
fi
echo "----------------------------------------"

echo "7) Change ticket status (POST /api/tickets/<id>/change-status/) as ADMIN/CONSULTANT"
if [ -n "$ticket_id" ]; then
  status_payload='{"status":"pending"}'
  echo "As USER (should be forbidden):"
  curl_json POST "/tickets/${ticket_id}/change-status/" "$USER_TOKEN" "$status_payload"
  if [ -n "$ADMIN_TOKEN" ]; then
    echo "As ADMIN (should succeed):"
    curl_json POST "/tickets/${ticket_id}/change-status/" "$ADMIN_TOKEN" "$status_payload"
  else
    echo "ADMIN_TOKEN not provided; skipping admin change-status test."
  fi
else
  echo "No ticket id; skipping change-status."
fi
echo "----------------------------------------"

echo "8) Ticket attachments endpoint (list by ticket) GET /api/ticket-attachments/?ticket=<id>"
if [ -n "$ticket_id" ]; then
  curl_json GET "/api/ticket-attachments/?ticket=${ticket_id}" "$USER_TOKEN"
else
  echo "Skipping attachments list (no ticket id)."
fi
echo "----------------------------------------"

echo "9) Test documents endpoint used by slider: GET /api/user-proposal-uploads/"
curl_json GET "/api/user-proposal-uploads/?ordering=-uploaded_at" "$USER_TOKEN"
echo "----------------------------------------"

echo "10) Cleanup (optional): delete created ticket (if API supports DELETE)"
if [ -n "$ticket_id" ]; then
  echo "Attempting DELETE /api/tickets/$ticket_id as USER (may fail if not owner)"
  curl_json DELETE "/api/tickets/${ticket_id}/" "$USER_TOKEN"
  echo "Attempting DELETE /api/tickets/$ticket_id as ADMIN (if provided)"
  if [ -n "$ADMIN_TOKEN" ]; then
    curl_json DELETE "/api/tickets/${ticket_id}/" "$ADMIN_TOKEN"
  fi
fi

echo
echo "DONE. Review outputs above for HTTP status and JSON responses."
