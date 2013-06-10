var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['text!templates/Application.handlebars', 'backbone', 'view', 'views/MapView', 'views/PlayoffsView', 'views/MenuView', '../framework/csv'], function(templateString, Backbone, View, Map, Playoffs, Menu) {
  var ApplicationView, _ref;

  return ApplicationView = (function(_super) {
    __extends(ApplicationView, _super);

    function ApplicationView() {
      _ref = ApplicationView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    ApplicationView.prototype.bottomBarElement = document.getElementById("bottom-bar");

    ApplicationView.prototype.bottomBarModels = [];

    ApplicationView.prototype.toggleMenu = function(e) {
      return this.menu.toggleMenu();
    };

    ApplicationView.prototype.initialize = function() {
      var t;

      this.el = document.getElementById('main');
      this.$el = $(this.el);
      window.mainView = this;
      this.menu = new Menu({
        el: document.getElementById('menu')
      });
      this.map = new Map();
      this.map.createMap();
      this.map.render();
      this.playoffs = new Playoffs();
      t = this;
      this.$el.find('.open-menu a').on('click', function(e) {
        e.preventDefault();
        return t.toggleMenu();
      });
      return window.onresize = function() {
        t.map.update();
        return t.playoffs.update();
      };
    };

    ApplicationView.prototype.stats = function(name) {
      return window.NBA.findWhere({
        sluggedName: name
      }).stats();
    };

    ApplicationView.prototype.loaded = function() {
      $(document).trigger('loaded');
      this.mainFrame = document.getElementById('home');
      return this.mainFrame.classList.remove('loading');
    };

    ApplicationView.prototype.goTo = function(stateName, options) {
      var next, t;

      if (options == null) {
        options = {
          zoom: true
        };
      }
      t = this;
      next = function() {
        var paths, state;

        this.map.createMap();
        state = null;
        paths = d3.selectAll('#states path');
        paths.each(function(e) {
          if (e.properties.name === stateName) {
            state = e.properties.name;
            return window.mainView.map.zoom(e);
          }
        });
        t.bottomBarElement.classList.add('hidden');
        _.each(this.bottomBarModels, function(model) {
          return model.bottomBarRemove();
        });
        _.each(window.NBA.where({
          state: state
        }), function(team) {
          t.bottomBarElement.classList.remove('hidden');
          return team.bottomBar();
        });
        return window.transition = false;
      };
      if (options.zoom) {
        return $.scrollTo("#teams", 1000, {
          axis: 'y',
          onAfter: function() {
            next.apply(t);
            console.log('ON ADTER BB');
            if (options.stats) {
              return setTimeout(function() {
                return $.scrollTo("#stats", 1000, {
                  axis: 'y'
                });
              }, 1500);
            }
          }
        });
      } else {
        return next.apply(t);
      }
    };

    ApplicationView.prototype.awards = function(name) {
      var team;

      team = window.NBA.findWhere({
        sluggedName: name
      });
      team.awards();
      return team;
    };

    ApplicationView.prototype.players = function(name, player) {
      var team;

      team = window.NBA.findWhere({
        sluggedName: name
      });
      team.players(player);
      return team;
    };

    return ApplicationView;

  })(View);
});
