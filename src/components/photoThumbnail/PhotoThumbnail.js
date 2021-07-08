import React from 'react';
import Modal from 'react-modal';
import ModalPhoto from '../modalPhoto/ModalPhoto';
import './PhotoThumbnail.scss';

class PhotoThumbnail extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
          showModal: false,
          showLens: false
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
        const photo = this.props.photo;
        return (
            <div>
                <div className="item-photo">
                    <img src={photo.src.large} alt='' onClick={this.handleOpenModal} />
                </div>
                <Modal className="modal-photo" isOpen={this.state.showModal} ariaHideApp={false}>
                    <ModalPhoto onClick={this.handleCloseModal} photo={photo}/>
                </Modal>
            </div>
        );
    }
}

export default PhotoThumbnail;



