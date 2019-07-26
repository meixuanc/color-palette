import React, { Component } from 'react';
import { SortableElement } from "react-sortable-hoc";
import { withStyles } from '@material-ui/styles';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';

const styles = {
    draggableColorBox: {
        width: '20%',
        height: '25%',
        margin: '0 auto',
        display: 'inline-block',
        position: 'relative',
        textTransform: 'uppercase',
        marginBottom: '-3.5px',
    },
    boxContent: {
        position: "absolute",
        width: "100%",
        left: "0px",
        bottom: "0px",
        padding: "10px",
        color: "rgba(0,0,0,0.5)",
        letterSpacing: "1px",
        fontSize: "12px",
        display: "flex",
        justifyContent: "space-between",
        "&:hover svg": {
            color: "white",
            transform: "scale(1.5)"
        }
    },
    deleteIcon: {
        fontSize: "16px",
        color: "rgba(0,0,0,0.5)",
        transition: "all 0.3s ease-in-out"
    }
}

class DraggableColorBox extends Component {
    handleClick = () => {
        this.props.removeColor(this.props.name);
    }
    render() {
        const { classes, color, name } = this.props;
        return (
            <div className={classes.draggableColorBox} style={{ backgroundColor: color }}>
                <div className={classes.boxContent}>
                    <span>{name}</span>
                    <DeleteOutlinedIcon className={classes.deleteIcon} onClick={this.handleClick}/>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(SortableElement(DraggableColorBox));