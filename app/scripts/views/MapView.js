var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['backbone', 'view', 'd3'], function(Backbone, View, ignore) {
  var MapView, _ref;

  return MapView = (function(_super) {
    __extends(MapView, _super);

    function MapView() {
      _ref = MapView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    MapView.prototype.width = function() {
      return $(window).width();
    };

    MapView.prototype.height = 360;

    MapView.prototype.initialize = function() {};

    MapView.prototype.update = function() {
      this.svg.attr('width', this.width());
      this.rect.attr('width', this.width());
      return this.zoom();
    };

    MapView.prototype.zoom = function(d) {
      var centered, centroid, k, path, translation, width, x, y;

      x = void 0;
      y = void 0;
      k = void 0;
      width = this.width();
      if (d && centered !== d) {
        path = d3.geo.path();
        centroid = path.centroid(d);
        x = centroid[0];
        y = centroid[1];
        k = 2;
        centered = d;
        this.svgMap.transition().duration(1000).attr("transform", "translate(" + width / 2 + "," + this.height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")").style("stroke-width", 1.5 / k + "px");
      } else {
        k = 0.73;
        centered = null;
        translation = width / 2;
        translation = translation - 305;
        this.svgMap.transition().duration(1000).attr('transform', 'translate(' + translation + ", 0)scale(" + k + ")");
      }
      return this.svgMap.selectAll("path").classed("active", centered && function(d) {
        return d === centered;
      });
    };

    MapView.prototype.createMap = function() {
      var click, g, path;

      if (this.svgMap !== void 0) {
        return this;
      }
      click = function(d) {
        console.log(d);
        window.mainView.map.zoom(d);
        if (d !== void 0) {
          return window.router.navigate('#/state/' + d.properties.name);
        }
      };
      path = d3.geo.path();
      this.svg = d3.select("#map").append("svg").attr("width", this.width()).attr("height", this.height);
      this.rect = this.svg.append("rect");
      this.rect.attr("class", "background").attr("width", this.width()).attr("height", this.height).attr('visible', 'hidden').on("click", click, this);
      this.svgMap = g = this.svg.append("g").attr("id", "states");
      d3.json("readme.json", function(json) {
        g.selectAll("path").data(json.features).enter().append("path").attr("d", path).on("click", click);
        window.mainView.loaded();
        return click();
      });
      return this;
    };

    return MapView;

  })(View);
});
