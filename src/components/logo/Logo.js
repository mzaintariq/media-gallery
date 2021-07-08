import './Logo.scss';
import React from 'react';

class Logo extends React.Component {
    handleClick = () => {
        document.getElementById('search').value = '';
        document.getElementById('isVideo').checked = false;
        const url = `https://api.pexels.com/v1/curated?page=1&per_page=12`;
        this.props.onClick(url);
    }
    
    render () {
        return (
            <h1 onClick={this.handleClick} className="logo">MediaGallery</h1>
        );
    }
}

export default Logo;







  