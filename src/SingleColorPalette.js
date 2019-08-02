import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';

export default class SingleColorPalette extends Component {
	state = { format: 'hex' };
	gatherShades = (palette, colorToFilterBy) => {
		let shades = [];
		let allColors = palette.colors;
		for (let key in allColors) {
			shades = shades.concat(allColors[key].filter((color) => color.id === colorToFilterBy));
		}
		return shades.slice(1);
	};
	changeFormat = (val) => {
		this.setState({ format: val });
	};
	render() {
		const { palette, colorId } = this.props;
		const shades = this.gatherShades(palette, colorId);
		const colorBoxes = shades.map((color) => (
			<ColorBox key={color.name} name={color.name} color={color[this.state.format]} showLink={false} />
		));
		return (
			<div className="SingleColorPalette Palette">
				<Navbar handleFormatChange={this.changeFormat} showSlider={false} />
				<div className="Palette-colors">
					{colorBoxes}
					<Link to={`/palette/${palette.id}`}>
						<div className="go-back ColorBox">
							<button className="back-button">Go Back</button>
						</div>
					</Link>
				</div>
				<PaletteFooter paletteName={palette.paletteName} emoji={palette.emoji} />
			</div>
		);
	}
}
