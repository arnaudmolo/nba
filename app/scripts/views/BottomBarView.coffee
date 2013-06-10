define ['text!templates/BottomBar.handlebars', 'backbone', 'view'], (templateString, Backbone, View)->
    class BottomBarView extends View
        initialize: ->
            @el = document.createElement('a')
            @el.href = "#/stats/"+@model.get('sluggedName')
            @el.classList.add 'arvobold'
            @listenTo(@model, 'change', @render)
        render: ->
            @onRender()
            template = Handlebars.compile templateString
            @data = {}
            data = @model.attributes if typeof @model != 'undefined'
            @el.innerHTML = template data
            @onRendered()
            @el
        remove: ->
            @el.classList.remove('show')
            @el.addEventListener 'webkitTransitionEnd', (e)->
                if e.propertyName is 'width'
                    try
                        this.parentNode.removeChild this