if (!require('electron').remote.app.isPackaged) {
  require('@babel/register')();
}
require('./index.js');
