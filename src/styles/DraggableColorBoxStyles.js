import sizes from './sizes';
import chroma from 'chroma-js';

const styles = {
    draggableColorBox: {
        width: '20%',
        height: '25%',
        margin: '0 auto',
        display: 'inline-block',
        position: 'relative',
        textTransform: 'uppercase',
        marginBottom: '-5px',
        [sizes.down('lg')]: {
            width: '25%',
            height: '20%'
        }, 
        [sizes.down('md')]: {
            width: '50%',
            height: '10%'
        },
        [sizes.down('sm')]: {
            width: '100%',
            height: '5%'
        },
        "&:hover svg": {
            color: "white",
            transform: "scale(1.5)"
        }
    },
    boxContent: {
        position: "absolute",
        width: "100%",
        left: "0px",
        bottom: "0px",
        padding: "10px",
        // color: "rgba(0,0,0,0.5)",
        letterSpacing: "1px",
        fontSize: "12px",
        display: "flex",
        justifyContent: "space-between",
        color: props =>
            chroma(props.color).luminance() <= 0.1
            ? 'rgba(255,255,255,0.8)'
            : 'rgba(0.0.0.0.6)'
    },
    deleteIcon: {
        fontSize: "16px",
        color: "rgba(0,0,0,0.5)",
        transition: "all 0.3s ease-in-out"
    }
}

export default styles;