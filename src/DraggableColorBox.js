import React, { Component } from 'react';
import { SortableElement } from 'react-sortable-hoc';
import { withStyles } from '@material-ui/styles';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import styles from './styles/DraggableColorBoxStyles';

class DraggableColorBox extends Component {
	handleClick = () => {
		this.props.removeColor(this.props.name);
	};
	render() {
		const { classes, color, name } = this.props;
		return (
			<div className={classes.draggableColorBox} style={{ backgroundColor: color }}>
				<div className={classes.boxContent}>
					<span>{name}</span>
					<DeleteOutlinedIcon className={classes.deleteIcon} onClick={this.handleClick} />
				</div>
			</div>
		);
	}
}

export default withStyles(styles)(SortableElement(DraggableColorBox));
