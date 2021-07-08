import React from 'react';
import './ModalPhoto.scss';

class ModalPhoto extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
          zoomedIn: false,
          img: '',
          result: '',
          lens: '',
          cx: '',
          cy: '',
        };
    }

    imageZoom = () => {
        let img = document.getElementById('myimage');
        let result = document.getElementById('myresult');
        let lens = document.getElementById('mylens');
        lens.style.border = '2px solid #d4d4d4';
        lens.style.display = 'block';

        /*calculate the ratio between result DIV and lens:*/
        let cx = result.offsetWidth / lens.offsetWidth;
        let cy = result.offsetHeight / lens.offsetHeight;

        /*set background properties for the result DIV:*/
        result.style.backgroundImage = `url(${img.src})`;
        result.style.backgroundSize = `${img.width * cx}px ${img.height * cy}px`;
        
        this.setState({ img: img, result: result, lens: lens, cx: cx, cy: cy });
        lens.addEventListener("mousemove", this.moveLens);
        img.addEventListener("mousemove", this.moveLens);
        result.addEventListener("mousemove", this.moveLens);
        // lens.addEventListener("touchmove", this.moveLens);
        // img.addEventListener("touchmove", this.moveLens);
        // result.addEventListener("touchmove", this.moveLens);
      }

    moveLens = (e) => {
        e.preventDefault();
        /*get the cursor's x and y positions:*/
        let pos = this.getCursorPos(e);
        /*calculate the position of the lens:*/
        let lens = this.state.lens;
        let x = pos.x - (lens.offsetWidth / 2);
        let y = pos.y - (lens.offsetHeight / 2);

        /*set the position of the lens:*/
        lens.style.left = `${x}px`;
        lens.style.top = `${y}px`;

        let result = this.state.result;
        let a = pos.x - (result.offsetWidth / 2);
        let b = pos.y - (result.offsetHeight / 2);
        /*display what the lens "sees":*/
        result.style.left = `${a}px`;
        result.style.top = `${b}px`;
        result.style.backgroundPosition = `-${x * this.state.cx}px -${y * this.state.cy}px`;
        
    }

    getCursorPos = (e) => {
        var a, x = 0, y = 0;
        e = e || window.event;
        /*get the x and y positions of the image:*/
        a = this.state.img.getBoundingClientRect();
        /*calculate the cursor's x and y coordinates, relative to the image:*/
        x = e.pageX - a.left;
        y = e.pageY - a.top;
        /*consider any page scrolling:*/
        x = x - window.pageXOffset;
        y = y - window.pageYOffset;
        return {x : x, y : y};
    }

    handleClick = () => {        
        if (!this.state.zoomedIn) {
            document.getElementById("myresult").style.display = 'block';
            document.getElementById("myimage").style.cursor = 'zoom-out';
            this.imageZoom();
        } else {
            document.getElementById("myresult").style.display = 'none';
            document.getElementById("myimage").style.cursor = 'zoom-in';
            document.getElementById("mylens").style.display = 'none';
        }
        this.setState({ zoomedIn: !this.state.zoomedIn })
    }

    render() {
        const photo = this.props.photo;
        return (
            <div className="modal-photo">
                <div className="img-zoom-container">
                    <div className="lens-image">
                        <div id="mylens" className="img-zoom-lens" onClick={this.handleClick}></div>
                        <img id="myimage" alt="" src={photo.src.original} onClick={this.handleClick}/>
                        <div id="myresult" className="img-zoom-result" onClick={this.handleClick}></div>
                    </div>
                    {/* <div id="myresult" className="img-zoom-result"></div> */}
                </div>
                <button className="close-modal" onClick={this.props.onClick}>Close</button>
            </div>
        );
    }
}

export default ModalPhoto;