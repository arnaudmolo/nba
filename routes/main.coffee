exports.initialize = (app) ->
    app.get '/', (req, res) ->
        res.redirect '/index.html'

    app.get '/coffeebone/configuration', (req, res) ->
        package_parser = require('package-parser')
        conf = package_parser.getPackageJsonSync()
        if conf.coffeebone && conf.coffeebone.frontend
            res.send(JSON.stringify(conf.coffeebone.frontend))
        else
            res.send('{}')
    # app.get '/scrap', (req, res)->
    # console.log 'lets scrap bb'
    # request {url: 'http://www.databasebasketball.com/teams/teamlist.htm'}, (err, res, body)->
    #     self = @
    #     jsdom.env
    #         html: body
    #         scripts: ['http://code.jquery.com/jquery-1.9.1.min.js']
    #     , (err, window)->
    #         $ = window.jQuery
    #         $body = $("body")
    #         $teamLinks = $($body.find("table table")[0]).find('font a')
    #         $teamLinks.each (a)->
    #             lateam = {}
    #             website = "http://www.databasebasketball.com/teams/teampage.htm"
    #             teampage = url.parse(@href).search
    #             request url: website + teampage, (err, res, body)->
    #                 self = @
    #                 jsdom.env
    #                     html: body
    #                     scripts: ['http://code.jquery.com/jquery-1.9.1.min.js']
    #                 , (err, window)->
    #                     console.log '=========== lateam page =========='
    #                     websiteWai = "http://www.databasebasketball.com"
    #                     $ = window.jQuery
    #                     $body = $("body")
    #                     $teamName = $($body.find('table')[1]).find('font a')
    #                     $tableau = $($body.find('table')[2]).find('td:first-child a')
    #                     lateam.name = $teamName.html().split("(")[0]
    #                     lateam.creation = $teamName.html().split('(')[1].split(' ')[0]
    #                     $tableau.each ->
    #                         yearPage = $(this).attr('href')
    #                         season = $(this).html().split("-")[0];
    #                         lateam[season] = {}
    #                         request url: websiteWai + yearPage, (err, res, body)->
    #                             jsdom.env
    #                                 html: body
    #                                 scripts: ['http://code.jquery.com/jquery-1.9.1.min.js']
    #                             , (err, window)->
    #                                 console.log '=========== Year page =========='
    #                                 console.log lateam.name
    #                                 $ = window.jQuery
    #                                 $body = $("body")
    #                                 $tableauAnnee = $($($body.find('table')[3]).find('tr')[1]).find('td')
    #                                 lateam[season] = 
    #                                     points: $tableauAnnee[2].innerHTML
    #                                     rebounds: $tableauAnnee[14].innerHTML
    #                                     fieldsGoalsMade: $tableauAnnee[4].innerHTML
    #                                     fieldsGoalsAttemped: $tableauAnnee[5].innerHTML
    #                                     assists: $tableauAnnee[16].innerHTML
    #                                     freeThrow: $tableauAnnee[9].innerHTML
    #                                     threePointsMade: $tableauAnnee[10].innerHTML
    #                                     threePointsAttemped: $tableauAnnee[11].innerHTML
    #                                     blocks: $tableauAnnee[19].innerHTML
    #                                 console.log lateam                                    