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
import styles from './styles/NewPaletteFormStyles';

class NewPaletteForm extends Component {
    state = {
        open: true,
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

    savePalette = (newPalette) => {
        newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g, '-');
        newPalette.colors = this.state.colors;
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
