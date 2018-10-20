window.addEventListener('error', function(event) {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'http://__host__/error');
  xhr.send(event.message);
});

// throw new Error('test');