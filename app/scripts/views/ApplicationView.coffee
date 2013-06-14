define ['text!templates/Application.handlebars', 'backbone', 'view', 'views/MapView', 'views/PlayoffsView', 'views/MenuView'], (templateString, Backbone, View, Map, Playoffs, Menu) ->
    class ApplicationView extends View
        bottomBarElement: document.getElementById("bottom-bar")
        bottomBarModels: []
        toggleMenu: (e)->
            @menu.toggleMenu()
        initialize: ->
            @$body = $('body');
            @el = document.getElementById 'main'
            @$el = $ @el
            window.mainView = @
            @menu = new Menu el: document.getElementById 'menu'
            @map = new Map()
            @map.createMap()
            @map.render()
            @playoffs = new Playoffs()
            @arrows = document.getElementById('arrows')
            @arrowsEl = arrows.getElementsByTagName('a')
            t = @
                
            @arrowsEl[0].addEventListener 'click', (e)->
                t.prev(this, e)
            @arrowsEl[1].addEventListener 'click', (e)->
                console.log 'this', this, 'e', e
                t.next(this, e)
                
            @$el.find('.open-menu a').on 'click', (e)->
                e.preventDefault()
                t.toggleMenu()
            @$el.find('.detailsmenu a').on 'click', (e)->
                window.transition = true
            @$sections = @$el.find('>section')
            # testtimeout = ->
            #     x = x + 1
            #     alert " value of x is - " + x
            #     timer = setTimeout("testtimeout()", 3000)
            # stoper = ->
            #     clearTimeout timer
            # x = 0
            # timer = undefined
            window.onresize = ->
                t.map.update()
                t.menu.update()
        moreVisible: ->
            element = null
            temp = -10
            @$sections.each (i, e)->
                divTop = $(e).offset().top
                scrollTop = $(document).scrollTop()
                windowHeight = $(window).height()
                divHeight = $(e).height()
                divTopInWindow = Math.max(0, divTop - scrollTop)
                divBottomInWindow = Math.min(windowHeight, divTop + divHeight - scrollTop)
                percentVisible = (divBottomInWindow - divTopInWindow) / windowHeight
                if percentVisible > temp
                    temp = percentVisible
                    element = e
            element
        next: (el, ev)->
            element = @moreVisible()
            next = $(element).next 'section'
            if next[0] is undefined
                next = element
            if next.attr('data-url') is ""
                next = next.next 'section'
            el.setAttribute('href', '#/'+next.attr('data-url'))
            $.scrollTo next, 500
        prev: (el, ev)->
            element = @moreVisible()
            prev = $(element).prev('section')
            if prev[0] is undefined
                prev = element
            if  prev.attr('data-url') is ""
                prev = prev.prev 'section'
            console.log prev
            el.setAttribute('href', '#/'+prev.attr('data-url'))
            $.scrollTo prev, 500
        recenter: (el, ev)->
            element = @moreVisible()
            el.setAttribute('href', '#/'+element.getAttribute('data-url'))
            $.scrollTo $(element), 500
        stats: (name)->
            @menu.$el.find('.players-hide').addClass('hidden')
            @menu.$el.find('.stats-hide').removeClass('hidden')
            window.NBA.findWhere(sluggedName:name).stats()
        loaded: ->
            $(document).trigger('loaded')
            @mainFrame = document.getElementById('home')
            @mainFrame.classList.remove('loading')
        goTo: (stateName, options = {zoom:true})->
            t = @
            next = ->
                @map.createMap()
                state = null
                paths = d3.selectAll '#states path'
                paths.each (e)->
                    if e.properties.name is stateName
                        state = e.properties.name
                        window.mainView.map.zoom(e)
                t.bottomBarElement.classList.add('hidden')
                _.each @bottomBarModels, (model)->
                    model.bottomBarRemove()
                _.each window.NBA.where(state:state), (team)->
                    t.bottomBarElement.classList.remove('hidden')
                    team.bottomBar()
                window.transition = false
            if options.zoom
                $.scrollTo "#teams", 1000,
                    axis: 'y'
                    onAfter: ->
                        next.apply(t)
                        if options.stats
                            setTimeout ->
                                $.scrollTo "#stats", 1000, axis: 'y'
                            , 1500
            else
                $.scrollTo "#stats", 1000,
                    axis: 'y'
                    onAfter: ->
                        next.apply(t)
                        
        awards: (name)->
            team = window.NBA.findWhere(sluggedName:name)
            team.awards()
            team
        players: (name, player)->
            @menu.$el.find('.stats-hide').addClass('hidden')
            @menu.$el.find('.players-hide').removeClass('hidden')
            team = window.NBA.findWhere(sluggedName:name)
            team.players(player)
            team
        compare: (name)->
            team = window.NBA.findWhere(sluggedName:name)
            team.compare()
            team