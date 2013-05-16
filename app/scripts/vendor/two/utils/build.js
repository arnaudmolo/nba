// https://npmjs.org/package/node-minify

var compressor = require('node-minify');

var files = [
  '../license.txt',
  '../src/startrequire.js',
  '../third-party/requestAnimationFrame.js',
  '../src/two.js',
  '../src/vector.js',
  '../src/matrix.js',
  '../src/renderer/svg.js',
  '../src/shape.js',
  '../src/group.js',
  '../src/polygon.js',
  '../src/endrequire.js'
];

// Concatenated
new compressor.minify({
  type: 'no-compress',
  fileIn: files,
  fileOut: '../build/two.js',
  callback: function(e) {
    if (!e) {
      console.log('concatenation complete');
    } else {
      console.log('unable to concatenate', e);
    }
  }
});

// Minified
new compressor.minify({
  type: 'gcc',
  fileIn: files,
  fileOut: '../build/two.min.js',
  callback: function(e){
    if (!e) {
      console.log('minified complete');
    } else {
      console.log('unable to minify', e);
    }
  }
});