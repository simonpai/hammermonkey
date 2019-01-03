# Overview
I'm working on this electron app that serves as a web debugging tool based on [TestCafe's](https://devexpress.github.io/testcafe/) core: [hammerhead](https://github.com/DevExpress/testcafe-hammerhead). This tool should be able to:

* Serve as a userscript/userstyle manager
* Serve as a middleware manager that intercepts HTTP requests
* Capture browser console output and execute scripts
* Apply to any browser that TestCafe supports, which includes in-app web views (Facebook, LINE, etc) and remote ones on browserstack

# How it works
TestCafe hammerhead works as a [URL-rewriting proxy](https://dzone.com/articles/testcafe-e2e-testing-tool) that rewrites every resources (html, css, js) to keep them under a domain in your control and provide hooks for injection. This method applies to almost every browser and immediately opens a door to write userscripts and intercept HTTP requests in every browser. With such technology we can now easily debug in previously untouchable browsers.

# Current state
We are now at [0.2.0](https://github.com/simonpai/hammermonkey/issues/6). In this version, 
* We have the most basic userscript management function
* We can pipe capture console message

# Road map
## 0.3
* A page/frame model to distinguish browser windows in each session
* A server push mechanism
* Console eval function

## 0.4
* Request middleware maganement
