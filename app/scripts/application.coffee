
requirejs.config
  paths:
    backbone: "framework/backbone"
    handlebars: "framework/handlebars"
    lodash: "framework/lodash"
    jquery: "framework/jquery.min"
    two: "vendor/two/build/two"
    view: "views/View"
  shim:
    backbone:
      deps: ["lodash", "jquery"]
      exports: "Backbone"



require(['backbone', 'handlebars', './views/ApplicationView', './collections/TeamCollection', './routes/Router'], (Backbone, Handlebars, ApplicationView, TeamCollection, Router) ->
  window.router = new Router()
  Backbone.history.start()
  window.NBA = new TeamCollection()
  window.NBA.fetch()
  window.mainView = new ApplicationView {el: $('#container')}
  window.mainView.render()
)