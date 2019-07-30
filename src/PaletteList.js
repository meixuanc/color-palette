import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';
import MiniPalette from './MiniPalette';
import Button from '@material-ui/core/Button';
import styles from './styles/PaletteListStyles';

class PaletteList extends Component {
    goToPalette = (id) => { this.props.history.push(`/palette/${id}`) };
    render() {
        const { palettes, classes, deletePalette } = this.props;
        return (
            <div className={classes.root}>
                <div className={classes.container}>
                    <nav className={classes.nav}>
                        <h1>React Colors</h1>
                        <Link to='/palette/new'><Button variant="outlined" color="inherit" className={classes.button}>
                            Create Palette
                        </Button></Link>
                    </nav>
                    <div className={classes.palettes}>
                        {palettes.map(palette => {
                            return <MiniPalette key={palette.id} id={palette.id} {...palette} handleClick={this.goToPalette} deletePalette={deletePalette}/>;
                        })}
                    </div>
                </div>

            </div>
        )
    }
}

export default withStyles(styles)(PaletteList);