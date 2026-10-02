"""Capture a fake health-dashboard overview screenshot for the portfolio."""

from __future__ import annotations

from pathlib import Path

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
HTML = ROOT / "scripts" / "fake-overview.html"
OUT_PNG = ROOT / "scripts" / "dashboard-overview.png"
OUT_WEBP = ROOT / "public" / "dashboard-overview.webp"


def main() -> None:
    OUT_WEBP.parent.mkdir(parents=True, exist_ok=True)
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1240, "height": 900}, device_scale_factor=2)
        page.goto(HTML.as_uri(), wait_until="networkidle")
        page.locator("#capture").screenshot(path=str(OUT_PNG), type="png")
        browser.close()

    try:
        from PIL import Image

        image = Image.open(OUT_PNG).convert("RGB")
        image.save(OUT_WEBP, "WEBP", quality=82, method=6)
        print(f"wrote {OUT_WEBP.relative_to(ROOT)}")
    except ImportError:
        # Fall back to PNG copied as the web asset if Pillow is missing.
        target = ROOT / "public" / "dashboard-overview.png"
        target.write_bytes(OUT_PNG.read_bytes())
        print(f"Pillow missing; wrote {target.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
