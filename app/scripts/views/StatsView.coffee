define ['text!templates/Stats.handlebars', 'backbone', 'view', './PlayerView', './DataView', './CompareView'], (templateString, Backbone, View, PlayerView, DataView, CompareView)->
    Handlebars.registerHelper "debug", (optionalValue) ->
        console.log 'debug', this
        console.log optionalValue
        if optionalValue
            console.log optionalValue
    Handlebars.registerHelper "ifCond", (v1, operator, v2, options) ->
        switch operator
            when "=="
                return (if (v1 is v2) then options.fn(this) else options.inverse(this))
            when "==="
                return (if (v1 is v2) then options.fn(this) else options.inverse(this))
            when "<"
                return (if (v1 < v2) then options.fn(this) else options.inverse(this))
            when "<="
                return (if (v1 <= v2) then options.fn(this) else options.inverse(this))
            when ">"
                return (if (v1 > v2) then options.fn(this) else options.inverse(this))
            when ">="
                return (if (v1 >= v2) then options.fn(this) else options.inverse(this))
            else
                return options.inverse(this)
    class StatsView extends View
        events:
            'click .changePlayer a.best-ever': 'bestEver'
            'click .changePlayer a.best-year': 'bestYear'
        initialize: ->
            @el = document.createElement('section')
            @$el = $ @el
            @listenTo @model, 'change', @render
            @parent = $("#stats-style")
            @parent.addClass('show')
        render: ->
            @onRender()
            template = Handlebars.compile templateString
            data = {}
            data = @model.attributes if typeof @model != 'undefined'
            @el.innerHTML = template data
            @toHide = @$el.find '#awards, #data, #players, #compare'
            @onRendered()
            return @el
        onRendered: ->
            @parent.addClass('rendered')
        menuNav: (index)->
            nav = @$el.find('>nav.navigation a')
            nav.removeClass('active')
            nav[index].classList.add('active')
        data: ->
            if @dataView is undefined
                @dataView = new DataView model: @model, el: $("#data")[0]
            show = @$el.find('#data')
            @toHide.not(show).addClass('hidden')
            show.removeClass('hidden')
            @menuNav(0)
            @parent.attr('data-url', 'stats/'+@model.get('sluggedName'))
        awards: ->
            show = @$el.find('#awards')
            @toHide.not(show).addClass 'hidden'
            show.removeClass('hidden')
            @menuNav(1)
            @parent.attr('data-url', 'awards/'+@model.get('sluggedName'))
        players: ->
            if @playerView is undefined
                @playerView = new PlayerView model: @model.get('players')[0], el: @$el.find('.player')[0]
            @$el.find('.changePlayer a.best-ever').addClass('active')
            @$el.find('.changePlayer a.best-year').removeClass('active')
            @playerView.render()
            show = @$el.find('#players')
            @toHide.not(show).addClass('hidden')
            show.removeClass('hidden')
            @menuNav(2)
            @parent.attr('data-url', 'players/'+@model.get('sluggedName'))
        compare: ->
            compare = $(document.getElementById('compare'))
            if @compareView is undefined
                @compareView = new CompareView model: @model, el: compare
            @toHide.not(compare).addClass('hidden')
            compare.removeClass('hidden')
            @menuNav(3)
            @compareView.render()
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