requirejs.config({
  paths: {
    backbone: "framework/backbone",
    handlebars: "framework/handlebars",
    lodash: "framework/lodash",
    view: "views/View",
    goto: "framework/goto",
    d3: "framework/d3",
    jqeasing: "framework/jquery.easing.1.2",
    inview: "framework/inView"
  },
  shim: {
    backbone: {
      deps: ["lodash"],
      exports: "Backbone"
    }
  }
});

require(['backbone', 'handlebars', './views/ApplicationView', './collections/TeamCollection', './routes/Router'], function(Backbone, Handlebars, ApplicationView, TeamCollection, Router) {
  window.temp = {};
  window.NBA = new TeamCollection();
  window.transition = true;
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
