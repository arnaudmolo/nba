requirejs.config({
  paths: {
    backbone: "framework/backbone",
    handlebars: "framework/handlebars",
    lodash: "framework/lodash",
    jquery: "framework/jquery.min",
    two: "vendor/two/build/two",
    view: "views/View",
    goto: "framework/goto"
  },
  shim: {
    backbone: {
      deps: ["lodash", "jquery"],
      exports: "Backbone"
    },
    goto: {
      deps: ["jquery"]
    }
  }
});

require(['backbone', 'handlebars', './views/ApplicationView', './collections/TeamCollection', './routes/Router'], function(Backbone, Handlebars, ApplicationView, TeamCollection, Router) {
  window.temp = {};
  window.NBA = new TeamCollection();
  document.onscroll = function(e) {
    return e.preventDefault();
  };
  $(document).on('loaded', function() {
    console.log('loaded');
    window.router = new Router();
    window.temp.loaded = true;
    return Backbone.history.start({
      trigger: true
    });
  });
  return window.NBA.fetch({
    success: function() {
      return window.mainView = new ApplicationView({
        el: $('#container')
      });
    }
  });
});
