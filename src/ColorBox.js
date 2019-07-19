import React, { Component } from 'react';
import { CopyToClipboard } from "react-copy-to-clipboard";
import './ColorBox.css';

export default class ColorBox extends Component {
    state = { copied: false };
    handleCopy = () => {
        this.setState({ copied: true }, () => {
            setTimeout(() => this.setState({ copied: false }), 1500);
        })
    }
    render() {
        return (
            <CopyToClipboard text={this.props.color} onCopy={this.handleCopy}>
                <div style={{ background: this.props.color }} className='ColorBox'>
                    <div style={{ background: this.props.color }} className={`copy-overlay ${this.state.copied && 'show'}`} />
                    <div className={`copy-msg ${this.state.copied && 'show'}`}>
                        <h1>copied</h1>
                        <p>{this.props.color}</p>
                    </div>
                    <div className='copy-container'>
                        <div className='box-content'>
                            <span>{this.props.name}</span>
                        </div>
                        <button className='copy-button'>Copy</button>
                    </div>
                    <span className='see-more'>More</span>
                </div>
            </CopyToClipboard>
        )
    }
}
