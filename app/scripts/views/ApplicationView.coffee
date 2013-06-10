define ['text!templates/Application.handlebars', 'backbone', 'view', 'views/MapView', 'views/PlayoffsView', 'views/MenuView', '../framework/csv'], (templateString, Backbone, View, Map, Playoffs, Menu) ->
    class ApplicationView extends View
        bottomBarElement: document.getElementById("bottom-bar")
        bottomBarModels: []
        toggleMenu: (e)->
            @menu.toggleMenu()
        initialize: ->
            @el = document.getElementById 'main'
            @$el = $ @el
            window.mainView = @
            @menu = new Menu el: document.getElementById 'menu'
            @map = new Map()
            @map.createMap()
            @map.render()
            @playoffs = new Playoffs()

            t = @
            @$el.find('.open-menu a').on 'click', (e)->
                e.preventDefault()
                t.toggleMenu()

            window.onresize = ->
                t.map.update()
                t.playoffs.update()
            #     console.log window.location.hash
            #     window.router.navigate window.location.hash, trigger: true

            # $.ajax
            #     url: '/temp.json'
            #     dataType: 'json'
            #     success: (data)->
            #         _.each data, (team)->
            #             modelTeam = window.NBA.findWhere sluggedName: team.name
            #             console.log modelTeam.set('awards', team.awards)
            #             modelTeam.save()
                
        stats: (name)->
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
                        console.log 'ON ADTER BB'
                        if options.stats
                            setTimeout ->
                                $.scrollTo "#stats", 1000, axis: 'y'
                            , 1500
            else
                next.apply(t)
        awards: (name)->
            team = window.NBA.findWhere(sluggedName:name)
            team.awards()
            team
        players: (name, player)->
            team = window.NBA.findWhere(sluggedName:name)
            team.players(player)
            team 