var jsdom, request, url;

jsdom = require('jsdom');

request = require('request');

url = require('url');

module.exports.initialize = function(app) {
  var Team;

  Team = app.db.model('Team', app.schemas.Team);
  app.get('/team', function(request, response) {
    return Team.find(request.params, function(err, objs) {
      return response.send(JSON.stringify(objs));
    });
  });
  app.get('/team/:id', function(request, response) {
    var id;

    id = request.params.id;
    return Team.findById(id, function(err, obj) {
      return response.send(JSON.stringify(obj));
    });
  });
  app.put('/team/:id', function(request, response) {
    var id;

    id = request.params.id;
    console.log(request.body);
    if (request.body._id) {
      delete request.body._id;
    }
    return Team.update({
      _id: id
    }, {
      $set: request.body
    }, function(error, result) {
      return response.send(JSON.stringify(result));
    });
  });
  app.post('/team', function(request, response) {
    var obj;

    obj = new Team(request.body);
    return obj.save(function(err) {
      return response.send(JSON.stringify(obj));
    });
  });
  app["delete"]('/team/:id', function(request, response) {
    var id;

    id = request.params.id;
    if (id) {
      return Team.findById(id, function(err, obj) {
        return obj.remove(function() {
          return response.send('');
        });
      });
    }
  });
  console.log('lets scrap bb');
  return request({
    url: 'http://www.databasebasketball.com/teams/teamlist.htm'
  }, function(err, res, body) {
    var self;

    self = this;
    return jsdom.env({
      html: body,
      scripts: ['http://code.jquery.com/jquery-1.9.1.min.js']
    }, function(err, window) {
      var $, $body, $teamLinks;

      $ = window.jQuery;
      $body = $("body");
      $teamLinks = $($body.find("table table")[0]).find('font a');
      return $teamLinks.each(function(a) {
        var lateam, teampage, website;

        lateam = new Team();
        website = "http://www.databasebasketball.com/teams/teampage.htm";
        teampage = url.parse(this.href).search;
        return request({
          url: website + teampage
        }, function(err, res, body) {
          self = this;
          return jsdom.env({
            html: body,
            scripts: ['http://code.jquery.com/jquery-1.9.1.min.js']
          }, function(err, window) {
            var $tableau, $teamName, websiteWai;

            websiteWai = "http://www.databasebasketball.com";
            $ = window.jQuery;
            $body = $("body");
            $teamName = $($body.find('table')[1]).find('font a');
            $tableau = $($body.find('table')[2]).find('td:first-child a');
            lateam.name = $teamName.html().split("(")[0];
            lateam.creation = $teamName.html().split('(')[1].split(' ')[0];
            return $tableau.each(function() {
              var season, yearPage;

              yearPage = $(this).attr('href');
              season = $(this).html().split("-")[0];
              lateam[season] = {};
              return request({
                url: websiteWai + yearPage
              }, function(err, res, body) {
                return jsdom.env({
                  html: body,
                  scripts: ['http://code.jquery.com/jquery-1.9.1.min.js']
                }, function(err, window) {
                  var $tableauAnnee;

                  console.log(lateam.name);
                  $ = window.jQuery;
                  $body = $("body");
                  $tableauAnnee = $($($body.find('table')[3]).find('tr')[1]).find('td');
                  lateam[season] = {
                    points: $tableauAnnee[2].innerHTML,
                    rebounds: $tableauAnnee[14].innerHTML,
                    fieldsGoalsMade: $tableauAnnee[4].innerHTML,
                    fieldsGoalsAttemped: $tableauAnnee[5].innerHTML,
                    assists: $tableauAnnee[16].innerHTML,
                    freeThrow: $tableauAnnee[9].innerHTML,
                    threePointsMade: $tableauAnnee[10].innerHTML,
                    threePointsAttemped: $tableauAnnee[11].innerHTML,
                    blocks: $tableauAnnee[19].innerHTML
                  };
                  return lateam.save(function(err) {
                    if (err) {
                      return console.log(err);
                    }
                  });
                });
              });
            });
          });
        });
      });
    });
  });
};
