import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Palette from './Palette'
import seedPalettes from './seedPalettes'
import { generatePalette } from './colorShadesHelper'
import PaletteList from './PaletteList';

export default class App extends Component {
    findPalette = (id) => {
        return seedPalettes.find((palette) => {
            return palette.id === id;
        });
    }

    render() {
        return (
            <Switch>
                <Route exact path='/' render={(routeProps) => <PaletteList palettes={seedPalettes} {...routeProps} />} />
                <Route exact path='/palette/:id'
                    render={routeProps => (
                        <Palette palette={generatePalette(this.findPalette(routeProps.match.params.id))} />
                    )} />
                <Route exact path='/palette/:paletteId/:colorId' />
            </Switch>
            )
        }
}