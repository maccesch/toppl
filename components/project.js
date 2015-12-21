(function (app) {

  var TogglClient = require('toggl-api');
  var toggl = null;

  var _ = require('underscore');

  app.Project = ng.core

    .Component({
      selector: 'project',
      templateUrl: 'components/project.html'
    })

    .Class({
      constructor: function () {
        this.togglApiKey = '';
        this.workspaceId = null;
        this.hoursPerWeek = null;
        this.projectId = null;
        this.projectName = '';
        this.startDate = null;

        this.projects = [];

        this.initTogglDebounced = _.debounce(_.bind(this.initToggl, this), 200);

      },

      setTogglApiKey: function (key) {
        this.togglApiKey = key;
        this.initTogglDebounced();
      },

      initToggl: function () {
        this.workspaceId = null;
        try {
          toggl = new TogglClient(this.togglApiKey);
          toggl.getWorkspaces(_.bind(function (err, workspaces) {
            if (!err) {
              // TODO : error reporting
              this.workspaceId = workspaces[0].id;
              this.refreshProjects();
            }
          }, this));
        } catch (e) {
          toggl = null;
        }
      },

      refreshProjects: function () {
        this.projects = [];
        if (toggl && this.workspaceId) {
          toggl.getWorkspaceProjects(this.workspaceId, _.bind(function(err, projects) {
            if (!err) {
              // TODO : error reporting
              this.projects = projects;
            }
          }, this));
        }
      }

    });

})(window.app || (window.app = {}));