const FastText = require('fasttext.js')

const ft = new FastText({
  loadModel: './model.bin',
});

var loaded = false;
var onLoadFn = [];

console.log('Loading model');
ft.load().then(done => {
  console.log('Model loaded');
  loaded = true;
  for (let fn of onLoadFn) {
    fn();
  }
});

exports.onLoad = function (fn) {
  onLoadFn.push(fn);
}


exports.predict = function (s) {
  console.log('predict:', s);
  if (!loaded) {
    throw 'Model not loaded'
  }

  return ft.predict(s)
    .then(labels => {
      console.log('labels:', labels);
      return labels;
    })
    .catch(error => {
      console.error('predict:', error);
    });
}
