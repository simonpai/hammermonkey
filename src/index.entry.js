if (require('electron').app.isPackaged) {
  require('../out/index.js');
} else {
  require('./index.js');
}
