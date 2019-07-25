import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';
import MiniPalette from './MiniPalette';
import Button from '@material-ui/core/Button';

const styles = {
    root: {
        backgroundColor: 'blue',
        height: '100%',
        display: 'flex',
        alignIterms: 'flex-start',
        justifyContent: 'center'
    },
    container: {
        width: '50%',
        display: 'flex',
        alignIterms: 'flex-start',
        flexDirection: 'column',
        flexWrap: 'wrap',
    },
    nav: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        color: 'white',
        alignItems: 'center',
        '& a': {
            color: 'white',
            textDecoration: 'none'
        }
    },
    palettes: {
        boxSizing: 'border-box',
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(3,30%)',
        gridGap: '5%'
    }
}

class PaletteList extends Component {
    goToPalette = (id) => { this.props.history.push(`/palette/${id}`) };
    render() {
        const { palettes, classes } = this.props;
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
                            return <MiniPalette key={palette.id} {...palette} handleClick={this.goToPalette} />;
                        })}
                    </div>
                </div>

            </div>
        )
    }
}

export default withStyles(styles)(PaletteList);