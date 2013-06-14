define ['view', 'd3', '../framework/spy'], (View, ignore)->
    class PlayoffsView extends View
        width: ->
            955
        height: ->
            550
        taille: ->
            (0.7 * @width()) / @height()
        update: ->
            @svg.attr('transform', 'scale('+@taille()+')');
        initialize: ->
            t = @
            @$el = $("#playoffs");
            @el = @$el[0]
            window.lol = @$el
            @svg = d3.select("#playoffs").append("svg").attr("width", @width()).attr("height", @height())
            @groupe = @svg.append('g')
            @svg.attr('transform', 'scale('+@taille()+')')
            @pie = d3.layout.pie().sort(null).value (d) ->
                1
            $(document).on 'scroll', (e, i)->
                showAt = t.$el.position().top - t.$el.width()/2
                if window.mainView.$body.scrollTop() > showAt
                    $(document).unbind 'scroll'
                    d3.json "haha.json", (error, datas) ->
                        t.render(datas)
        render: (datas)->
            _this = @
            datas.final.reverse()
            datas.finalconf.reverse()
            datas.semifinal.reverse()
            datas.quarterfinal.reverse()
            _this.dessine(datas.final, {translateX: 380, rotateX: 100, radius: 4, order: 4, name: "final"})
            _this.dessine(datas.finalconf, {translateX: 280, radius: 7.5, rotateX: 200, order: 3, name: "finalconf"})
            _this.dessine(datas.semifinal, {translateX: 180, rotateX: 300, radius: 11, order: 2, name: "semifinal"})
            _this.dessine(datas.quarterfinal, {translateX: 80, rotateX: 400, radius: 14, order: 1, name: "quarterfinal"})

            array = [{x:20, y:500}, {x:475, y:500}]
            nullArray = [{x:475, y:500}, {x:475, y:500}]

            line = d3.svg.line().x (d) ->
                d.x
            .y (d) ->
                d.y

            texts = @svg.append('g').attr('id', 'playoffs-text').attr('transform', 'translate(10, 490)')
            lignes = @svg.append('g').attr('id', 'playoffs-lignes')
            i = 0
            while i < 44
                lignes
                    .append('path')
                    .attr('d', line(nullArray))
                    .attr('opacity', 0.5)
                    .attr('transform', 'rotate('+i*4.0909090909090909090909090909091+', 480, 500)')
                    .style("stroke", "grey")
                    .transition()
                    .duration(2000)
                    .delay(0)
                    .attr('d', line(array))
                group = texts.append('g')
                group
                    .attr('transform', 'translate(470,0),rotate(0,470,0)')
                    .attr('opacity', 0)
                    .transition()
                    .duration(1000)
                    .delay(0)
                    .attr('transform', 'rotate('+i*4.0909090909090909090909090909091+', 470, 0)')
                    .attr('opacity', 1)
                text = group.append('text')
                text
                    .text(1970+i)
                    .attr("color", "red")
                    .attr("font-size", "12px")
                if i>23
                    text.attr('transform', 'rotate(180, 12, 0)')
                i++
            d3.selectAll("#legend>.team").on "mouseenter", (e)->
                elClass = @classList[1]
                show = d3.selectAll("#playoffs ."+elClass)
                dessins = d3.selectAll("#playoffs-finalconf path:not(."+elClass+"), #playoffs-final path:not(."+elClass+"), #playoffs-semifinal path:not(."+elClass+"), #playoffs-quarterfinal path:not(."+elClass+")").attr('opacity', 0.25)
            .on "mouseleave", ->
                dessins = d3.selectAll("#playoffs-finalconf path, #playoffs-final path, #playoffs-semifinal path, #playoffs-quarterfinal path").attr('opacity', 1)

        dessine: (tableau, option = { translateX: 280, radius: 7.5, rotateX: 200, order: 1 })->
            _this = @
            arc = d3.svg.arc().outerRadius(option.radius).innerRadius(0)
            _svg = _this.svg.append('g').attr('id', 'playoffs-'+option.name)
            tableau.forEach (data, index)->
                if data.color isnt undefined
                    data = [data]
                i = index + 1
                rotate = - 180 - i * 4.09
                svg2 = _svg.append("g").attr('transform', 'translate(480, 500), rotate(0, 0, 0)').attr('opacity', '0')
                g = svg2
                    .selectAll(".arc")
                    .data(_this.pie(data))
                    .enter()
                    .append("g")
                    .attr("class", "arc")

                svg2
                    .transition()
                    .duration(1000)
                    .delay(1000  + option.order * 500)
                    .attr("transform", "translate("+option.translateX+",500), rotate("+rotate+", "+option.rotateX+", 0)")
                    .attr('opacity', 0.8)

                paths = g.append("path")
                    .attr 'class', (d)->
                        d.data.team
                paths.style "fill", (d) ->
                    d.data.color
                paths.transition().duration(500).attr('d', arc)