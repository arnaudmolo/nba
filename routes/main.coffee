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
 