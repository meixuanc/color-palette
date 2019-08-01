import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';
import MiniPalette from './MiniPalette';
import Button from '@material-ui/core/Button';
import styles from './styles/PaletteListStyles';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';

class PaletteList extends Component {
    state = {
        openDeleteDialog: false,
        deletingId: ''
    }

    openDeleteDialog = (id) => {
        this.setState({ openDeleteDialog: true, deletingId: id })
    }

    closeDeleteDialog = () => {
        this.setState({ openDeleteDialog: false, deletingId: '' })
    }

    deletePalette = () => {
        this.props.deletePalette(this.state.deletingId);
        this.closeDeleteDialog();
    }

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
                    <TransitionGroup className={classes.palettes}>
                        {palettes.map(palette => (
                            <CSSTransition key={palette.id} classNames='fade' timeout={500}>
                                <MiniPalette key={palette.id} id={palette.id} {...palette} handleClick={this.goToPalette} openDialog={this.openDeleteDialog} />
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </div>
                <Dialog open={this.state.openDeleteDialog} aria-labelledby='delete-dialog-title' onClose={this.closeDeleteDialog}>
                    <DialogTitle id='delete-dialog-title'>Delete This Palette?</DialogTitle>
                    <List>
                        <ListItem button onClick={this.deletePalette} >
                            <ListItemAvatar>
                                <Avatar style={{ backgroundColor: blue[100], color: blue[600] }}>
                                    <CheckIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary='Delete' />
                        </ListItem>
                        <ListItem button onClick={this.closeDeleteDialog} >
                            <ListItemAvatar>
                                <Avatar style={{ backgroundColor: red[100], color: red[600] }}>
                                    <CloseIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary='Close' />
                        </ListItem>
                    </List>
                </Dialog>
            </div>
        )
    }
}

export default withStyles(styles)(PaletteList);