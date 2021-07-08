import './MediaGallery.scss';
import React from 'react';
import PhotoThumbnail from '../photoThumbnail/PhotoThumbnail'
import VideoThumbnail from '../videoThumbnail/VideoThumbnail'

class MediaGallery extends React.Component {
    render () {
        return (
            <div className="gallery">
                {this.props.isPhoto && this.props.media.map((photo) => (
                    <PhotoThumbnail key={photo.id} photo={photo}/>
                ))}
                {!this.props.isPhoto && this.props.media.map((video) => (
                    <VideoThumbnail key={video.id} video={video}/>
                ))}
            </div>
        );
    }
}

export default MediaGallery;
