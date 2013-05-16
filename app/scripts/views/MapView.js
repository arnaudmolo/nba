var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['backbone', 'view', 'two'], function(Backbone, View, Two) {
  var MapView, _ref;

  return MapView = (function(_super) {
    __extends(MapView, _super);

    function MapView() {
      _ref = MapView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    MapView.prototype.initialize = function() {
      var cetteVue, two;

      cetteVue = this;
      two = new Two({
        width: "100%",
        height: "100%"
      }).appendTo(this.map);
      $.get("./img/usa_map.svg", function(doc) {
        var map;

        cetteVue.svgMap = map = two.interpret($(doc).find("svg")[0]);
        _.each(map.children[2].children, function(elem) {
          if (elem instanceof Two.Group) {
            return elem.bind("mousedown", function() {
              return window.router.navigate('#/' + this.dataId, {
                trigger: true
              });
            });
          }
        });
        return two.update();
      });
      return this;
    };

    MapView.prototype.map = document.getElementById('map');

    MapView.prototype.goTo = function(state) {
      var b;

      console.log(state.dataId);
      b = state.getCenter();
      this.svgMap.DOMElement.classList.add('fat');
      this.svgMap.DOMElement.style.webkitTransformOrigin = b.x + "px " + b.y + "px";
      state.DOMElement.classList.add('zoomed');
      return _.each(state.children, function(town) {
        var model;

        model = window.NBA.where({
          city: town.dataId
        })[0];
        if (model !== void 0) {
          return model.bottomBar();
        }
      });
    };

    return MapView;

  })(View);
});
