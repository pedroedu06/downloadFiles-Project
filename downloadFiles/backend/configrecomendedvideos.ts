import type { VideoInfo } from "./types";

export function calculateScore(video: VideoInfo): number {
    const viewsWeight = 0.6;
    const likesWeight = 0.4;
    const recentWeight = 0.1;

    const viewsScore = video.views * viewsWeight;
    const likesScore = viewsScore * likesWeight;

    const dateOld = Date.now() - new Date(video.publishedAt).getTime() / (1000 * 60 * 60 * 24);

    const recenteScore = dateOld < 7 ? 100_000 * recentWeight : 0;

    return viewsScore + likesScore + recenteScore;
}

export function recommendVideos(videos: VideoInfo[]): VideoInfo[] {
    return videos
    .map(video => ({
        ...video, 
        score: calculateScore(video)
    }))
    .sort((a, b) => (b.score || 0) - (a.score || 0))
}