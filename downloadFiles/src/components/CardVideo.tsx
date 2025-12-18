import React from 'react';
import './CardVideo.css';
import { BiLike } from 'react-icons/bi';
import { FaEye } from 'react-icons/fa';

type Props = {
  thumbnail: string;
  title: string;
  likes: number;
  views: number;
};

const CardVideo: React.FC<Props> = ({ thumbnail, title, likes, views }) => {
  return (
    <div className="cv-card">
      <img className="cv-thumbnail" src={thumbnail} alt={title} />
      <div className="cv-title" title={title}>{title}</div>
      <div className="cv-metrics">
        <span className="cv-metric"><BiLike className="cv-icon" /> <span className="cv-number">{likes}</span></span>
        <span className="cv-metric"><FaEye className="cv-icon" /> <span className="cv-number">{views}</span></span>
      </div>
      <div className="cv-download-wrapper">
        <button className="cv-download-btn">baixar</button>
      </div>
    </div>
  );
};

export default CardVideo;
