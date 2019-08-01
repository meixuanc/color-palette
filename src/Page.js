import React, { Component } from 'react';
import './styles/Page.css';

export default class Page extends Component {
    render() {
        return (
            <div className='page'>
                {this.props.children}
            </div>
        )
    }
}
