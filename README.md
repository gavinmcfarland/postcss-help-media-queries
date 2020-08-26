# PostCSS Help Media Queries [<img src="https://postcss.github.io/postcss/logo.svg" alt="PostCSS" width="90" height="90" align="right">][postcss]

[![NPM Version][npm-img]][npm-url]
[![Build Status][cli-img]][cli-url]
[![Support Chat][git-img]][git-url]

[PostCSS Help Media Queries] lets you ... in CSS.

At the following at-rule at the top of your CSS to include the help-media-queries tooltip.

```pcss
@help-media-queries;
```

## Usage

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

**PostCSS Help Media Queries** runs in all Node environments, with special instructions for:

| [Node](INSTALL.md#node) | [PostCSS CLI](INSTALL.md#postcss-cli) | [Webpack](INSTALL.md#webpack) | [Create React App](INSTALL.md#create-react-app) | [Gulp](INSTALL.md#gulp) | [Grunt](INSTALL.md#grunt) |
| --- | --- | --- | --- | --- | --- |

## Options

...

[cli-img]: https://img.shields.io/travis/limitlessloop/postcss-help-media-queries/master.svg
[cli-url]: https://travis-ci.org/limitlessloop/postcss-help-media-queries
[git-img]: https://img.shields.io/badge/support-chat-blue.svg
[git-url]: https://gitter.im/postcss/postcss
[npm-img]: https://img.shields.io/npm/v/postcss-help-media-queries.svg
[npm-url]: https://www.npmjs.com/package/postcss-help-media-queries

[PostCSS]: https://github.com/postcss/postcss
[PostCSS Help Media Queries]: https://github.com/limitlessloop/postcss-help-media-queries
