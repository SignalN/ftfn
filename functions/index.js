const functions = require('firebase-functions');
const model = require("./model.js");

exports.model = functions.https.onRequest((request, response) => {

  console.log('request.path:', request.path, 'request.query:', request.query);

  return model.predict(request.query.q).then(labels => {
    response.send(labels);
    return labels;
  });

});

process.on('unhandledRejection', (reason, p) => {
    console.error('Unhandled Rejection at: Promise', p, 'reason:', reason, reason.stack);
});
