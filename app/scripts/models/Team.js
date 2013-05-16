var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define([], function() {
  var Team, _ref;

  return Team = (function(_super) {
    __extends(Team, _super);

    function Team() {
      _ref = Team.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Team.prototype.idAttribute = "_id";

    Team.prototype.defaults = {
      name: "",
      city: "",
      players: [],
      points: 0
    };

    Team.prototype.bottomBar = function() {
      return console.log("OUI");
    };

    return Team;

  })(Backbone.Model);
});
