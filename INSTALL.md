# Installing PostCSS Help Media Queries

[PostCSS Help Media Queries] runs in all Node environments, with special instructions for:

| [Node](#node) | [PostCSS CLI](#postcss-cli) | [Webpack](#webpack) | [Create React App](#create-react-app) | [Gulp](#gulp) | [Grunt](#grunt) |
| --- | --- | --- | --- | --- | --- |

## Node

Add [PostCSS Help Media Queries] to your project:

```bash
npm install postcss-help-media-queries --save-dev
```

Use **PostCSS Help Media Queries** to process your CSS:

```js
const postcssHelpMediaQueries = require('postcss-help-media-queries');

postcssHelpMediaQueries.process(YOUR_CSS /*, processOptions, pluginOptions */);
```

Or use it as a [PostCSS] plugin:

```js
const postcss = require('postcss');
const postcssHelpMediaQueries = require('postcss-help-media-queries');

postcss([
  postcssHelpMediaQueries(/* pluginOptions */)
]).process(YOUR_CSS /*, processOptions */);
```

## PostCSS CLI

Add [PostCSS CLI] to your project:

```bash
npm install postcss-cli --save-dev
```

Use **PostCSS Help Media Queries** in your `postcss.config.js` configuration file:

```js
const postcssHelpMediaQueries = require('postcss-help-media-queries');

module.exports = {
  plugins: [
    postcssHelpMediaQueries(/* pluginOptions */)
  ]
}
```

## Webpack

Add [PostCSS Loader] to your project:

```bash
npm install postcss-loader --save-dev
```

Use **PostCSS Help Media Queries** in your Webpack configuration:

```js
const postcssHelpMediaQueries = require('postcss-help-media-queries');

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          { loader: 'postcss-loader', options: {
            ident: 'postcss',
            plugins: () => [
              postcssHelpMediaQueries(/* pluginOptions */)
            ]
          } }
        ]
      }
    ]
  }
}
```

## Create React App

Add [React App Rewired] and [React App Rewire PostCSS] to your project:

```bash
npm install react-app-rewired react-app-rewire-postcss --save-dev
```

Use **React App Rewire PostCSS** and **PostCSS Help Media Queries** in your
`config-overrides.js` file:

```js
const reactAppRewirePostcss = require('react-app-rewire-postcss');
const postcssHelpMediaQueries = require('postcss-help-media-queries');

module.exports = config => reactAppRewirePostcss(config, {
  plugins: () => [
    postcssHelpMediaQueries(/* pluginOptions */)
  ]
});
```

## Gulp

Add [Gulp PostCSS] to your project:

```bash
npm install gulp-postcss --save-dev
```

Use **PostCSS Help Media Queries** in your Gulpfile:

```js
const postcss = require('gulp-postcss');
const postcssHelpMediaQueries = require('postcss-help-media-queries');

gulp.task('css', () => gulp.src('./src/*.css').pipe(
  postcss([
    postcssHelpMediaQueries(/* pluginOptions */)
  ])
).pipe(
  gulp.dest('.')
));
```

## Grunt

Add [Grunt PostCSS] to your project:

```bash
npm install grunt-postcss --save-dev
```

Use **PostCSS Help Media Queries** in your Gruntfile:

```js
const postcssHelpMediaQueries = require('postcss-help-media-queries');

grunt.loadNpmTasks('grunt-postcss');

grunt.initConfig({
  postcss: {
    options: {
      use: [
       postcssHelpMediaQueries(/* pluginOptions */)
      ]
    },
    dist: {
      src: '*.css'
    }
  }
});
```

[Gulp PostCSS]: https://github.com/postcss/gulp-postcss
[Grunt PostCSS]: https://github.com/nDmitry/grunt-postcss
[PostCSS]: https://github.com/postcss/postcss
[PostCSS CLI]: https://github.com/postcss/postcss-cli
[PostCSS Loader]: https://github.com/postcss/postcss-loader
[PostCSS Help Media Queries]: https://github.com/limitlessloop/postcss-help-media-queries
[React App Rewire PostCSS]: https://github.com/csstools/react-app-rewire-postcss
[React App Rewired]: https://github.com/timarney/react-app-rewired
