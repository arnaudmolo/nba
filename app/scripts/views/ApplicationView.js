var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['text!templates/Application.handlebars', 'backbone', 'view', 'views/MapView', 'views/PlayoffsView', 'views/MenuView'], function(templateString, Backbone, View, Map, Playoffs, Menu) {
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

      this.$body = $('body');
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
      this.arrows = document.getElementById('arrows');
      this.arrowsEl = arrows.getElementsByTagName('a');
      t = this;
      this.arrowsEl[0].addEventListener('click', function(e) {
        return t.prev(this, e);
      });
      this.arrowsEl[1].addEventListener('click', function(e) {
        console.log('this', this, 'e', e);
        return t.next(this, e);
      });
      this.$el.find('.open-menu a').on('click', function(e) {
        e.preventDefault();
        return t.toggleMenu();
      });
      this.$el.find('.detailsmenu a').on('click', function(e) {
        return window.transition = true;
      });
      this.$sections = this.$el.find('>section');
      return window.onresize = function() {
        t.map.update();
        return t.menu.update();
      };
    };

    ApplicationView.prototype.moreVisible = function() {
      var element, temp;

      element = null;
      temp = -10;
      this.$sections.each(function(i, e) {
        var divBottomInWindow, divHeight, divTop, divTopInWindow, percentVisible, scrollTop, windowHeight;

        divTop = $(e).offset().top;
        scrollTop = $(document).scrollTop();
        windowHeight = $(window).height();
        divHeight = $(e).height();
        divTopInWindow = Math.max(0, divTop - scrollTop);
        divBottomInWindow = Math.min(windowHeight, divTop + divHeight - scrollTop);
        percentVisible = (divBottomInWindow - divTopInWindow) / windowHeight;
        if (percentVisible > temp) {
          temp = percentVisible;
          return element = e;
        }
      });
      return element;
    };

    ApplicationView.prototype.next = function(el, ev) {
      var element, next;

      element = this.moreVisible();
      next = $(element).next('section');
      if (next[0] === void 0) {
        next = element;
      }
      if (next.attr('data-url') === "") {
        next = next.next('section');
      }
      el.setAttribute('href', '#/' + next.attr('data-url'));
      return $.scrollTo(next, 500);
    };

    ApplicationView.prototype.prev = function(el, ev) {
      var element, prev;

      element = this.moreVisible();
      prev = $(element).prev('section');
      if (prev[0] === void 0) {
        prev = element;
      }
      if (prev.attr('data-url') === "") {
        prev = prev.prev('section');
      }
      console.log(prev);
      el.setAttribute('href', '#/' + prev.attr('data-url'));
      return $.scrollTo(prev, 500);
    };

    ApplicationView.prototype.recenter = function(el, ev) {
      var element;

      element = this.moreVisible();
      el.setAttribute('href', '#/' + element.getAttribute('data-url'));
      return $.scrollTo($(element), 500);
    };

    ApplicationView.prototype.stats = function(name) {
      this.menu.$el.find('.players-hide').addClass('hidden');
      this.menu.$el.find('.stats-hide').removeClass('hidden');
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
        return $.scrollTo("#stats", 1000, {
          axis: 'y',
          onAfter: function() {
            return next.apply(t);
          }
        });
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

      this.menu.$el.find('.stats-hide').addClass('hidden');
      this.menu.$el.find('.players-hide').removeClass('hidden');
      team = window.NBA.findWhere({
        sluggedName: name
      });
      team.players(player);
      return team;
    };

    ApplicationView.prototype.compare = function(name) {
      var team;

      team = window.NBA.findWhere({
        sluggedName: name
      });
      team.compare();
      return team;
    };

    return ApplicationView;

  })(View);
});
