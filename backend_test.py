import json
import os
import subprocess
import urllib.request

BASE_URL = os.environ.get("NEXT_PUBLIC_BASE_URL", "https://fam-auto-marketplace.preview.emergentagent.com").rstrip("/")


def check_health():
    url = f"{BASE_URL}/api"
    request = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 backend-test"})
    with urllib.request.urlopen(request, timeout=30) as response:
        body = response.read().decode("utf-8")
        payload = json.loads(body)
        assert response.status == 200, response.status
        assert payload.get("ok") is True, payload
        assert payload.get("service") == "FAM AutoMobile", payload
    print(f"PASS health: GET {url} returned expected JSON")


def check_build():
    result = subprocess.run(["yarn", "build"], cwd="/app", text=True, capture_output=True, timeout=180)
    if result.returncode != 0:
        print("FAIL build")
        print(result.stdout[-4000:])
        print(result.stderr[-4000:])
        raise SystemExit(result.returncode)
    print("PASS build: Next.js compiled successfully")


if __name__ == "__main__":
    try:
        check_health()
        check_build()
        print("BACKEND TESTS PASSED")
    except Exception as exc:
        print(f"BACKEND TESTS FAILED: {exc}")
        raise
