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