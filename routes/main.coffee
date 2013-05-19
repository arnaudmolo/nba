jsdom = require 'jsdom'
request = require 'request'
url = require 'url'

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
    app.get '/scrap', (req, res)->
        request {url: 'http://www.databasebasketball.com/teams/teamlist.htm'}, (err, res, body)->
            self = @
            jsdom.env
                html: body
                scripts: ['http://code.jquery.com/jquery-1.9.1.min.js']
            , (err, window)->
                $ = window.jQuery
                $body = $("body")
                $teamLinks = $($body.find("table table")[0]).find('font a')
                $teamLinks.each (a)->
                    website = "http://www.databasebasketball.com/teams/teampage.htm"
                    teampage = url.parse(@href).search
                    request url: website + teampage, (err, res, body)->
                        self = @
                        jsdom.env
                            html: body
                            scripts: ['http://code.jquery.com/jquery-1.9.1.min.js']
                        , (err, window)->
                            $ = window.jQuery
                            $body = $("body")
                            $tableau = $($body.find('table')[2]).find('tr td a')
                            console.log $tableau.length