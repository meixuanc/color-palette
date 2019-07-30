import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';

export default class PaletteMetaForm extends Component {
    state = {
        stage: "form",
        newPaletteName: ''
    };

    componentDidMount() {
        ValidatorForm.addValidationRule('isPaletteNameUnique', (value) => (
            this.props.palettes.every(({ paletteName }) =>
                paletteName.toLowerCase() !== value.toLowerCase()
            )
        ));
    }

    handleClose = () => {
        this.setState({ stage: "form" });
        this.props.closeForm();
    };

    handleChange = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.value
        })
    }

    showEmojiPicker = () => {
        this.setState({ stage: "emoji" })
    }

    savePalette = (emoji) => {
        const newPalette = {paletteName: this.state.newPaletteName, emoji: emoji.native}
        this.props.savePalette(newPalette)
    }

    render() {
        return (
            <div>
                <Dialog open={this.state.stage === 'emoji'} onClose={this.handleClose}>
                    <DialogTitle id="form-dialog-title">Pick a Palette Emoji</DialogTitle>
                    <Picker title='Pick a Palette Emoji' onSelect={this.savePalette}/> 
                </Dialog>
                <Dialog
                    open={this.state.stage === 'form'}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
                    <ValidatorForm onSubmit={this.showEmojiPicker}>
                        <DialogContent>
                            <DialogContentText>
                                Choose a name for your palette. Make sur it's unique!
                            </DialogContentText>
                            <TextValidator
                                label='Palette Name'
                                name='newPaletteName'
                                fullWidth
                                margin='normal'
                                value={this.state.newPaletteName}
                                onChange={this.handleChange}
                                validators={['required', 'isPaletteNameUnique']}
                                errorMessages={["Palette Name Is Required", 'Palette Name Must Be Unique']}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button variant="contained" color='primary' type='submit'>Save Palette</Button>
                        </DialogActions>
                    </ValidatorForm>
                </Dialog>
            </div>
        );
    }
}
