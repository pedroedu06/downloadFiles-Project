from pydantic import BaseModel

class DownloadRequest(BaseModel):
    url: str

class DownloadStatus(BaseModel):
    job_id: str
    status: str
    progress: float    