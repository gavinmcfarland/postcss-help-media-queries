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
		densityString = `Density: ~${densitySize} (${densityName.toUpperCase()})`
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
			'1.5x': '144dpi',
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

	// Probably a nicer way to do this
	opts = opts || {}

	defaults.breakpoints = Object.assign(defaults.breakpoints, opts.breakpoints)

	opts = defaults

	let tooltipString = `
:root::after {
	position: fixed;
	font-family: sans-serif;
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
	border-radius: 16px;
	white-space: pre-wrap;
	text-transform: capitalize;
	box-shadow: 0 10px 30px rgba(0,0,0, 0.2 );
	-webkit-backdrop-filter: saturate(180%) blur(20px);
	backdrop-filter: saturate(180%) blur(20px);
	background-color: rgba(29, 29, 31, 0.72);
	color: #fff;
}

@media (prefers-color-scheme: dark) {
	:root::after {
		background-color: rgba(255,255,255,0.72);
		color: #212121;
	}
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
