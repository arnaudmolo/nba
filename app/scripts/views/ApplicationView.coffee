define(['text!templates/Application.handlebars', 'backbone', 'two', 'view', 'views/MapView'], (templateString, Backbone, Two, View, Map) ->
    class ApplicationView extends View
        initialize: ->
            @map = new Map()
)
