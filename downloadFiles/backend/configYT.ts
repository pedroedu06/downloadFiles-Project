import 'dotenv/config';
import type { VideoInfo } from './types.ts';
import axios from 'axios';

const apikey = process.env.YT_DATA_API_KEY;
const baseURL = process.env.BASE_URL

if (!apikey && !baseURL) {
    throw new Error("dos dados estao invalidos");
}

export async function getVideos(): Promise<VideoInfo[]> {
    try {
        const res = await axios.get(`${baseURL}/videos`, {
            params: {
                key: apikey,
                part: 'snippet,statistics',
                chart: 'mostPopular',
                maxResults: 20,
                regionCode: 'BR'
            }
        })

        return res.data.items.map((item: any) => ({
            id: item.id,
            title: item.snippet.title,
            thumbnail: item.snippet.thumbnails.default.url,
            views: Number(item.statistics.viewCount),
            likes: Number(item.statistics.likeCount || 0),
            publishedAt: item.snippet.publishedAt
        }));
    } catch (error) {
        console.log("log do error", error)
        throw new Error("erro ao buscar videos");
    }
}


