from pydantic import BaseModel

class VideoAnalytics(BaseModel):
    vd_id: str
    day: str
    views: int
    likes: int
    comm: int
    shares: int
    subgain: int
    sublost: int
