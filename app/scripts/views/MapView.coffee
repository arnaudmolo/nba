define ['backbone', 'view', 'd3'], (Backbone, View, ignore)->
    class MapView extends View
        width: 1900
        height: 500
        initialize: ->
        zoom: (d)->
            x = undefined
            y = undefined
            k = undefined
            if d and centered isnt d
                path = d3.geo.path()
                centroid = path.centroid(d)
                x = centroid[0]
                y = centroid[1]
                k = 4
                centered = d
                @svgMap.transition().duration(1000).attr("transform", "translate(" + @width / 2 + "," + @height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")").style "stroke-width", 1.5 / k + "px"
            else
                x = @width / 2
                y = @height / 2
                k = 1
                centered = null
                @svgMap.transition().duration(1000).attr('transform', 'translate('+@width / 4 + ", 0)")
            @svgMap.selectAll("path").classed "active", centered and (d) ->
                d is centered
        createMap: ->
            if @svgMap isnt undefined
                return @
            click = (d, e, f) ->
                window.mainView.map.zoom(d)
                if d isnt undefined
                    window.router.navigate '#/state/'+d.properties.name
            path = d3.geo.path()
            svg = d3.select("#map").append("svg").attr("width", @width).attr("height", @height)
            svg.append("rect").attr("class", "background").attr("width", @width).attr("height", @height).attr('visible', 'hidden').on "click", click, @

            @svgMap = g = svg.append("g").attr("id", "states")
            d3.json "readme.json", (json) ->
                g.selectAll("path").data(json.features).enter().append("path").attr("d", path).on "click", click
                window.mainView.loaded()
            @