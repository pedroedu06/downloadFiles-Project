import redis
from yt_dlp import YoutubeDL
from pathlib import Path

r = redis.Redis(host="localhost", port=6379, decode_responses=True)

print("Worker ativo...")

DOWNLOAD_DIR = Path.home() / "Downloads"

def process_job(job_id: str, url: str):

    def hook(d):
        if d["status"] == "downloading":
            percent = d.get("_percent_str", "0%").replace("%", "").strip()
            print(f"Download em progresso [{job_id}]: {percent}%")
            r.set(f"download:{job_id}:progress", percent)
            r.set(f"download:{job_id}:status", "downloading")

        elif d["status"] == "finished":
            print(f"Donwload concluido [{job_id}]")
            r.set(f"download:{job_id}:progress", 100)
            r.set(f"download:{job_id}:status", "done")

    ydl_opts = {
        "progress_hooks": [hook],
        "outtmpl": str(DOWNLOAD_DIR / job_id / "%(title)s.%(ext)s"),
        "js-runtimes": ["node"],
    }

    with YoutubeDL(ydl_opts) as ydl:
        ydl.download([url])


while True:
    _, job_id = r.blpop("queue:downloads")
    url = r.get(f"download:{job_id}:url")
    process_job(job_id, url)