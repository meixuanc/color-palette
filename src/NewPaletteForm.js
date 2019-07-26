import React, { Component } from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';
import DraggableColorList from "./DraggableColorList";
import { arrayMove } from "react-sortable-hoc";
import FormNav from './FormNav';
import ColorPicker from './ColorPicker';

const drawerWidth = 400;

const styles = theme => ({
    root: {
        display: 'flex'
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0
    },
    drawerPaper: {
        width: drawerWidth,
        display: 'flex',
        alignItems: 'center'
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        height: 'calc(100vh - 64px)',
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    drawerContainer: {
        width: '80%',
        height: '80%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttons: {
        width: "100%"
    },
    button: {
        width: "50%"
    }
});

class NewPaletteForm extends Component {
    state = {
        open: false,
        // colors: [],
        colors: this.props.palettes[0].colors,
    };

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    addNewColor = (newColor) => {
        this.setState({ colors: [...this.state.colors, newColor] })
    }

    handleChange = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.value
        })
    }

    removeColor = (colorName) => {
        this.setState({
            colors: this.state.colors.filter(color => color.name !== colorName)
        });
    }

    savePalette = (newName) => {
        const newPalette = {
            paletteName: newName,
            id: newName.toLowerCase().replace(/ /g, '-'),
            colors: this.state.colors
        };
        this.props.savePalette(newPalette);
        this.props.history.push("/");
    }

    onSortEnd = ({ oldIndex, newIndex }) => {
        this.setState(({ colors }) => ({
            colors: arrayMove(colors, oldIndex, newIndex)
        }))
    }

    clearColors = () => {
        this.setState({ colors: [] })
    }

    addRandomColor = () => {
        const allColors = this.props.palettes.map(palette => palette.colors).flat();
        let random = Math.floor(Math.random() * allColors.length);
        this.setState({ colors: [...this.state.colors, allColors[random]] })
    }

    render() {
        const { classes, palettes } = this.props;
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
                        paper: classes.drawerPaper,
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
                            <Button className={classes.button} variant="contained" color='secondary' onClick={this.clearColors}>Clear Palette</Button>
                            <Button className={classes.button} variant="contained" color='primary' onClick={this.addRandomColor}>Random Color</Button>
                        </div>
                        <ColorPicker
                            currentColor={this.state.currentColor}
                            newColorName={this.state.newColorName}
                            addNewColor={this.addNewColor}
                            colors={this.state.colors}
                        />
                    </div>
                </Drawer>
                <main
                    className={classNames(classes.content, {
                        [classes.contentShift]: open,
                    })}
                >
                    <div className={classes.drawerHeader} />
                    <DraggableColorList
                        colors={this.state.colors}
                        removeColor={this.removeColor}
                        axis="xy"
                        onSortEnd={this.onSortEnd}
                    />
                </main>
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(NewPaletteForm);
