define(['text!templates/Application.handlebars', 'backbone', 'two'], (templateString, Backbone, Two) ->
    class ApplicationView extends Backbone.View
        initialize: ->
        # Called before rendering
        onRender: ->

        # Called after rendering
        onRendered: ->

        # Called before closing view
        onClose: ->
            #call close on child views

        # Called just before close returns
        onClosed: ->
            #unbind from any events on models/collections

        close: (removeElement=false) ->
            #Call onClose if present
            @onClose() if @onClose
            #Undelegate all events from events array
            @undelegateEvents()
            #remove data and events from main element
            @$el.removeData().unbind()
            #empty the element
            @$el.empty()
            #remove the element completely from dom. Defaults to not removing
            @remove() if removeElement
            #call onClosed if present
            @onClosed() if @onClosed

        render: ->
            @onRender()
            template = Handlebars.compile templateString
            data = {}
            data = @model.attributes if typeof @model != 'undefined'
            $(@el).empty().append(template(data))
            @onRendered()
)
