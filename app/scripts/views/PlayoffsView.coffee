define ['view', 'd3', '../framework/spy'], (View, ignore)->
    class PlayoffsView extends View
        width: 955
        height: 550
        initialize: ->
            # colors = 
            #     '#F0822C':'new-york-knicks'
            #     '#742D84':'los-angeles-lakers'
            #     '#13361E':'milwaukee-bucks'
            #     '#DF2723':'baltimore-bullets'
            #     '#01844E':'boston-celtics'
            #     '#F4D519':'golden-state-warriors'
            #     '#2D2763':'phénix-suns'
            #     '#81A7BE':'orlando-magic'
            #     '#E22527':'washington-wizards'
            #     '#BCC4CA':'san-antonio-spurs'
            #     '#E7A615':'denver-nuggets'
            #     '#DF343F':'atlanta-hawks'
            #     '#E7353E':'portland-blazers'
            #     '#E34E24':'buffalo-braves'
            #     '#C82040':'chicago-bulls'
            #     '#E5262A':'cap'
            #     '#1F5BA7':'philadelphie-sixers'
            #     '#D91F3C':'houston-rockets'
            #     '#80BC45':'seattle-supersonics'
            #     '#CD3528':'kansas-city-kings'
            #     '#83163F':'cleveland-cavaliers'
            #     '#E6234E':'detroit-pistons' 
            #     '#085187':'minnesota-timberwolves'
            #     '#1A1B39':'brooklyn-nets'
            #     '#391C47':'utah-jazz'
            #     '#0470B8':'dallas-mavericks'
            #     '#1C99B3':'charlotte-bobcats'
            #     '#212D57':'indiana-pacers'
            #     '#95182B':'miami-heat'
            #     '#B5163C':'toronto-raptors'
            #     '#283388':'sacramento-kings'
            #     '#1C99B7':'new-orleans-hornets'
            #     '#1F4D9D':'los-angeles-clippers'
            #     '#5E86B7':'memphis-grizzlies'
            #     '#187CC1':'oklahoma-city-thunder'

            # $.ajax
            #     url: '/img/playoffs.svg'
            #     success: (data)->
            #         ex = 
            #             finalconf: []
            #             semifinal: []
            #             quarterfinal: []
            #             final: []
            #         $(data).find('#finalconf>g').each (i, e)->
            #             group = []
            #             $(e).find('circle, path').each (index, element)->
            #                 forme = {}
            #                 forme.color = element.attributes.fill.nodeValue
            #                 forme.width = 1
            #                 forme.team = colors[forme.color]
            #                 group.push(forme)
            #             ex.finalconf.push(group)
            #         $(data).find('#semifinal>g').each (i, e)->
            #             group = []
            #             $(e).find('circle, path').each (index, element)->
            #                 forme = {}
            #                 forme.color = element.attributes.fill.nodeValue
            #                 forme.width = 1
            #                 forme.team = colors[forme.color]
            #                 group.push(forme)
            #             ex.semifinal.push(group)
            #         $(data).find('#quarterfinal>g').each (i, e)->
            #             group = []
            #             $(e).find('circle, path').each (index, element)->
            #                 forme = {}
            #                 forme.color = element.attributes.fill.nodeValue
            #                 forme.width = 1
            #                 forme.team = colors[forme.color]
            #                 group.push(forme)
            #             ex.quarterfinal.push(group)
            #         $(data).find('#final path, #final circle').each (index, element)->
            #             forme = {}
            #             forme.color = element.attributes.fill.nodeValue
            #             forme.width = 1
            #             forme.team = colors[forme.color]
            #             ex.final.push(forme)

            #         console.log JSON.stringify(ex)
            t = @
            @svg = d3.select("#playoffs").append("svg").attr("width", @width).attr("height", @height)
            @pie = d3.layout.pie().sort(null).value (d) ->
                1
            $("#playoffs").on 'scrollSpy:enter', (e)->
                console.log @
                d3.json "haha.json", (error, datas) ->
                    t.render(datas)
                $(@).unbind('scrollSpy:enter')
            $('#playoffs').scrollSpy();
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
                    .delay(200)
                    .attr('d', line(array))
                group = texts.append('g')
                group
                    .attr('transform', 'translate(470,0),rotate(0,470,0)')
                    .attr('opacity', 0)
                    .transition()
                    .duration(1000)
                    .delay(200)
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