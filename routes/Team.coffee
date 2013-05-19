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