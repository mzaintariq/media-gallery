import React from 'react';
import myIcon from '../../icons/play.svg';
import './ModalVideo.scss';

class ModalVideo extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
          isPlaying: false
        };
    }

    handlePlay = () => {
        if (this.state.isPlaying) {
            document.getElementById("video-modal").pause();
            document.getElementById("overlay-video").style.display = "block";
        } else {
            document.getElementById("video-modal").play();
            document.getElementById("overlay-video").style.display = "none";
        }
        this.setState({isPlaying: !this.state.isPlaying});
    }

    render() {
        const videoHD = this.props.video.video_files.filter((vid) => vid.quality === 'hd')[0];
        return (
            <div className="modal-video">
                <div className="item-modalVideo">
                    {/* <video id="video-modal" src={video.video_files[0].link} width={video.video_files[0].width} height={video.video_files[0].height} onClick={this.handlePlay}></video> */}
                    <video id="video-modal" src={videoHD.link} onClick={this.handlePlay}></video>
                    <div className="overlay-video" id="overlay-video" onClick={this.handlePlay}>
                        <img id="icon" alt="play icon" src={myIcon}/>
                    </div>
                    {/* <iframe src={video.video_files[0].link}></iframe> */}
                </div>
                <button className="close-modal" onClick={this.props.onClick}>Close</button>
            </div>
        );
    }
}

export default ModalVideo;