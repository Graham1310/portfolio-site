"""
Capture a real Proteus /overview screenshot using invented day data.

Starts the local Flask app with auth disabled, loads the real overview UI,
injects sample App.state payloads (so no personal DB values appear), then
writes a WebP into the portfolio public/ folder.
"""

from __future__ import annotations

import json
import os
import socket
import subprocess
import sys
import time
import urllib.request
from datetime import date, timedelta
from pathlib import Path

from playwright.sync_api import sync_playwright

PORTFOLIO = Path(__file__).resolve().parents[1]
DASHBOARD = Path(r"C:\Users\blairg\Source\Repos\Personal\HealthDashboard")
OUT_PNG = PORTFOLIO / "scripts" / "dashboard-overview.png"
OUT_WEBP = PORTFOLIO / "public" / "dashboard-overview.webp"
PORT = 5055
BASE = f"http://127.0.0.1:{PORT}"
SAMPLE_DATE = date(2026, 10, 2)


def _free_port(port: int) -> bool:
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
        return sock.connect_ex(("127.0.0.1", port)) != 0


def _fake_day(day: date) -> dict:
    iso = day.isoformat()
    return {
        "date": iso,
        "as_of": iso,
        "selected_date": iso,
        "generated_at": f"{iso}T12:00:00",
        "holiday_mode": {"active": False},
        "cut_sprint": {"active": False},
        "note": "Your daily health snapshot",
        "raw": {
            "garmin": {
                "steps": 9840,
                "active_calories": 612,
                "bmr_calories": 1780,
                "total_calories": 2392,
                "resting_heart_rate": 52,
                "stress_level": 18,
                "hrv_weekly_avg": 58,
                "vo2_max": 44.0,
                "sleep": {
                    "duration_hours": 7.5,
                    "deep_sleep_hours": 1.6,
                    "rem_sleep_hours": 1.9,
                    "sleep_score": 84,
                },
                "readiness": {
                    "body_battery": {"score": 88, "status": "High"},
                    "training_readiness": {"score": 78, "label": "Ready"},
                },
                "activities": [
                    {
                        "name": "Morning Swim",
                        "type": "lap_swimming",
                        "duration_mins": 42,
                        "distance_km": 1.5,
                        "avg_hr": 138,
                        "calories": 340,
                    },
                    {
                        "name": "Upper Strength",
                        "type": "strength_training",
                        "duration_mins": 45,
                        "calories": 280,
                    },
                ],
            },
            "withings": {
                "weight_kg": 88.4,
                "fat_percentage": 18.6,
                "muscle_mass_kg": 68.9,
                "blood_pressure": {"systolic": 118, "diastolic": 74},
                "heart_rate": 54,
            },
            "myfitnesspal": {
                "calories": 2140,
                "protein_g": 168,
                "carbs_g": 210,
                "fat_g": 68,
                "fiber_g": 32,
                "water_ml": 2200,
                "meals": {
                    "breakfast": [
                        {
                            "food": "Oats and berries",
                            "calories": 420,
                            "protein_g": 22,
                            "carbs_g": 62,
                            "fat_g": 10,
                        }
                    ],
                    "lunch": [
                        {
                            "food": "Chicken and rice",
                            "calories": 640,
                            "protein_g": 55,
                            "carbs_g": 70,
                            "fat_g": 14,
                        }
                    ],
                    "dinner": [
                        {
                            "food": "Salmon and veg",
                            "calories": 710,
                            "protein_g": 58,
                            "carbs_g": 45,
                            "fat_g": 32,
                        }
                    ],
                    "snacks": [
                        {
                            "food": "Greek yogurt",
                            "calories": 180,
                            "protein_g": 20,
                            "carbs_g": 12,
                            "fat_g": 5,
                        }
                    ],
                },
                "goals": {
                    "calories": 2200,
                    "protein": 170,
                    "carbohydrates": 220,
                    "fat": 70,
                },
            },
        },
        "analysis": None,
        "calculations": {
            "weight_loss": {
                "current_weight": 88.4,
                "target_weight": 85.0,
                "weekly_change": -0.3,
                "daily": {
                    "deficit_kcal": 520,
                    "intake_kcal": 2140,
                    "burn_kcal": 2660,
                },
            }
        },
        "workout_adherence": {
            "status": "complete",
            "planned": "Swim + upper gym",
            "today_planned": "Swim + upper gym",
            "note": "Both sessions logged.",
        },
        "readiness_gate": {
            "verdict": "GO",
            "reasons": ["Sleep and readiness look solid."],
        },
        "plan_cta": {"href": "/swimbuilder", "label": "Open Swim Builder"},
        "weekly_trends": {},
        "running_deficit": {
            "deficit_kcal": 320,
            "avg_deficit_kcal": 280,
            "daily_breakdown": [],
        },
        "weekly_goals": {
            "as_of": iso,
            "generated_at": "2026-09-29",
            "generated_label": "29 Sep 2026",
            "current_week_start": "2026-09-29",
            "current_week_end": "2026-10-05",
            "stale": False,
            "goals": [
                {
                    "text": "Keep daily calories in the 2000 to 2200 range.",
                    "category": "nutrition",
                },
                {
                    "text": "Complete five structured sessions: swim and strength.",
                    "category": "activity",
                },
                {
                    "text": "Hold an 8+ hour sleep average with sleep score 80+.",
                    "category": "recovery",
                },
            ],
        },
    }


