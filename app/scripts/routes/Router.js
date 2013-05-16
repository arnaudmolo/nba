var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['backbone'], function() {
  var Router, _ref;

  return Router = (function(_super) {
    __extends(Router, _super);

    function Router() {
      _ref = Router.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Router.prototype.routes = {
      '': 'init',
      '/state/:name': 'state'
    };

    Router.prototype.state = function(name) {
      return console.log(name);
    };

    Router.prototype.init = function() {
      return console.log('init');
    };

    return Router;

  })(Backbone.Router);
});
