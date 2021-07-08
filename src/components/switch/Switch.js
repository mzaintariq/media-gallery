import './Switch.scss';
import React from 'react';

class Switch extends React.Component {
    handleToggle = () => {
        var checkBox = document.getElementById("isVideo");
        var searchValue = this.props.searchValue;

        if (searchValue !== '') {
            if (checkBox.checked === true){
                const url = `https://api.pexels.com/videos/search?query=${searchValue}&page=1&per_page=12`;
                this.props.onClick(url);
            } else {
                const url= `https://api.pexels.com/v1/search?query=${searchValue}&page=1&per_page=12`;
                this.props.onClick(url);
            }
        } else {
            if (checkBox.checked === true){
                const url = `https://api.pexels.com/videos/popular?page=1&per_page=12`;
                this.props.onClick(url);
            } else {
                const url= `https://api.pexels.com/v1/curated?page=1&per_page=12`;
                this.props.onClick(url);
            }
        }
    }
    
    render () {
        return (
            <span className="switch">
                <input type="checkbox" id="isVideo" onClick={this.handleToggle}/>
                <label htmlFor="isVideo"></label>
            </span>
        );
    }
}

export default Switch;