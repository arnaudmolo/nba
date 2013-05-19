var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['backbone', '.././views/BottomBarView', '.././views/StatsView'], function(Backbone, BottomBarView, StatsView) {
  var Team, _ref;

  return Team = (function(_super) {
    __extends(Team, _super);

    function Team() {
      _ref = Team.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Team.prototype.idAttribute = "_id";

    Team.prototype.bottomBarView = null;

    Team.prototype.statsView = null;

    Team.prototype.defaults = {
      name: "",
      city: "",
      creation: 0,
      years: {
        '': {
          players: [],
          points: 0,
          rebounds: 0,
          fieldGoalsMade: 0,
          fieldGoalsAttemped: 0,
          assists: 0,
          threePointsMade: 0,
          threePointsAttemped: 0,
          blocks: 0
        }
      }
    };

    Team.prototype.initialize = function() {
      return _.each(this.get('years'), function(year) {
        year.fieldGoalsPercent = year.fieldGoalsMade / year.fieldGoalsAttemped * 100;
        return year.threePointsPercent = year.threePointsMade / year.threePointsAttemped * 100;
      });
    };

    Team.prototype.bottomBar = function() {
      if (this.bottomBarView === null) {
        this.bottomBarView = new BottomBarView({
          model: this
        });
      }
      window.mainView.bottomBarElement.insertBefore(this.bottomBarView.render());
      return this.bottomBarView.el.classList.add('show');
    };

    Team.prototype.stats = function() {
      window.mainView.resetMap();
      if (this.statsView === null) {
        this.statsView = new StatsView({
          model: this
        });
      }
      $("#stats").empty().prepend(this.statsView.render());
      return this;
    };

    return Team;

  })(Backbone.Model);
});
