import React, { Component } from 'react';
import classNames from 'classnames';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import PaletteMetaForm from './PaletteMetaForm';
import styles from './styles/FormNavStyles';

class FormNav extends Component {
    state = {
        newPaletteName: '',
        formShowing: false
    }

    showForm = () => {
        this.setState({ formShowing: true })
    }

    closeForm = () => {
        this.setState({ formShowing: false })
    }

    render() {
        const { classes, open, palettes, savePalette } = this.props;
        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    color='default'
                    position="fixed"
                    className={classNames(classes.appBar, {
                        [classes.appBarShift]: open,
                    })}
                >
                    <Toolbar disableGutters={!open}>
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={this.props.handleDrawerOpen}
                            className={classNames(classes.menuButton, open && classes.hide)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit" noWrap>
                            Create A Palette
                        </Typography>
                    </Toolbar>
                    <div className={classes.navBtns}>
                        <Link to='/'>
                            <Button variant="contained" color='secondary' className={classes.button}>Go Back</Button>
                        </Link>
                        <Button variant="contained" color="primary" onClick={this.showForm} className={classes.button}>
                            Save Palette
                        </Button>
                    </div>
                </AppBar>
                {this.state.formShowing && <PaletteMetaForm savePalette={savePalette} palettes={palettes} closeForm={this.closeForm}/>}
            </div>
        )
    }
}

export default withStyles(styles, { withTheme: true })(FormNav);