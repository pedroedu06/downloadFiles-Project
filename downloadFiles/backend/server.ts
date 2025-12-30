import express from 'express';
import cors from 'cors';
import { getVideos } from './configYT'
import { recommendVideos } from './configrecomendedvideos';
import { extractVideoID } from './extractIdVideo';
import { getInfosVideo } from './getVideo';
import { error } from 'node:console';

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

app.post('/getInfoVideo', async (req, res) => {
    try {

        const { url } = req.body;

        console.log("BODY:", req.body);
        console.log("URL:", url);
        if (!url){
            return res.status(400).json({error:"url nao enviada!"})
        }

        const VideoId = extractVideoID(url);

        console.log("VIDEO ID:", VideoId);


        if (!VideoId) {
            return res.status(400).json({ error: "URL inválida" });
        }

        const prewiewInfo = await getInfosVideo(VideoId);

        res.json(prewiewInfo);
    } catch (error) {
        console.error("error no /getInfoVideo:", error);
        if (res.status(403)){
            console.error("youtube bloqueou a requisicao")
        }
        
        res.status(500).json({ error: "falha ao obter as informacoes do video" });
    }
})

app.listen(3000, () => {
    console.log('servidor rodando na porta 3000');
})