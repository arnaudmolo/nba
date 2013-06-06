define ['text!templates/Application.handlebars', 'backbone', 'view', 'views/MapView', 'views/PlayoffsView', '../framework/csv'], (templateString, Backbone, View, Map, Playoffs) ->
    class ApplicationView extends View
        bottomBarElement: document.getElementById("bottom-bar")
        bottomBarModels: []
        initialize: ->
            window.mainView = @
            @map = new Map()
            @map.createMap()
            @map.render()
            @playoffs = new Playoffs()
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
                _.each @bottomBarModels, (model)->
                    model.bottomBarRemove()
                _.each window.NBA.where(state:state), (team)->
                    team.bottomBar()
                window.transition = false

            if options.zoom
                $.scrollTo "#map", 1000, ->
                    next.apply(t)
                    if options.stats
                        setTimeout ->
                            $.scrollTo "#stats", 1000
                        , 1000
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