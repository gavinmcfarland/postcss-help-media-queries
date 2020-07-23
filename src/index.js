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

	opts = opts || defaults


	return (root) => {


		for (const [densityName, densitySize] of Object.entries(opts.densities)) {
			for (const [breakpointName, breakpointSize] of Object.entries(opts.breakpoints)) {
				for (const orientationName of opts.orientation) {

					let mediaQuery = createMediaQueryString(densitySize, breakpointSize, orientationName)
					let content = createContentString(densitySize, densityName, breakpointSize, breakpointName, orientationName)

					let mediaQueryString = `\
\n@media ${mediaQuery} {
	:root::after {
		content: '${content}';
	}
}
`

					root.append(postcss.parse(mediaQueryString))

				}
			}
		}

	};
});
