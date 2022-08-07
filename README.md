# less-plugin-alias-resolver

A Less Plugin handling aliases.

## Usage

```js
const fs = require('fs');
const path = require('path');
const less = require('less');
const LessPluginAliasResolver = require('less-plugin-alias-resolver').default;

// Assume you have a file named style.less in ./src
const filename = path.resolve(__dirname, 'src/style.less');

less
  .render(fs.readFileSync(filename, 'utf-8'), {
    filename,
    plugins: [
      new LessPluginAliasResolver({
        prefix: '~',
        alias: {
          '@': path.resolve(__dirname, 'src'),
        },
      }),
    ],
  })
  .then(
    function (output) {
      console.log('output', output);
    },
    function (error) {
      console.error('error', error);
    },
  );
```

## Options

- `external`: default `~`, a conventional alias for `node_modules`.
- `alias`: an object indicates how to resolve aliases，includes `@import`, `url()` in `background-image` and `@font-face` and so on. Be careful, each value should be absolute path.
- `prefix`: a string which would join with key in `alias` object before matching and replacing.
