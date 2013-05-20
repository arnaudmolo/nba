jsdom = require 'jsdom'
request = require 'request'
url = require 'url'

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

  console.log 'lets scrap bb'
  request url: 'http://www.databasebasketball.com/teams/teamlist.htm', (err, res, body)->
    self = @
    jsdom.env
      html: body
      scripts: ['http://code.jquery.com/jquery-1.9.1.min.js']
    , (err, window)->
      $ = window.jQuery
      $body = $("body")
      $teamLinks = $($body.find("table table")[0]).find('font a')
      $teamLinks.each (a)->

        lateam = new Team()
        website = "http://www.databasebasketball.com/teams/teampage.htm"
        teampage = url.parse(@href).search
        request url: website + teampage, (err, res, body)->
          self = @
          jsdom.env
            html: body
            scripts: ['http://code.jquery.com/jquery-1.9.1.min.js']
          , (err, window)->
            websiteWai = "http://www.databasebasketball.com"
            $ = window.jQuery
            $body = $("body")
            $teamName = $($body.find('table')[1]).find('font a')
            $tableau = $($body.find('table')[2]).find('td:first-child a')
            lateam.name = $teamName.html().split("(")[0]
            lateam.creation = $teamName.html().split('(')[1].split(' ')[0]
            $tableau.each ->
              yearPage = $(this).attr('href')
              season = $(this).html().split("-")[0];
              lateam[season] = {}
              request url: websiteWai + yearPage, (err, res, body)->
                jsdom.env
                  html: body
                  scripts: ['http://code.jquery.com/jquery-1.9.1.min.js']
                , (err, window)->
                  console.log lateam.name
                  $ = window.jQuery
                  $body = $("body")
                  $tableauAnnee = $($($body.find('table')[3]).find('tr')[1]).find('td')
                  lateam[season] = 
                    points: $tableauAnnee[2].innerHTML
                    rebounds: $tableauAnnee[14].innerHTML
                    fieldsGoalsMade: $tableauAnnee[4].innerHTML
                    fieldsGoalsAttemped: $tableauAnnee[5].innerHTML
                    assists: $tableauAnnee[16].innerHTML
                    freeThrow: $tableauAnnee[9].innerHTML
                    threePointsMade: $tableauAnnee[10].innerHTML
                    threePointsAttemped: $tableauAnnee[11].innerHTML
                    blocks: $tableauAnnee[19].innerHTML
                  lateam.save((err)->
                    if err
                      console.log err
                  )
