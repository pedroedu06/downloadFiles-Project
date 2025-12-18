import React from 'react';
import './VideoGrid.css';
import CardVideo from './CardVideo';
import { useEffect, useState } from 'react';

type Video = {
    id: string;
    thumbnail: string;
    title: string;
    likes: number;
    views: number;
};


const VideoGrid: React.FC = () => {

const [video, setVideos] = useState<Video[]>([]);

    useEffect(() => {
        fetch('http://localhost:3000/feed')
            .then(res => res.json())
            .then((dataVideos: Video[]) => {
                if (!Array.isArray(dataVideos)) return;
                setVideos(dataVideos);
            })
    }, []);


return (
    <div className="vv-grid-outer" role="region" aria-label="Video grid">
        <div className="vv-grid-scroll">
            <div className="vv-grid-inner">
                {video.map((videos) => (
                    <CardVideo key={videos.id} thumbnail={videos.thumbnail} title={videos.title} likes={videos.likes} views={videos.views} />
                ))}
            </div>
        </div>
    </div>
  );
  
};

export default VideoGrid;
