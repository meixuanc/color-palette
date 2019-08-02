import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './styles/Navbar.css';

export default class Navbar extends Component {
	static defaultProps = { showSlider: true };
	state = { format: 'hex', open: false };

	handleFormatChange = (e) => {
		this.setState({ format: e.target.value, open: true });
		this.props.handleFormatChange(e.target.value);
	};

	closeSnackbar = () => {
		this.setState({ open: false });
	};

	render() {
		return (
			<header className="Navbar">
				<div className="logo">
					<Link to="/">ColorPalette</Link>
				</div>
				{this.props.showSlider && (
					<div className="slider-container">
						<span className="color-level">Level: {this.props.level} </span>
						<div className="slider">
							<Slider
								defaultValue={this.props.level}
								min={100}
								max={900}
								step={100}
								onAfterChange={this.props.changeLevel}
							/>
						</div>
					</div>
				)}
				<div className="select-container">
					<Select value={this.state.format} onChange={this.handleFormatChange}>
						<MenuItem value="hex">HEX - #ffffff</MenuItem>
						<MenuItem value="rgb">RGB - rgb(255,255,255)</MenuItem>
						<MenuItem value="rgba">RGBA - rgba(255,255,255,1.0)</MenuItem>
					</Select>
				</div>
				<Snackbar
					anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
					open={this.state.open}
					autoHideDuration={3000}
					message={<span id="message-id">Format Changed to {this.state.format.toUpperCase()}</span>}
					ContentProps={{ 'aria-describedby': 'message-id' }}
					onClose={this.closeSnackbar}
					action={[
						<IconButton onClick={this.closeSnackbar} key="close" aria-label="close">
							<CloseIcon />
						</IconButton>
					]}
				/>
			</header>
		);
	}
}