def _fake_days(n: int = 30) -> list[dict]:
    days = []
    for i in range(n):
        day = SAMPLE_DATE - timedelta(days=i)
        payload = _fake_day(day)
        days.append(
            {
                "date": day.isoformat(),
                "garmin": payload["raw"]["garmin"],
                "withings": payload["raw"]["withings"],
                "myfitnesspal": payload["raw"]["myfitnesspal"],
            }
        )
    return days


SETTINGS = {
    "scheduler": {"weekly_summary_enabled": True},
    "targets": {
        "calorie_target": 2200,
        "steps": 8000,
        "weight_kg": 85,
        "protein_g_per_kg": 2.0,
    },
    "holiday_mode": {"active": False},
    "cut_sprint": {"active": False},
}


def _start_server() -> subprocess.Popen:
    if not _free_port(PORT):
        raise RuntimeError(f"Port {PORT} is already in use")

    env = os.environ.copy()
    env["DASHBOARD_PASSWORD_HASH"] = ""
    env["FLASK_DEBUG"] = "0"
    env["PYTHONUNBUFFERED"] = "1"

    code = f"""
import os
os.environ["DASHBOARD_PASSWORD_HASH"] = ""
from app import app
app.run(host="127.0.0.1", port={PORT}, debug=False, use_reloader=False)
"""
    return subprocess.Popen(
        [sys.executable, "-c", code],
        cwd=str(DASHBOARD),
        env=env,
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        text=True,
    )


def _wait_ready(timeout: float = 45.0) -> None:
    deadline = time.time() + timeout
    last_err = None
    while time.time() < deadline:
        try:
            with urllib.request.urlopen(f"{BASE}/overview", timeout=2) as resp:
                if resp.status == 200:
                    return
        except Exception as exc:  # noqa: BLE001
            last_err = exc
            time.sleep(0.4)
    raise RuntimeError(f"Dashboard did not become ready: {last_err}")


