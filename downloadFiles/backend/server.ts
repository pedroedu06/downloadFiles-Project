import express from 'express';
import cors from 'cors';
import { getVideos } from './configYT'
import { recommendVideos } from './configrecomendedvideos';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/feed', async (__, res) => {
    try {
        const videosInfo = await getVideos();
        const recomendedVideos = recommendVideos(videosInfo)

        res.json(recomendedVideos);
    } catch (error) {
        console.error("error no /feed:", error);
        res.status(500).json({ error: "falha ao obter os videos" });
    }
})

app.listen(3000, () => {
    console.log('servidor rodando na porta 3000');
})