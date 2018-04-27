import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
import './header.css';

class Header extends Component {
    render() {
        return (          
            <div className="page-header">
                <Image className="header image" src={require('../../images/car_logo.png')} alt="" height="100px" />
                <h2 className="sitename">Autosale<small>(DRF API + React + Redux)</small></h2>
            </div>
        );
      }
}

export default Header;