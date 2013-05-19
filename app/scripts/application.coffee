
requirejs.config
  paths:
    backbone: "framework/backbone"
    handlebars: "framework/handlebars"
    lodash: "framework/lodash"
    jquery: "framework/jquery.min"
    two: "vendor/two/build/two"
    view: "views/View"
    goto: "framework/goto"
  shim:
    backbone:
      deps: ["lodash", "jquery"]
      exports: "Backbone"
    goto:
      deps: ["jquery"]



require(['backbone', 'handlebars', './views/ApplicationView', './collections/TeamCollection', './routes/Router'], (Backbone, Handlebars, ApplicationView, TeamCollection, Router) ->
  window.temp = {}
  window.NBA = new TeamCollection()
  document.onscroll = (e)->
    e.preventDefault()
  $(document).on 'loaded', ->
    console.log 'loaded'
    window.router = new Router()
    window.temp.loaded = true
    Backbone.history.start(trigger: true)
  window.NBA.fetch
    success: ->
      window.mainView = new ApplicationView {el: $('#container')}
)