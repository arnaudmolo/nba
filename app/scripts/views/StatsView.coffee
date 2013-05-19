define ['text!templates/Stats.handlebars', 'backbone', 'view'], (templateString, Backbone, View)->
    Handlebars.registerHelper "debug", (optionalValue) ->
        console.log this
        if optionalValue
            console.log optionalValue

    class StatsView extends View
        initialize: ->
            @el = document.createElement('section')
            @listenTo @model, 'change', @render
        render: ->
            @onRender()
            template = Handlebars.compile templateString
            data = {}
            data = @model.attributes if typeof @model != 'undefined'
            @el.innerHTML = template data
            @onRendered()
            return @el