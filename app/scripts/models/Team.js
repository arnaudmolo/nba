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
          fieldsGoalsMade: 0,
          fieldsGoalsAttemped: 0,
          assists: 0,
          threePointsMade: 0,
          threePointsAttemped: 0,
          blocks: 0,
          fielsdGoalsPercent: 0,
          threePointsPercent: 0
        }
      }
    };

    Team.prototype.initialize = function() {};

    Team.prototype.bottomBar = function() {
      var t;

      if (this.bottomBarView !== void 0) {
        this.bottomBarView = new BottomBarView({
          model: this
        });
      }
      window.mainView.bottomBarElement.insertBefore(this.bottomBarView.render());
      t = this;
      setTimeout(function() {
        return t.bottomBarView.el.classList.add('show');
      }, 3);
      return window.mainView.bottomBarModels.push(this);
    };

    Team.prototype.bottomBarRemove = function() {
      return this.bottomBarView.remove();
    };

    Team.prototype.render = function() {
      this.statsView = new StatsView({
        model: this
      });
      return $("#stats").empty().prepend(this.statsView.render());
    };

    Team.prototype.stats = function() {
      if (this.statsView === null) {
        this.render();
      }
      this.statsView.data();
      return this;
    };

    Team.prototype.awards = function() {
      if (this.statsView === null) {
        this.render();
      }
      return this.statsView.awards();
    };

    Team.prototype.players = function() {
      if (this.statsView === null) {
        this.render();
      }
      return this.statsView.players();
    };

    return Team;

  })(Backbone.Model);
});
