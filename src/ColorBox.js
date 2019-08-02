import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';
import chroma from 'chroma-js';
import './styles/ColorBox.css';

export default class ColorBox extends Component {
	state = { copied: false };
	static defaultProps = { showLink: true };
	handleCopy = () => {
		this.setState({ copied: true }, () => {
			setTimeout(() => this.setState({ copied: false }), 1500);
		});
	};
	render() {
		const isDark = chroma(this.props.color).luminance() <= 0.1;
		const isLight = chroma(this.props.color).luminance() >= 0.7;
		return (
			<CopyToClipboard text={this.props.color} onCopy={this.handleCopy}>
				<div style={{ background: this.props.color }} className="ColorBox">
					<div
						style={{ background: this.props.color }}
						className={`copy-overlay ${this.state.copied && 'show'}`}
					/>
					<div className={`copy-msg ${this.state.copied && 'show'}`}>
						<h1>copied</h1>
						<p className={isLight ? 'dark-text' : ''}>{this.props.color}</p>
					</div>
					<div className="copy-container">
						<div className="box-content">
							<span className={isDark ? 'light-text' : ''}>{this.props.name}</span>
						</div>
						<button className={'copy-button ' + (isLight ? 'dark-text' : '')}>Copy</button>
					</div>
					{this.props.showLink && (
						<Link
							to={`/palette/${this.props.paletteId}/${this.props.id}`}
							onClick={(e) => e.stopPropagation()}
						>
							<span className={'see-more ' + (isLight ? 'dark-text' : '')}>More</span>
						</Link>
					)}
				</div>
			</CopyToClipboard>
		);
	}
}
