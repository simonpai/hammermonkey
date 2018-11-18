import hammerhead from 'testcafe-hammerhead';

let serial = 0;

export default class Session extends hammerhead.Session {

  constructor(uploadRoot, options = {}) {
    super(uploadRoot);
    this.id = options.id || ('' + serial++);
    this.options = options;
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

  getProxyUrl(url) {
    return this.proxy.getProxyUrl(this, url);
  }

}
