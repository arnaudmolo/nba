define ['backbone', 'view', 'd3'], (Backbone, View, ignore)->
    class MapView extends View
        width: ->
            $(window).width()
        height: 360
        initialize: ->
        update: ->
            @svg.attr('width', @width())
            @rect.attr('width', @width())
            @zoom()
        zoom: (d)->
            x = undefined
            y = undefined
            k = undefined
            width = @width()
            if d and centered isnt d
                path = d3.geo.path()
                centroid = path.centroid(d)
                x = centroid[0]
                y = centroid[1]
                k = 2
                centered = d
                @svgMap
                    .transition().duration(1000)
                    .attr("transform", "translate(" + width / 2 + "," + @height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")").style "stroke-width", 1.5 / k + "px"
            else
                k = 0.73
                centered = null
                translation = width / 2
                translation = translation - 305
                @svgMap.transition().duration(1000).attr('transform', 'translate('+ translation + ", 0)scale("+k+")")
            @svgMap.selectAll("path").classed "active", centered and (d) ->
                d is centered
        createMap: ->
            if @svgMap isnt undefined
                return @
            click = (d) ->
                console.log d
                window.mainView.map.zoom(d)
                if d isnt undefined
                    window.router.navigate '#/state/'+d.properties.name
            path = d3.geo.path()
            @svg = d3.select("#map").append("svg").attr("width", @width()).attr("height", @height)
            @rect = @svg.append("rect")
            @rect.attr("class", "background").attr("width", @width()).attr("height", @height).attr('visible', 'hidden').on "click", click, @
            @svgMap = g = @svg.append("g").attr("id", "states")
            d3.json "readme.json", (json) ->
                g.selectAll("path").data(json.features).enter().append("path").attr("d", path).on "click", click
                window.mainView.loaded()
                click()
            @