define ['text!templates/Compare.handlebars', 'backbone', '../framework/customForm'], (templateString, Backbone) ->
    class ApplicationView extends Backbone.View
        events:
            'change select': 'changeTeam'
        changeTeam: (e)->
            console.log 
            @onRendered(@model, window.NBA.findWhere({sluggedName: $(e.currentTarget).val()}))
        initialize: ->
        # Called before rendering
        onRender: ->

        # Called after rendering
        onRendered: ->

        # Called before closing view
        onClose: ->
            #call close on child views

        # Called just before close returns
        onClosed: ->
            #unbind from any events on models/collections

        close: (removeElement=false) ->
            #Call onClose if present
            @onClose() if @onClose
            #Undelegate all events from events array
            @undelegateEvents()
            #remove data and events from main element
            @$el.removeData().unbind()
            #empty the element
            @$el.empty()
            #remove the element completely from dom. Defaults to not removing
            @remove() if removeElement
            #call onClosed if present
            @onClosed() if @onClosed
        render: ->
            @onRender()
            template = Handlebars.compile templateString
            data = {}
            data = @model.attributes if typeof @model != 'undefined'
            @$el.html(template(data))
            @onRendered(@model, window.NBA.models[2])

        onRendered: (datateam1, datateam2)->
            _.each datateam1, (e, i)->
                if parseInt(i) <= 1969
                    delete datateam1[i]
            _.each datateam2, (e, i)->
                if parseInt(i) <= 1969
                    delete datateam2[i]
            innerHeight = 490
            height = innerHeight + 10
            duration = 1000
            drawlines = ->
                #Animation chargement nouvelles données
                loaddata = (datalegend, datalegend2) ->
                    pathteam1.transition().attr("d", (d) ->
                        area datalegend
                    ).duration(duration).ease "elastic"
                    pathareateam1.transition().duration(duration).ease("elastic").attr "d", (d) ->
                        area datalegend
            
                    d3.selectAll(".circlesteam1").transition().duration(duration).ease("elastic").attr "cy", (d, i) ->
                        datalegend[i]
            
                    pathteam2.transition().attr("d", (d) ->
                        area datalegend2
                    ).duration(duration).ease "elastic"
                    pathareateam2.transition().duration(duration).ease("elastic").attr "d", (d) ->
                        area datalegend2
            
                    d3.selectAll(".circlesteam2").transition().duration(duration).ease("elastic").attr "cy", (d, i) ->
                        datalegend2[i]
            
                line = d3.svg.line().x((d, i) ->
                    i * widthpoint
                ).y((d, i) ->
                    d
                ).interpolate("ease")
                lineb = d3.svg.line().x((d, i) ->
                    i * widthpoint
                ).y((d, i) ->
                    d
                ).interpolate("ease")
                pathteam1 = svgSelection.append("path").attr("d", (d) ->
                    line team1
                ).attr("stroke", "#b23843").attr("stroke-width", "1").attr("stroke-dasharray", 0).attr("stroke-dashoffset", 0).attr("fill", "rgba(178,56,67,0)")
                pathteam2 = svgSelection.append("path").attr("d", (d) ->
                    lineb team2
                ).attr("stroke", "#777caf").attr("stroke-width", "1").attr("stroke-dasharray", 0).attr("stroke-dashoffset", 0).attr("fill", "rgba(178,56,67,0)")
                area = d3.svg.area().x((d, i) ->
                    i * widthpoint
                ).y((d) ->
                    d
                ).y0(height).interpolate("ease")
                pathareateam1 = svgSelection.append("path")
                area2 = d3.svg.area().x((d, i) ->
                    i * widthpoint
                ).y((d) ->
                    d
                ).y0(height).interpolate("ease")
                pathareateam2 = svgSelection.append("path")
                totalLength = pathteam1.node().getTotalLength()
                pathteam1.transition().duration(duration).attr("stroke-dasharray", totalLength + " " + totalLength).attr("stroke-dashoffset", totalLength).ease("linear").delay(0).attr("stroke-dashoffset", 0).each "end", ->
                    pathareateam1.attr("d", (d) ->
                        area team1
                    ).attr("fill", "rgba(178,56,67,0)").transition().duration(250).ease("linear").attr "fill", "rgba(178,56,67,0.3)"
            
                pathteam2.transition().duration(duration).attr("stroke-dasharray", totalLength + " " + totalLength).attr("stroke-dashoffset", totalLength).ease("linear").delay(0).attr("stroke-dashoffset", 0).each "end", ->
                    pathareateam2.attr("d", (d) ->
                        area2 team2
                    ).attr("fill", "rgba(119,124,175,0)").transition().duration(250).ease("linear").attr "fill", "rgba(119,124,175,0.3)"
            
                circles = svgSelection.selectAll("svgSelection").data(team1).enter().append("circle").attr("class", "circlesteam1").attr("r", "0").attr("stroke", "#FFFFFF").attr("fill", "#b23843").transition().duration(duration).ease("elastic").delay((d, i) ->
                    i * (duration) / (team1.length)
                ).attr("r", "5").attr("cx", (d, i) ->
                    i * widthpoint
                ).attr("cy", (d) ->
                    d
                )
                circles2 = svgSelection.selectAll("svgSelection").data(team2).enter().append("circle").attr("class", "circlesteam2").attr("stroke", "#FFFFFF").attr("r", "0").attr("fill", "#777caf").transition().duration(duration).ease("elastic").delay((d, i) ->
                    i * (duration) / (team1.length)
                ).attr("r", "5").attr("cx", (d, i) ->
                    i * widthpoint
                ).attr("cy", (d) ->
                    d
                )
                $("ul li.general").click false, ->
                    loaddata team1, team2
            
                $("ul li.points").click false, ->
                    loaddata tabpoints, tabpoints2
            
                $("ul li.rebounds").click false, ->
                    loaddata tabrebounds, tabrebounds2
            
                $("ul li.fieldsGoalsMade").click false, ->
                    loaddata tabfieldsGoalsMade, tabfieldsGoalsMade2
            
                $("ul li.assists").click false, ->
                    loaddata tabassists, tabassists2
            
                $("ul li.freeThrow").click false, ->
                    loaddata tabfreeThrow, tabfreeThrow2
            
                $("ul li.threePointsMade").click false, ->
                    loaddata tabthreePointsMade, tabthreePointsMade2
            
                $("ul li.blocks").click false, ->
                    loaddata tabblocks, tabblocks2
            
                [tabpoints, tabrebounds, tabfieldsGoalsMade, tabassists, tabfreeThrow, tabthreePointsMade, tabblocks]
                line = svgSelection.append("line").attr("x2", 0).attr("y2", height).style("stroke", "#b23843").style("stroke-width", "2")
                pathEl = pathteam1.node()
                pathLength = pathEl.getTotalLength()
                offsetLeft = document.getElementById("graphcompareteam").offsetLeft
                svgSelection.on "mousemove", ->
                    x = d3.event.pageX
                    i = 0
            
                    while i < tabzone.length
                        $("#valuehover p").html Math.round(-(team1[i] - height) / 2) + "    " + Math.round(-(team2[i] - height) / 2) + "         " + years[years.length - team1.length + i]    if x > tabzone[i] and x < tabzone[i + 1]
                        i++
                    beginning = x
                    end = pathLength
                    target = undefined
                    loop
                        target = Math.floor((beginning + end) / 2)
                        pos = pathEl.getPointAtLength(target)
                        break    if (target is end or target is beginning) and pos.x isnt x
                        if pos.x > x
                            end = target
                        else if pos.x < x
                            beginning = target
                        else #position found
                            break
                    line.attr("y1", 0).attr("x1", x).attr("x2", x).attr "y2", height
            
            team1 = []
            tabpoints = []
            tabrebounds = []
            tabfieldsGoalsMade = []
            tabassists = []
            tabfreeThrow = []
            tabthreePointsMade = []
            tabblocks = []
            valuesp = []
            valuesr = []
            valuesf = []
            valuesa = []
            valuesft = []
            valuest = []
            valuesb = []
            tabvalues = [valuesp, valuesr, valuesf, valuesa, valuesft, valuest, valuesb]
            tabdonnees = [tabpoints, tabrebounds, tabfieldsGoalsMade, tabassists, tabfreeThrow, tabthreePointsMade, tabblocks]
            tabmax = []
            $.each datateam1.get('years'), ->
                valuesp.push @points
                valuesr.push @rebounds
                valuesf.push @fieldsGoalsMade
                valuesa.push @assists
                valuesft.push @freeThrow
                valuest.push @threePointsMade
                valuesb.push @blocks
            
            i = 0
            
            while i < 7
                tabmax.push Math.max.apply(null, tabvalues[i])
                i++
            j = 0
            
            while j < 7
                i = 0
            
                while i < tabvalues[j].length
                    tabdonnees[j][i] = ((tabvalues[j][i]) / (tabmax[j])) * -innerHeight + height
                    ++i
                j++
            i = 0
            
            while i < tabpoints.length
                team1.push (tabpoints[i] + tabrebounds[i] + tabfieldsGoalsMade[i] + tabassists[i] + tabfreeThrow[i] + tabthreePointsMade[i] + tabblocks[i]) / 7
                i++
            team2 = []
            tabpoints2 = []
            tabrebounds2 = []
            tabfieldsGoalsMade2 = []
            tabassists2 = []
            tabfreeThrow2 = []
            tabthreePointsMade2 = []
            tabblocks2 = []
            valuesp2 = []
            valuesr2 = []
            valuesf2 = []
            valuesa2 = []
            valuesft2 = []
            valuest2 = []
            valuesb2 = []
            tabvalues2 = [valuesp2, valuesr2, valuesf2, valuesa2, valuesft2, valuest2, valuesb2]
            tabdonnees2 = [tabpoints2, tabrebounds2, tabfieldsGoalsMade2, tabassists2, tabfreeThrow2, tabthreePointsMade2, tabblocks2]
            tabmax2 = []
            $.each datateam2.get('years'), ->
                valuesp2.push @points
                valuesr2.push @rebounds
                valuesf2.push @fieldsGoalsMade
                valuesa2.push @assists
                valuesft2.push @freeThrow
                valuest2.push @threePointsMade
                valuesb2.push @blocks
            
            i = 0
            
            while i < 7
                tabmax2.push Math.max.apply(null, tabvalues2[i])
                i++
            if valuesp.length > valuesp2.length
                difftabpoints2 = valuesp.length - valuesp2.length
                j = 0
            
                while j < 7
                    k = 0
            
                    while k < difftabpoints2
                        tabdonnees2[j].push height
                        k++
                    j++
            j = 0
            
            while j < 7
                i = 0
            
                while i < tabvalues2[j].length
                    tabdonnees2[j].push ((tabvalues2[j][i]) / (tabmax2[j])) * -innerHeight + height
                    ++i
                j++
            i = 0
            
            while i < tabpoints2.length
                team2.push (tabpoints2[i] + tabrebounds2[i] + tabfieldsGoalsMade2[i] + tabassists2[i] + tabfreeThrow2[i] + tabthreePointsMade2[i] + tabblocks2[i]) / 7
                i++
            years = ["1970-1971", "1971-1972", "1972-1973", "1973-1974", "1974-1975", "1975-1976", "1976-1977", "1977-1978", "1978-1979", "1979-1980", "1980-1981", "1981-1982", "1982-1983", "1983-1984", "1984-1985", "1985-1986", "1986-1987", "1987-1988", "1988-1989", "1989-1990", "1990-1991", "1991-1992", "1992-1993", "1993-1994", "1994-1995", "1995-1996", "1996-1997", "1997-1998", "1998-1999", "1999-innerHeight0", "innerHeight0-innerHeight1", "innerHeight1-innerHeight2", "innerHeight2-innerHeight3", "innerHeight3-innerHeight4", "innerHeight4-innerHeight5", "innerHeight5-innerHeight6", "innerHeight6-innerHeight7", "innerHeight7-innerHeight8", "innerHeight8-innerHeight9", "innerHeight9-2010", "2010-2011"]
            graphSelection = d3.select("#graphcompareteam")
            widthwindows = window.innerWidth
            widthpoint = widthwindows / (team1.length - 1)
            svgSelection = undefined
            tabzone = [0]
            i = 0
            while i < team1.length
                tabzone.push widthpoint * i + (widthpoint / 2)
                i++
            window.addEventListener "resize", ->
                d3.selectAll("svg").remove()
                svgSelection = graphSelection.append("svg").attr("width", "100%").attr("height", height)
                widthwindows = window.innerWidth
                widthpoint = widthwindows / (team1.length - 1)
                drawlines()
                widthwindows = window.innerWidth
                tabzone = []
                i = 0
            
                while i < team1.length
                    tabzone.push widthpoint * i + (widthpoint / 2)
                    i++
            console.log team1
            svgSelection = graphSelection.append("svg").attr("width", "100%").attr("height", height)
            drawlines()