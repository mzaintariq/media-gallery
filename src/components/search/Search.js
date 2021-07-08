import React from 'react';
import searchIcon from '../../icons/search.svg';
import './Search.scss';

class Search extends React.Component {
    onFormSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit(e.target.querySelector('input').value);
    }
    
    render () {
        return (
            <form className="search-bar" onSubmit={this.onFormSubmit} >
                <input type="text" id="search" placeholder="Search" />
                <button type="submit"><img className="search-icon" alt="search icon" src={searchIcon}></img></button>
            </form>
        );
    }
}

export default Search;







  