var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['backbone', 'goto'], function() {
  var Router, _ref;

  return Router = (function(_super) {
    __extends(Router, _super);

    function Router() {
      _ref = Router.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Router.prototype.routes = {
      '': 'init',
      'state/:name': 'state',
      'stats/:name': 'stats',
      'map': 'map',
      'playoffs': 'playoffs',
      'awards/:name': 'awards',
      'players/:name': 'players',
      'the-team': 'theTeam',
      'compare/:name': 'compare'
    };

    Router.prototype.state = function(name) {
      window.mainView.goTo(name);
      $.scrollTo("#teams", 500, {
        axis: 'y'
      });
      return window.transition = true;
    };

    Router.prototype.init = function() {};

    Router.prototype.stats = function(name) {
      return window.mainView.goTo(window.mainView.stats(name).get('state'), {
        zoom: window.transition,
        stats: true
      });
    };

    Router.prototype.map = function() {
      return $.scrollTo("#teams", 500, {
        axis: 'y'
      });
    };

    Router.prototype.playoffs = function() {
      return $.scrollTo("#playoffs-style", 500, {
        axis: 'y'
      });
    };

    Router.prototype.awards = function(name) {
      return window.mainView.goTo(window.mainView.awards(name).get('state'), {
        zoom: window.transition,
        stats: true
      });
    };

    Router.prototype.players = function(name) {
      return window.mainView.goTo(window.mainView.players(name).get('state'), {
        zoom: window.transition,
        stats: true
      });
    };

    Router.prototype.theTeam = function() {
      return $.scrollTo("#the-team", 500, {
        axis: 'y'
      });
    };

    Router.prototype.compare = function(name) {
      return window.mainView.goTo(window.mainView.compare(name).get('state'), {
        zoom: window.transition,
        stats: true
      });
    };

    return Router;

  })(Backbone.Router);
});
