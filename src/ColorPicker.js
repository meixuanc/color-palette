import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { ChromePicker } from 'react-color';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles/ColorPickerStyles';

class ColorPicker extends Component {
	static defaultProps = {
		maxColors: 20
	};

	state = {
		currentColor: 'purple',
		newColorName: ''
	};

	componentDidMount() {
		ValidatorForm.addValidationRule('isNameUnique', (value) =>
			this.props.colors.every(({ name }) => name.toLowerCase() !== value.toLowerCase())
		);
		ValidatorForm.addValidationRule('isColorUnique', (value) =>
			this.props.colors.every(({ color }) => color !== this.state.currentColor)
		);
	}

	updateCurrentColor = (newColor) => {
		this.setState({ currentColor: newColor.hex });
	};

	handleChange = (evt) => {
		this.setState({
			[evt.target.name]: evt.target.value
		});
	};

	addNewColor = () => {
		const newColor = { name: this.state.newColorName, color: this.state.currentColor };
		this.props.addNewColor(newColor);
		this.setState({ newColorName: '' });
	};

	render() {
		const { classes, maxColors, colors } = this.props;
		const full = colors.length === maxColors;
		return (
			<div>
				<ChromePicker
					disableAlpha
					width="100%"
					color={this.state.currentColor}
					onChangeComplete={this.updateCurrentColor}
					className={classes.picker}
				/>
				<ValidatorForm onSubmit={this.addNewColor} instantValidate={false}>
					<TextValidator
						value={this.state.newColorName}
						className={classes.colorNameInput}
						name="newColorName"
						placeholder="Color Name"
						variant="filled"
						margin="normal"
						onChange={this.handleChange}
						validators={[ 'required', 'isNameUnique', 'isColorUnique' ]}
						errorMessages={[
							'Color Name Is Required',
							'Color Name Must Be Unique',
							'Color Already Exists'
						]}
					/>
					<Button
						variant="contained"
						color="primary"
						style={{ backgroundColor: full ? 'gray' : this.state.currentColor }}
						type="submit"
						className={classes.addColor}
						disabled={full}
					>
						{full ? 'Palette Full' : 'Add Color'}
					</Button>
				</ValidatorForm>
			</div>
		);
	}
}

export default withStyles(styles, { withTheme: true })(ColorPicker);