def main() -> None:
    OUT_WEBP.parent.mkdir(parents=True, exist_ok=True)
    proc = _start_server()
    try:
        _wait_ready()
        day = _fake_day(SAMPLE_DATE)
        days30 = _fake_days(30)

        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            page = browser.new_page(
                viewport={"width": 1440, "height": 1200},
                device_scale_factor=2,
            )
            console: list[str] = []
            page.on("console", lambda msg: console.append(f"{msg.type}: {msg.text}"))

            # Intercept so boot never pulls personal DB values while scripts load.
            page.route(
                "**/api/day/**",
                lambda route: route.fulfill(
                    status=200,
                    content_type="application/json",
                    body=json.dumps(day),
                ),
            )
            page.route(
                "**/api/historical/**",
                lambda route: route.fulfill(
                    status=200,
                    content_type="application/json",
                    body=json.dumps(
                        {
                            "days": days30,
                            "week": {"days": days30[:7], "trends": {}},
                            "trends": {
                                "weight_change_kg": -0.3,
                                "trend_weight_kg": 88.6,
                                "trend_weight_delta_7d": -0.2,
                            },
                        }
                    ),
                ),
            )
            page.route(
                "**/api/settings**",
                lambda route: route.fulfill(
                    status=200,
                    content_type="application/json",
                    body=json.dumps(SETTINGS),
                ),
            )

            page.goto(f"{BASE}/overview", wait_until="domcontentloaded")
            page.wait_for_function("typeof App !== 'undefined' && typeof renderPage === 'function'")

            # Force invented state into the real overview renderer.
            page.evaluate(
                """({ day, days30, settings }) => {
                  App.state.settings = settings;
                  App.state.today = day;
                  App.state.currentDate = day.date;
                  App.state.asOf = day.as_of;
                  App.state.historical = days30.slice(0, 7).reverse();
                  App.state.historical30 = days30.slice().reverse();
                  App.state.trends = {
                    weight_change_kg: -0.3,
                    trend_weight_kg: 88.6,
                    trend_weight_delta_7d: -0.2,
                  };
                  App.state.macro_trends = {};
                  App.state.streaks = {};
                  App.state.best_streaks = {};
                  App.state.personal_bests = {};
                  App.state.running_deficit = day.running_deficit || {
                    deficit_kcal: 320,
                    avg_deficit_kcal: 280,
                    daily_breakdown: [],
                  };
                  if (typeof App.applyMood === 'function') {
                    try { App.applyMood(); } catch (e) { console.warn(e); }
                  }
                  try {
                    renderPage();
                  } catch (e) {
                    console.error('renderPage failed', e);
                  }
                  App.showPageContent();
                }""",
                {"day": day, "days30": days30, "settings": SETTINGS},
            )

            page.wait_for_selector("#app-content", state="visible", timeout=10000)
            # Prefer filled stat cards; still capture if only partial render.
            try:
                page.wait_for_function(
                    """() => {
                      const el = document.querySelector('#stat-cards');
                      return el && el.children.length > 0;
                    }""",
                    timeout=8000,
                )
            except Exception:
                print("stat-cards still empty; capturing anyway")
                print("console:", *console[-20:], sep="\n  ")
            page.wait_for_timeout(800)

            page.add_style_tag(
                content="""
                .sidebar, .sidebar-overlay, .mobile-header { display: none !important; }
                .app { grid-template-columns: 1fr !important; }
                .main { margin-left: 0 !important; max-width: 1200px; margin-inline: auto; }
                #loading { display: none !important; }
                #app-content { display: block !important; }
                #garmin-mfa-banner, .ov-mfa { display: none !important; }
                """
            )
            page.wait_for_timeout(250)

            page.locator("#app-content").screenshot(path=str(OUT_PNG))
            browser.close()

            if console:
                print("console:", *console[:12], sep="\n  ")

        try:
            from PIL import Image

            image = Image.open(OUT_PNG).convert("RGB")
            image.save(OUT_WEBP, "WEBP", quality=82, method=6)
            print(f"wrote {OUT_WEBP}")
        except ImportError:
            fallback = PORTFOLIO / "public" / "dashboard-overview.png"
            fallback.write_bytes(OUT_PNG.read_bytes())
            print(f"Pillow missing; wrote {fallback}")
    finally:
        proc.terminate()
        try:
            proc.wait(timeout=8)
        except subprocess.TimeoutExpired:
            proc.kill()


if __name__ == "__main__":
    main()
