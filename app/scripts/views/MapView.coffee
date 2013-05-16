define ['backbone', 'view', 'two'], (Backbone, View, Two)->
    class MapView extends View
        initialize: ->
            cetteVue = @;
            two = new Two
                width: "100%"
                height: "100%"
            .appendTo @map
            $.get "./img/usa_map.svg", (doc) ->
                cetteVue.svgMap = map = two.interpret($(doc).find("svg")[0])
                _.each map.children[2].children, (elem) ->
                    if elem instanceof Two.Group
                        elem.bind "mousedown", ()->
                            window.router.navigate('#/'+@dataId, trigger: true)
                two.update()
            @
        map: document.getElementById 'map'
        goTo: (state)->
            console.log state.dataId
            b = state.getCenter()
            @svgMap.DOMElement.classList.add 'fat'
            @svgMap.DOMElement.style.webkitTransformOrigin = b.x+"px "+b.y+"px"
            state.DOMElement.classList.add 'zoomed'
            _.each state.children, (town)->
                model = window.NBA.where({city: town.dataId})[0]
                if model isnt undefined
                    model.bottomBar()