window._push_handlers_ = window._push_handlers_ || {};

var MODES = {
  LONG_POLLING: 0,
  POLLING_FAST: 1,
  POLLING_SLOW: 2
};

var shortInterval = 150;
var longInterval = 1500;
var requestTime = Date.now();
var mode = MODES.POLLING_SLOW;

function handleResponse(xhr) {
  try {
    var messages = JSON.parse(xhr.responseText);
    for (var i = 0, len = messages.length, msg, handler; i < len && (msg = messages[i]); i++) {
      handler = window._push_handlers_[msg[0]];
      if (handler) {
        handler.apply(undefined, msg.slice(1));
      } else {
        // buffer
        // TODO
      }
    }
    next();
  } catch(err) {
    console.error(err); // eslint-disable-line no-console
  }
}

function handleTimeout() {
  next();
}

function request(method) {
  try {
    requestTime = Date.now();
    var xhr = new XMLHttpRequest();
    xhr.addEventListener('load', handleResponse.bind(undefined, xhr));
    xhr.addEventListener('timeout', handleTimeout);
    xhr.addEventListener('error', console.error.bind(console)); // eslint-disable-line no-console
    xhr.open(method, 'http://__host__/api/push');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
  } catch(err) {
    console.error(err); // eslint-disable-line no-console
  }
}

function get() {
  request('GET');
}

function next() {
  var now = Date.now();
  switch (mode) {
    case MODES.LONG_POLLING:
      request('POST');
      break;
    case MODES.POLLING_FAST:
    case MODES.POLLING_SLOW:
      var waitTime = (mode === MODES.POLLING_FAST ? shortInterval : longInterval) - now + requestTime;
      if (waitTime > 0) {
        setTimeout(get, waitTime);
      } else {
        get();
      }
      break;
  }
}

// kickoff
setTimeout(next, 0);

// switch to long polling when we don't care about connection limit
document.addEventListener('DOMContentLoaded', function() {
  mode = MODES.LONG_POLLING;
});

