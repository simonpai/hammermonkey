import hammerhead from 'testcafe-hammerhead';

let serial = 0;

export default class Session extends hammerhead.Session {

  constructor(uploadRoot) {
    super(uploadRoot);
    this.id = '' + serial++;
  }

  _getPayloadScript() {
    return '';
  }

  _getIframePayloadScript() {
    return '';
  }

  getAuthCredentials() {
    return undefined;
  }

  handleFileDownload() {}

  handlePageError(ctx, err) {
    console.error(err);
  }

}
