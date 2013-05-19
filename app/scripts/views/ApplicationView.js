var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['text!templates/Application.handlebars', 'backbone', 'two', 'view', 'views/MapView'], function(templateString, Backbone, Two, View, Map) {
  var ApplicationView, _ref;

  return ApplicationView = (function(_super) {
    __extends(ApplicationView, _super);

    function ApplicationView() {
      _ref = ApplicationView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    ApplicationView.prototype.bottomBarElement = document.getElementById("bottom-bar");

    ApplicationView.prototype.initialize = function() {
      window.mainView = this;
      this.map = new Map();
      this.map.createMap();
      return this.map.render();
    };

    ApplicationView.prototype.stats = function(name) {
      return window.NBA.findWhere({
        name: name
      }).stats();
    };

    ApplicationView.prototype.resetMap = function() {
      this.map.svgMap.DOMElement.classList.remove('fat');
      this.map.svgMap.DOMElement.style.webkitTransformOrigin = "50% 50%";
      if (window.temp.zoomed) {
        window.temp.zoomed.DOMElement.classList.remove("zoomed");
      }
      return this;
    };

    ApplicationView.prototype.loaded = function() {
      var logo, mainFrame;

      console.log('main loaded');
      $(document).trigger('loaded');
      mainFrame = document.getElementById('loader');
      logo = document.getElementById('nba-logo');
      logo.style.height = '525px';
      return logo.addEventListener('webkitTransitionEnd', function() {
        var a;

        a = document.createElement('a');
        a.href = '#/map';
        a.innerText = "go";
        return mainFrame.appendChild(a);
      });
    };

    ApplicationView.prototype.goTo = function(stateName, options) {
      var b, state;

      if (options == null) {
        options = {
          zoom: true
        };
      }
      this.map.createMap();
      state = null;
      _.each(this.map.svgMap.children[2].children, function(e) {
        if (e.dataId === 'state/' + stateName) {
          return state = e;
        }
      });
      if (options.zoom) {
        b = state.getCenter();
        this.map.svgMap.DOMElement.classList.add('fat');
        this.map.svgMap.DOMElement.style.webkitTransformOrigin = b.x + "px " + b.y + "px";
        state.DOMElement.classList.add('zoomed');
        window.temp.zoomed = state;
      }
      this.bottomBarElement.classList.remove('show');
      $(this.bottomBarElement).empty();
      return _.each(state.children, function(town) {
        var cities;

        if (town.dataId !== void 0 && town.dataId !== '') {
          cities = window.NBA.where({
            state: stateName
          });
          return _.each(cities, function(team) {
            if (team !== void 0) {
              return team.bottomBar();
            }
          });
        }
      });
    };

    return ApplicationView;

  })(View);
});
