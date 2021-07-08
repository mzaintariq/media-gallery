import React from 'react';
import Modal from 'react-modal';
import ModalVideo from '../modalVideo/ModalVideo';
import myIcon from '../../icons/play.svg';
import './VideoThumbnail.scss';

class VideoThumbnail extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
          showModal: false,
          isPlaying: false
        };
    }

    handleOpenModal = () => {
        this.setState({ showModal: true });
        document.getElementById("container").style.filter = 'blur(8px)';
    }
      
    handleCloseModal = () => {
        this.setState({ showModal: false });
        document.getElementById("container").style.filter = '';
    }
    
    render() {
        const video = this.props.video;
        return (
            <div>
                <div className="item-video">
                    <video id="check" onClick={this.handleOpenModal}
                        onMouseOver={event => event.target.play()}
                        onMouseOut={event => {
                            event.target.currentTime=0;
                            event.target.pause()
                        }}
                        muted={true}
                        src={video.video_files[0].link} >
                    </video>
                    <div className="overlay">
                        <img id="icon" alt="play icon" src={myIcon}/>
                    </div>
                </div>
                <Modal className="modal-video" isOpen={this.state.showModal} ariaHideApp={false}>
                    <ModalVideo onClick={this.handleCloseModal} video={video}/>
                </Modal>
            </div>
        );
    }
}

export default VideoThumbnail;