define ['text!templates/Player.handlebars', 'view', '../framework/jquery.knob', '../framework/counter'], (templateString, View)->
    class PlayerView extends View
        initialize: ->
        render: ->
            @onRender()
            template = Handlebars.compile templateString
            data = {}
            data = @model if typeof @model != 'undefined'
            html = template data
            @el.innerHTML = html
            @$el.find('.dial input').knob
                angleOffset: 180
                width: 180
                readOnly: true
                thickness: 0.2
            @onRendered()
            @el
        onRendered: ->
            @$el.find('.counter').each (i, e)->
                $this = $(@)
                val = $this.html() or $this.val()
                val = parseFloat(val)
                $this.countTo
                    from: 0
                    to: val
                    speed: 1000
                    refreshInterval: 20
        changePlayer: (player)->
            @$el.find('.counter').each (i, e)->
                $this = $(@)
                val = $this.html() or $this.val()
                val = parseFloat(val)
                corres = player[$this.attr('data-prop')]
                $(@).countTo
                    to: corres
                    from: val
                    speed: 1000
                    refreshInterval: 20
            template = Handlebars.compile templateString
            html = $ template(player)
            insert = html.find('.infos').html()
            console.log @$el.find('.infos').html(insert)