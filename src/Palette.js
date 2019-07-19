import React, { Component } from 'react'
import ColorBox from './ColorBox'
import './Palette.css'

export default class Palette extends Component {
    render() {
        const colorBoxes = this.props.colors.map(color => (
            <ColorBox {...color} />
        ));
        return (
            <div className="Palette">
                {/* Navbar */}
                <div className="Palette-colors">
                    {colorBoxes}
                </div>
                {/* footer */}
            </div>
        )
    }
}
