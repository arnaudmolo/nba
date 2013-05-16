module.exports.initialize = (app) -> 
  Team = app.db.model('Team', app.schemas.Team)
  # obj = new Team(
  #   name: 'warriors'
  #   city: 'golden_state'
  #   players: [[firstname: "frederic", lastname:"difhental", points:5, rebonds:25], [firstname: "marionette", lastname:"pichon", points:125, rebonds:305]]
  #   points: 3514
  # )
  # obj.save((err)->
  #   if err
  #     console.log err
  # )
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
 
