import './LoadMore.scss';
import React from 'react';

class LoadMore extends React.Component {
    loadMore = () => {
        this.props.onAction(this.props.nextURL);
    }
    
    render () {
        return (
            <button className="load-more" onClick={this.loadMore}>Load More</button>
        );
    }
}

export default LoadMore;







  