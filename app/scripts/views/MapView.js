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

    MapView.prototype.initialize = function() {};

    MapView.prototype.map = document.getElementById('map');

    MapView.prototype.createMap = function() {
      var two, _this;

      if (this.svgMap !== void 0) {
        return this;
      }
      two = new Two({
        width: "100%",
        height: "70%"
      }).appendTo(this.map);
      _this = this;
      $.ajax({
        url: "/img/usa_map.svg",
        async: true,
        success: function(doc) {
          _this.svgMap = two.interpret($(doc).find("svg")[0]);
          _.each(_this.svgMap.children[2].children, function(elem) {
            if (elem instanceof Two.Group) {
              return elem.bind("mousedown", function() {
                return window.router.navigate('//' + this.dataId, {
                  trigger: true
                });
              });
            }
          });
          two.update();
          return window.mainView.loaded();
        }
      });
      return this;
    };

    return MapView;

  })(View);
});
