exports.initialize = (app) ->
  new app.mongoose.Schema({
  
    name: String
  
    city: String
  
    players: Array
  
    points: Number
  }); 
