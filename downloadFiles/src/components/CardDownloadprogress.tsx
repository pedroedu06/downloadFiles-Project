import './CardDownloadprogress.css'
import { IoMdClose } from "react-icons/io";

type Props = {
    id: string;
    title: string;
    thumbnail: string;
    onClose: (id: string) => void;
}

const CardDownloadprogress: React.FC<Props> = ({ id, title, thumbnail, onClose }) => {
    return (
        <div className='cv-card-progress'>
            <div className='cv-card-progress-container'>
                <div className='cv-close-container'>
                    <button className='cv-close-item' onClick={() => onClose(id)} aria-label="fechar">
                        <IoMdClose />
                    </button>
                </div>

                <div className='cv-video-info-container'>
                    <img className='cv-video-thumbnail' src={thumbnail} alt={title} />
                    <div className='cv-video-meta'>
                        <h3 className='cv-video-title' title={title}>{title}</h3>
                    </div>
                </div>
            
                    <div className='cv-progressbar-container'>
                        <div className='cv-progressbar-bg'>
                            <div className='cv-progressbar-fill' />
                        </div>
                        <div className='cv-progress-label'>%</div>
                    </div>
              </div>      
        </div>
    )

}

export default CardDownloadprogress;