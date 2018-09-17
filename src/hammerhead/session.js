import hammerhead from 'testcafe-hammerhead';

export default class Session extends hammerhead.Session {

  constructor(uploadRoot) {
    super(uploadRoot);
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
