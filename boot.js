(function (app) {
  document.addEventListener('DOMContentLoaded', function () {
    ng.platform.browser.bootstrap(app.Project);
  });
})(window.app || (window.app = {}));