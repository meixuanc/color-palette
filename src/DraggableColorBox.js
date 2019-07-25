import React, { Component } from 'react'
import { withStyles } from '@material-ui/styles';

const styles = {
    DraggableColorBox: {
        width: '20%',
        height: '25%',
        margin: '0 auto',
        display: 'inline-block',
        position: 'relative',
        textTransform: 'uppercase',
        marginBottom: '-3.5px'
    }
}

class DraggableColorBox extends Component {
    render() {
        const { classes, color, name } = this.props;
        return (
            <div className={classes.DraggableColorBox} style={{ backgroundColor: color }}>
                {name}
            </div>
        )
    }
}

export default withStyles(styles)(DraggableColorBox);