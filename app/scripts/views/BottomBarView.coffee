define ['text!templates/BottomBar.handlebars', 'backbone', 'view', 'two'], (templateString, Backbone, View)->
    class BottomBarView extends View
        initialize: ->
            @el = document.createElement('a')
            @el.href = "#/stats/"+@model.get('name')
            @listenTo(@model, 'change', @render)
        render: ->
            @onRender()
            template = Handlebars.compile templateString
            @data = {}
            data = @model.attributes if typeof @model != 'undefined'
            @el.innerHTML = template data
            @onRendered()
            @el