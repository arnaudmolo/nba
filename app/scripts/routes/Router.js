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
      'map': 'map'
    };

    Router.prototype.state = function(name) {
      window.mainView.goTo(name);
      return $.scrollTo("#bottom-bar", 500);
    };

    Router.prototype.init = function() {};

    Router.prototype.stats = function(name) {
      window.mainView.goTo(window.mainView.stats(name).get('state'), {
        zoom: false
      });
      return $.scrollTo("#stats", 500);
    };

    Router.prototype.map = function() {
      return $.scrollTo("#map", 500);
    };

    return Router;

  })(Backbone.Router);
});
