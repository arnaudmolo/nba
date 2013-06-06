define ['text!templates/Stats.handlebars', 'backbone', 'view', './PlayerView', './DataView'], (templateString, Backbone, View, PlayerView, DataView)->
    Handlebars.registerHelper "debug", (optionalValue) ->
        console.log this
        if optionalValue
            console.log optionalValue
    class StatsView extends View
        events:
            'click .changePlayer a.best-ever': 'bestEver'
            'click .changePlayer a.best-year': 'bestYear'
        initialize: ->
            @el = document.createElement('section')
            @$el = $ @el
            @listenTo @model, 'change', @render
        render: ->
            @onRender()
            template = Handlebars.compile templateString
            data = {}
            data = @model.attributes if typeof @model != 'undefined'
            @el.innerHTML = template data
            @toHide = @$el.find('#awards, #data, #players')
            @onRendered()
            return @el
        menuNav: (index)->
            nav = @$el.find('>nav.navigation a')
            nav.removeClass('active')
            nav[index].classList.add('active')
        data: ->
            if @dataView is undefined
                @dataView = new DataView model: @model, el: $("#data")[0]
            @toHide.addClass('hidden').addClass('transition')
            @$el.find('#data').removeClass('hidden').find('.center.navigation a')
            @menuNav(0)
        awards: ->
            @toHide.addClass 'hidden'
            show = @$el.find('#awards').removeClass('hidden')
            @menuNav(1)
            show.on 'webkitTransitionEnd', ->
                this.classList.remove 'transition'
                $(this).unbind 'webkitTransitionEnd'
        players: ->
            if @playerView is undefined
                @playerView = new PlayerView model: @model.get('players')[0], el: @$el.find('.player')[0]
            @$el.find('.changePlayer a.best-ever').addClass('active')
            @$el.find('.changePlayer a.best-year').removeClass('active')
            @playerView.render()
            @toHide.addClass('hidden').addClass('transition')
            @$el.find('#players').removeClass('hidden')
            @menuNav(2)
        bestEver: (e)->
            e.preventDefault()
            @$el.find('.changePlayer a.best-ever').addClass('active')
            @$el.find('.changePlayer a.best-year').removeClass('active')
            @playerView.changePlayer(@model.get('players')[0])
        bestYear: (e)->
            e.preventDefault()
            @$el.find('.changePlayer a.best-year').addClass('active')
            @$el.find('.changePlayer a.best-ever').removeClass('active')
            @playerView.changePlayer(@model.get('players')[1])