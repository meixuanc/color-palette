import React, { Component } from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';
import DraggableColorList from './DraggableColorList';
import { arrayMove } from 'react-sortable-hoc';
import FormNav from './FormNav';
import ColorPicker from './ColorPicker';
import styles from './styles/NewPaletteFormStyles';
import seedPalettes from './seedPalettes';

class NewPaletteForm extends Component {
	static defaultProps = {
		maxColors: 20
	};

	state = {
		open: true,
		colors: seedPalettes[0].colors
	};

	handleDrawerOpen = () => {
		this.setState({ open: true });
	};

	handleDrawerClose = () => {
		this.setState({ open: false });
	};

	addNewColor = (newColor) => {
		this.setState({ colors: [ ...this.state.colors, newColor ] });
	};

	handleChange = (evt) => {
		this.setState({
			[evt.target.name]: evt.target.value
		});
	};

	removeColor = (colorName) => {
		this.setState({
			colors: this.state.colors.filter((color) => color.name !== colorName)
		});
	};

	savePalette = (newPalette) => {
		newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g, '-');
		newPalette.colors = this.state.colors;
		this.props.savePalette(newPalette);
		this.props.history.push('/');
	};

	onSortEnd = ({ oldIndex, newIndex }) => {
		this.setState(({ colors }) => ({
			colors: arrayMove(colors, oldIndex, newIndex)
		}));
	};

	clearColors = () => {
		this.setState({ colors: [] });
	};

	addRandomColor = () => {
		const allColors = seedPalettes.map((palette) => palette.colors).flat();
		let random = Math.floor(Math.random() * allColors.length);
		let randomColor = allColors[random];
		let check = () => this.state.colors.some((color) => color.name === randomColor.name);
		while (check()) {
			random = Math.floor(Math.random() * allColors.length);
			randomColor = allColors[random];
		}
		this.setState({ colors: [ ...this.state.colors, randomColor ] });
	};

	render() {
		const { classes, palettes, maxColors } = this.props;
		const { open } = this.state;

		return (
			<div className={classes.root}>
				<FormNav
					open={open}
					palettes={palettes}
					savePalette={this.savePalette}
					handleDrawerOpen={this.handleDrawerOpen}
				/>
				<Drawer
					className={classes.drawer}
					variant="persistent"
					anchor="left"
					open={open}
					classes={{
						paper: classes.drawerPaper
					}}
				>
					<div className={classes.drawerHeader}>
						<IconButton onClick={this.handleDrawerClose}>
							<ChevronLeftIcon />
						</IconButton>
					</div>
					<Divider />
					<div className={classes.drawerContainer}>
						<Typography variant="h4">Design Your Palette</Typography>
						<div className={classes.buttons}>
							<Button
								className={classes.button}
								variant="contained"
								color="secondary"
								onClick={this.clearColors}
							>
								Clear Palette
							</Button>
							<Button
								className={classes.button}
								variant="contained"
								color="primary"
								onClick={this.addRandomColor}
								disabled={this.state.colors.length === maxColors}
							>
								Random Color
							</Button>
						</div>
						<ColorPicker
							newColorName={this.state.newColorName}
							addNewColor={this.addNewColor}
							colors={this.state.colors}
							maxColors={maxColors}
						/>
					</div>
				</Drawer>
				<main
					className={classNames(classes.content, {
						[classes.contentShift]: open
					})}
				>
					<div className={classes.drawerHeader} />
					<DraggableColorList
						colors={this.state.colors}
						removeColor={this.removeColor}
						axis="xy"
						onSortEnd={this.onSortEnd}
						distance={5}
					/>
				</main>
			</div>
		);
	}
}

export default withStyles(styles, { withTheme: true })(NewPaletteForm);
