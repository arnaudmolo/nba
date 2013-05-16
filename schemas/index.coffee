path = require('path')
exports.initialize = (app) ->
  require("fs").readdirSync("./schemas").forEach((file) ->
    return if !file.match(new RegExp "\.coffee$")
    return if file == 'index.coffee'
    schemaInitializer = require "./" + file
    app['schemas'] = {} if typeof app['schemas'] is 'undefined'
    app['schemas'][path.basename(file, '.coffee')] = schemaInitializer.initialize app
  )
