import hammerhead from 'testcafe-hammerhead';

export default class Session extends hammerhead.Session {

  constructor(uploadRoot, injectable) {
    super(uploadRoot);
    
    if (injectable) {
      Object.defineProperty(this, 'injectable', {
        value: injectable
      });
    }
  }

  _getPayloadScript() {
    return 'console.log(\'Hello World\')';
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
