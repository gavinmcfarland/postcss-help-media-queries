import postcss from 'postcss';

function capitalize(s) {
	return s[0].toUpperCase() + s.slice(1);
}

function createMediaQueryString(densitySize, breakpointSize, orientationName) {
	let densityString = ''
	let breakpointString = ''
	let orientationString = ''

	if (densitySize) {
		densityString = `(min-resolution: ${densitySize})`
	}

	if (breakpointSize) {
		breakpointString = ` and (min-width: ${breakpointSize})`
	}

	if (orientationName) {
		orientationString = ` and (orientation: ${orientationName})`
	}

	return densityString + breakpointString + orientationString
}

function createContentString(densitySize, densityName, breakpointSize, breakpointName, orientationName) {
	let densityString = ''
	let breakpointString = ''
	let orientationString = ''

	if (densitySize) {
		densityString = `Density: ${densitySize} (${densityName})`
	}

	if (breakpointSize) {
		breakpointString = `\\a Breakpoint: ${breakpointName} ${breakpointSize}`
	}

	if (orientationName) {
		orientationString = `\\a Orientation: ${capitalize(orientationName)}`
	}

	return densityString + breakpointString + orientationString
}



export default postcss.plugin('postcss-help-media-queries', opts => {

	// TODO: Merge user defined potions with defaults

	let defaults = {
		breakpoints: {
			none: '',
			extraSmall: '30em',
			small: '48em',
			medium: '60em',
			large: '80em',
			extraLarge: '100em'
		},
		densities: {
			'1x': '96dpi',
			'15x': '144dpi',
			'2x': '192dpi',
			'3x': '288dpi',
			'4x': '384dpi'
		},
		orientation: [
			'',
			'portrait',
			'landscape'
		]
	}

	opts = Object.assign(defaults, opts || {})

	let tooltipString = `
:root::after {
	position: fixed;
	font-family: -apple-system, BlinkMacSystemFont,'Arial', sans-serif;
	user-select: none;
	pointer-events: none;
	z-index: 999999;
	bottom: 16px;
	right: 16px;
	font-weight: bold;
	font-size: 11px;
	line-height: 1.8;
	box-sizing: border-box;
	padding: 16px 24px;
	border-radius: 4px;
	white-space: pre-wrap;
	text-transform: capitalize;
	box-shadow: 0 10px 30px rgba( #000, 0.2 );
	-webkit-backdrop-filter: blur(2px);
	backdrop-filter: blur(2px);
	background-color: rgba( #FFF, 0.95 );
    color: #212121;
}
`

	return (root) => {

		if (process.env.NODE_ENV === 'development') {

			root.prepend(postcss.parse(tooltipString))

			for (const [densityName, densitySize] of Object.entries(opts.densities)) {
				for (const [breakpointName, breakpointSize] of Object.entries(opts.breakpoints)) {
					for (const orientationName of opts.orientation) {

						let mediaQuery = createMediaQueryString(densitySize, breakpointSize, orientationName)
						let content = createContentString(densitySize, densityName, breakpointSize, breakpointName, orientationName)

						let mediaQueryString = `\
\n@media screen and ${mediaQuery} {
	:root::after {
		content: '${content}';
	}
}
`

						root.append(postcss.parse(mediaQueryString))

					}
				}
			}

		}

	};
});
