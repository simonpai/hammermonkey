import RequestPipelineContext from 'testcafe-hammerhead/lib/request-pipeline/context';

Object.assign(RequestPipelineContext.prototype, {
  getInjectableScripts: function() {
    const scripts = this.session.injectable.scripts
      .concat(this.isIframe ? '/iframe-task.js' : '/task.js')
      .concat(this.session.injectable.userscripts);
    return this._getInjectable(scripts);
  },
  getInjectableStyles: function() {
    const styles = this.session.injectable.styles
      .concat(this.session.injectable.userstyles);
    return this._getInjectable(styles);
  }
});
