import React from 'react';
import Palette from './Palette'
import seedPalettes from './seedPalettes'
import { generatePalette } from './colorShadesHelper'

function App() {
    console.log(generatePalette(seedPalettes[3]));
    return (
        <div>
            <Palette {...seedPalettes[3]} />
        </div>
    );
}

export default App;
