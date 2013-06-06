var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["./../models/Team"], function(Team) {
  var TeamCollection, _ref;

  return TeamCollection = (function(_super) {
    __extends(TeamCollection, _super);

    function TeamCollection() {
      _ref = TeamCollection.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    TeamCollection.prototype.model = Team;

    TeamCollection.prototype.url = 'http://localhost:9898/team';

    return TeamCollection;

  })(Backbone.Collection);
});
