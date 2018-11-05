function toSimpleValue(value) {
  if (Array.isArray(value)) {
    return toSimpleArray(value);
  }
  if (typeof value === 'object') {
    return toSimpleObject(value);
  }
  return value;
}

function toSimpleObject(obj) {
  return Object.keys(obj).reduce(function(acc, key) {
    acc[key] = toSimpleValue(obj[key]);
    return acc;
  }, {});
}

function toSimpleArray(array) {
  return array.map(toSimpleValue);
}

function post(path, body) {
  try {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://__host__/api/console' + path);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(body));
  } catch(e) {} // eslint-disable-line no-empty
}

window._push_handlers_['console.eval'] = function(expr) {
  try {
    post('/eval', {
      value: toSimpleValue(Function('"use strict";return (' + expr + ')')())
    });
  } catch(err) {
    post('/eval-error', {
      value: '' + err
    });
  }
}

window.addEventListener('error', function(event) {
  var body = {
    message: event.message,
    filename: event.filename,
    lineno: event.lineno,
    colno: event.colno
  };
  if (event.error) {
    body.error = '' + event.error;
    if (event.error.stack) {
      body.stack = event.error.stack;
    }
  }
  post('/error', body);
});

var console = window.console;
var _log = console.log;
console.log = function() {
  _log.apply(this, arguments);
  post('/console', {
    type: 'log',
    args: toSimpleArray(Array.prototype.slice.call(arguments))
  });
};

// throw new Error('test');