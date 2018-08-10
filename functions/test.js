

//
// Unit test
//

const model = require('./model.js')

function test_model(s, expected_label) {
  console.log('test:', s);
  model.predict(s).then(labels => {
    assertEquals(expected_label, labels[0].label);
  })
  .catch(error => {
    console.error(error);
  });
}

model.onLoad(function () {
  test_model('This is not a test', 'EN');
})


//
// Integration test
//
const index = require('./index.js')

function test_index(s, expected_label) {
  const req = { query: { q: s }};
  const res = { send: function (labels) {
      assertEquals(expected_label, labels[0].label);
    }
  };
  index.model(req, res);
}

model.onLoad(function () {
  test_index('Haga lo que yo diga, no lo que yo haga.', 'ES');
})

// TODO: proper tests with timeouts


function assertEquals(expected, actual) {
  if (actual == expected) {
    console.error(actual, '==', expected);
  } else {
    console.error(actual, '!=', expected, 'ERROR');
  }
}
