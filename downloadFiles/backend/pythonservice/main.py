from fastapi import FastAPI, Body, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from uuid import uuid4
from pythonservice.redisClient import redisClient
from pythonservice.schemas import DownloadRequest, DownloadStatus

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/downloadtask")
def create_download(data: DownloadRequest):
    job_id = str(uuid4())

    redisClient.set(f"download:{job_id}:status", "queued")
    redisClient.set(f"download:{job_id}:progress", 0)
    redisClient.set(f"download:{job_id}:url", data.url)

    redisClient.expire(f"download:{job_id}:status", 3600)
    redisClient.expire(f"download:{job_id}:progress", 3600)
    redisClient.expire(f"download:{job_id}:url", 3600)

    redisClient.lpush("queue:downloads", job_id)

    return {"job_id": job_id}

@app.get("/download/{job_id}", response_model=DownloadStatus)
def get_status(job_id: str):
    return {
        "job_id": job_id,
        "status": redisClient.get(f"download:{job_id}:status"),
        "progress": float(redisClient.get(f"download:{job_id}:progress") or 0),
    }