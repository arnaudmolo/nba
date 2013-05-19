define ['backbone', 'view', 'two'], (Backbone, View, Two)->
    class MapView extends View
        initialize: ->

        map: document.getElementById 'map'

        createMap: ->

            if @svgMap isnt undefined
                return @
            
            two = new Two
                width: "100%"
                height: "70%"
            .appendTo @map
            
            _this = @
            
            $.ajax
                url:"/img/usa_map.svg"
                async: true
                success: (doc) ->
                    _this.svgMap = two.interpret($(doc).find("svg")[0])
            
                    _.each _this.svgMap.children[2].children, (elem) ->
                        if elem instanceof Two.Group
                            elem.bind "mousedown", ()->
                                window.router.navigate('//'+@dataId, trigger: true)
            
                    two.update()
                    window.mainView.loaded()
            
            @