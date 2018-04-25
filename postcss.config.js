const path = require('path');
const postcss = require('postcss');
const autoprefixer = require('autoprefixer');
const sprites = require('postcss-sprites');
const precss = require('precss');
const autoMath = require('postcss-automath');

const updateRule = require('postcss-sprites/lib/core').updateRule;

module.exports = {
  plugins: [
    autoprefixer,
    precss,
    autoMath,
    sprites({
      retina: true,
      verbose: false,
      // stylesheetPath: './src/components',
      stylesheetPath: './dist/style.css',
      spritePath: './public',
      // basePath: './',
      relativeTo: true,
      filterBy(image) {
        if (-1 === image.url.indexOf('/images/sprites')) {
          return Promise.reject();
        }
        return Promise.resolve();
      },
      hooks: {
        onUpdateRule: function(rule, token, image) {
          // Use built-in logic for background-image & background-position
          updateRule(rule, token, image);

          ['width', 'height'].forEach(function(prop) {
            var value = image.coords[prop];
            if (image.retina) {
              value /= image.ratio;
            }
            rule.insertAfter(
              rule.last,
              postcss.decl({
                prop: prop,
                value: value + 'px'
              })
            );
          });
        }
      },
      groupBy(image) {
        const styleFilePath = image.styleFilePath;
        const endIndex = styleFilePath.indexOf('.');
        const startIndex = styleFilePath.lastIndexOf('\\') + 1;
        let groupName = styleFilePath.substring(startIndex, endIndex);
        return Promise.resolve(groupName);
      }
    })
  ]
};
