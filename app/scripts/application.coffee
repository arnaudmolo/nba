
requirejs.config
  paths:
    backbone: "framework/backbone"
    handlebars: "framework/handlebars"
    lodash: "framework/lodash"
    view: "views/View"
    goto: "framework/goto"
    d3: "framework/d3"
    jqeasing: "framework/jquery.easing.1.2"
    inview: "framework/inView"
  shim:
    backbone:
      deps: ["lodash"]
      exports: "Backbone"

require ['backbone', 'handlebars', './views/ApplicationView', './collections/TeamCollection', './routes/Router'], (Backbone, Handlebars, ApplicationView, TeamCollection, Router) ->
  window.temp = {}
  window.NBA = new TeamCollection()
  window.transition = true
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