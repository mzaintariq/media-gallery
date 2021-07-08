import './Header.scss';
import React from 'react';
import Search from '../search/Search';
import Logo from '../logo/Logo';
import Switch from '../switch/Switch';

class Header extends React.Component {
    render () {
        return (
            <div className="header">
                <Logo onClick={this.props.onClick}/>
                <div className="form">
                    <Search onSubmit={this.props.onSubmit}/>
                    <Switch onClick={this.props.onClick} searchValue={this.props.searchValue}/>
                </div>
            </div>
        );
    }
}

export default Header;







  