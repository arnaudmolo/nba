jsdom = require 'jsdom'
request = require 'request'
url = require 'url'
_ = require 'underscore'
module.exports.initialize = (app) -> 
  Team = app.db.model('Team', app.schemas.Team)

  app.get('/team', (request, response) ->
    Team.find(request.params, (err, objs) -> 
      response.send(JSON.stringify(objs))
    )
  )
  app.get('/team/:id', (request, response) ->
    id = request.params.id;
    Team.findById(id, (err, obj) -> 
      response.send(JSON.stringify(obj))
    )
  )
  app.put('/team/:id', (request, response) ->
    id = request.params.id;
    console.log request.body
    delete request.body._id if request.body._id
    Team.update({_id: id}, {$set: request.body}, (error, result) ->
        response.send(JSON.stringify(result))
      )
  )
  app.post('/team', (request, response) ->
    obj = new Team(request.body)
    obj.save((err) ->
      response.send(JSON.stringify(obj));
    )
  )
  app.delete('/team/:id', (request, response) ->
    id = request.params.id;
    if (id)
      Team.findById(id, (err, obj) -> 
        obj.remove(() ->
            response.send('')
          )
      )
  )

  # app.get('/lesteams', (req, res)->
  #   res.send(lesTeams)
  # )

  # app.get('/gogo', (req, res)->
  #   console.log 'wai1'
  #   _.each lesTeams, (team)->
  #     obj = new Team(team)
  #     obj.save (err)->
  #       if err
  #         console.log err
  #       else
  #         console.log "good"
  # )

  # lesTeams = {}
  # console.log 'lets scrap bb'
  # request url: 'http://www.databasebasketball.com/teams/teamlist.htm', (err, res, body)->
  #   self = @
  #   jsdom.env
  #     html: body
  #     scripts: ['http://code.jquery.com/jquery-1.9.1.min.js']
  #   , (err, window)->
  #     $ = window.jQuery
  #     $body = $("body")
  #     $teamLinks = $($body.find("table table")[0]).find('font a')
  #     console.log $teamLinks = $($teamLinks.splice($teamLinks.length/2, $teamLinks.length));
  #     $teamLinks.each (a)->

  #       website = "http://www.databasebasketball.com/teams/teampage.htm"
  #       teampage = url.parse(@href).search
  #       request url: website + teampage, (err, res, body)->
  #         self = @
  #         jsdom.env
  #           html: body
  #           scripts: ['http://localhost:3501/scripts/framework/jquery.min.js']
  #         , (err, window)->
  #           $ = window.jQuery
  #           $body = $("body")
  #           websiteWai = "http://www.databasebasketball.com"
  #           $teamName = $($body.find('table')[1]).find('font a')
  #           $tableau = $($body.find('table')[2]).find('td:first-child a')
  #           name = $teamName.html().split("(")[0]
  #           if lesTeams[name] is undefined
  #             lesTeams[name] = {}
  #           lesTeams[name] = lesTeams[name] || {}
  #           lesTeams[name].name = name
  #           lesTeams[name].creation = $teamName.html().split('(')[1].split(' ')[0]

  #           $tableau.each ->
  #             yearPage = $(this).attr('href')
  #             season = $(this).html().split("-")[0];
  #             request url: websiteWai + yearPage, (err, res, body)->
  #               jsdom.env
  #                 html: body
  #                 scripts: ['http://localhost:3501/scripts/framework/jquery.min.js']
  #               , (err, window)->
  #                 $ = window.jQuery
  #                 $body = $("body")
  #                 $tableauAnnee = $($($body.find('table')[3]).find('tr')[1]).find('td')
  #                 if lesTeams[name].years is undefined
  #                   lesTeams[name].years = {}
  #                 lesTeams[name].years[season] = 
  #                   points: $tableauAnnee[2].innerHTML
  #                   rebounds: $tableauAnnee[14].innerHTML
  #                   fieldsGoalsMade: $tableauAnnee[4].innerHTML
  #                   fieldsGoalsAttemped: $tableauAnnee[5].innerHTML
  #                   assists: $tableauAnnee[16].innerHTML
  #                   freeThrow: $tableauAnnee[9].innerHTML
  #                   threePointsMade: $tableauAnnee[10].innerHTML
  #                   threePointsAttemped: $tableauAnnee[11].innerHTML
  #                   blocks: $tableauAnnee[19].innerHTML
  #                 console.log lesTeams[name].years[season].rebounds

  # knicks = new Team(
  #   name: 'knicks'
  #   city: 'new_york'
  #   state: 'new_york'
  #   creation: 1946
  #   years:
  #     '2010':
  #       players: [{firstname: "Anthony", lastname:"Karmelo", points:711, rebonds:181}, {firstname: "Stoudermine", lastname:"Amare", points:1971, rebonds:636}]
  #       points: 8087
  #       rebounds: 3317
  #       fieldGoalsMade: 3042
  #       fieldGoalsAttemped: 6587
  #       assists: 1720
  #       threePointsMade: 511
  #       threePointsAttemped: 1415
  #       blocks: 341
  #     '2009':
  #       players: [{firstname: "David", lastname:"Lee", points:1640, rebonds:949}, {firstname: "Harrigton", lastname:"Al", points:1276, rebonds:949}]
  #       points: 8373
  #       rebounds: 3313
  #       fieldGoalsMade: 3127
  #       fieldGoalsAttemped: 6876
  #       assists: 1772
  #       threePointsMade: 743
  #       threePointsAttemped: 2145
  #       blocks: 305
  # )
  # knicks.save((err)->
  #   if err
  #     console.log err
  # )
  # clipers = new Team(
  #   name: 'clippers'
  #   city: 'los_angeles'
  #   state: 'california'
  #   creation: 1970
  #   years:
  #     '2010':
  #       players: [{firstname: "Patrick", lastname:"Vierra", points:3, rebonds:0}, {firstname: "Antoine", lastname:"Decaunes", points:54, rebonds:214}]
  #       points: 8195
  #       rebounds: 3432
  #       fieldGoalsMade: 1486
  #       fieldGoalsAttemped: 1981
  #       assists: 1802
  #       threePointsMade: 309
  #       threePointsAttemped: 923
  #       blocks: 341
  #     '2009':
  #       players: [{firstname: "Mickeal", lastname:"Kyle", points:741, rebonds:15}, {firstname: "Janny", lastname:"Laungo", points:45, rebonds:204}]
  #       points: 7849
  #       rebounds: 3429
  #       fieldGoalsMade: 3002
  #       fieldGoalsAttemped: 6601
  #       assists: 1810
  #       threePointsMade: 483
  #       threePointsAttemped: 1457
  #       blocks: 466
  # )
  # clipers.save((err)->
  #   if err
  #     console.log err
  # )
  # lackers = new Team(
  #   name: 'lackers'
  #   city: 'los_angeles'
  #   state: 'california'
  #   creation: 1948
  #   years:
  #     '2010':
  #       players: [{firstname: "Kobe", lastname:"Briant", points:2078, rebonds:419}, {firstname: "Paul", lastname:"Gasol", points:1541, rebonds:836}]
  #       points: 8183
  #       rebounds: 3428
  #       fieldGoalsMade: 3003
  #       fieldGoalsAttemped: 6787
  #       assists: 1801
  #       threePointsMade: 585
  #       threePointsAttemped: 1653
  #       blocks: 422
  #     '2009':
  #       players: [{firstname: "Kobe", lastname:"Briant", points:1970, rebonds:391}, {firstname: "Paul", lastname:"Gasol", points:1190, rebonds:734}]
  #       points: 8339
  #       rebounds: 3635
  #       fieldGoalsMade: 3144
  #       fieldGoalsAttemped: 6875
  #       assists: 1730
  #       threePointsMade: 532
  #       threePointsAttemped: 1562
  #       blocks: 400
  # )
  # lackers.save((err)->
  #   if err
  #     console.log err
  # )