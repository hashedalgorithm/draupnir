const postcss = require('rollup-plugin-postcss');

module.exports = {
  rollup(config, options) {
    config.output.format = 'cjs';
    config.plugins.push(
      postcss({
        config: {
          path: './postcss.config.js',
        },
        extensions: ['.css'],
        minimize: true,
        inject: {
          insertAt: 'top',
        },
      })
    );

    return config;
  },
};
