define ['text!templates/Application.handlebars', 'backbone', 'two', 'view', 'views/MapView'], (templateString, Backbone, Two, View, Map) ->
    class ApplicationView extends View
        bottomBarElement: document.getElementById("bottom-bar")
        initialize: ->
            
            window.mainView = @
            @map = new Map()
            @map.createMap()
            @map.render()
        stats: (name)->
            
            window.NBA.findWhere(name:name).stats()

        resetMap: ->
            
            @map.svgMap.DOMElement.classList.remove 'fat'
            @map.svgMap.DOMElement.style.webkitTransformOrigin = "50% 50%"
            
            if window.temp.zoomed
                window.temp.zoomed.DOMElement.classList.remove "zoomed"
            
            @
        loaded: ->
            
            console.log 'main loaded'
            $(document).trigger('loaded')
            mainFrame = document.getElementById('loader')
            logo = document.getElementById('nba-logo')
            logo.style.height = '525px'
            
            logo.addEventListener 'webkitTransitionEnd',->
                a = document.createElement('a')
                a.href = '#/map'
                a.innerText = "go"
                mainFrame.appendChild(a)

        goTo: (stateName, options = zoom:true)->
            @map.createMap()
            state = null

            _.each @map.svgMap.children[2].children, (e)->
                if e.dataId is 'state/'+stateName
                    state = e
            if options.zoom
                b = state.getCenter()
                @map.svgMap.DOMElement.classList.add 'fat'
                @map.svgMap.DOMElement.style.webkitTransformOrigin = b.x+"px "+b.y+"px"
                state.DOMElement.classList.add 'zoomed'
                window.temp.zoomed = state
            @bottomBarElement.classList.remove 'show'
            $(@bottomBarElement).empty()
            
            _.each state.children, (town)->
                
                if town.dataId isnt undefined and town.dataId isnt ''
                    cities = window.NBA.where state: stateName
                    console.log stateName
                    console.log cities
                    _.each cities, (team)->
                        console.log team
                        if team isnt undefined
                            team.bottomBar()