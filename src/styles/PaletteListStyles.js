import sizes from './sizes';
import bg from './bg.svg';

const styles = {
	'@global': {
		'.fade-exit': {
			opacity: 1
		},
		'.fade-exit-active': {
			opacity: 0,
			transition: 'opacity 500ms ease-out'
		}
	},
	root: {
		height: '100%',
		display: 'flex',
		alignItems: 'flex-start',
		justifyContent: 'center',
		// background by SVGBackgrounds.com
		backgroundColor: '#57068c',
		backgroundImage: `url(${bg})`,
		overflow: 'scroll',
		'& h1': {
			fontSize: '1.7rem'
		}
	},
	container: {
		width: '60%',
		display: 'flex',
		alignItems: 'flex-start',
		flexDirection: 'column',
		flexWrap: 'wrap',
		marginBottom: '50px',
		[sizes.down('md')]: {
			width: '80%'
		},
		[sizes.down('xs')]: {
			width: '95%'
		}
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
		height: '95%',
		display: 'grid',
		gridTemplateColumns: 'repeat(3,30%)',
		gridGap: '1.5rem',
		justifyContent: 'center',
		[sizes.down('md')]: {
			gridTemplateColumns: 'repeat(2,50%)'
		},
		[sizes.down('xs')]: {
			gridTemplateColumns: 'repeat(1,100%)'
		}
	},
	miniPalette: {
		minHeight: '17760px'
	}
};

export default styles;
