(function() {
  /*
  Constants
  */

  var Polygon, max, min, round;

  min = Math.min;
  max = Math.max;
  round = Math.round;
  Polygon = Two.Polygon = function(vertices, closed, curved) {
    var beginning, ending, renderedVertices, strokeChanged, updateVertices;

    Two.Shape.call(this);
    closed = !!closed;
    curved = !!curved;
    beginning = 0.0;
    ending = 1.0;
    strokeChanged = false;
    renderedVertices = vertices.slice(0);
    updateVertices = _.debounce(_.bind(function(property) {
      var i, ia, ib, l, last, v;

      l = void 0;
      ia = void 0;
      ib = void 0;
      last = void 0;
      if (strokeChanged) {
        l = this.vertices.length;
        last = l - 1;
        ia = round(beginning * last);
        ib = round(ending * last);
        renderedVertices.length = 0;
        i = ia;
        while (i < ib + 1) {
          v = this.vertices[i];
          renderedVertices.push(new Two.Vector(v.x, v.y));
          i++;
        }
      }
      this.trigger(Two.Events.change, this.id, "vertices", renderedVertices, closed, curved, strokeChanged);
      return strokeChanged = false;
    }, this), 0);
    Object.defineProperty(this, "closed", {
      get: function() {
        return closed;
      },
      set: function(v) {
        closed = !!v;
        return updateVertices();
      }
    });
    Object.defineProperty(this, "curved", {
      get: function() {
        return curved;
      },
      set: function(v) {
        curved = !!v;
        return updateVertices();
      }
    });
    Object.defineProperty(this, "beginning", {
      get: function() {
        return beginning;
      },
      set: function(v) {
        beginning = min(max(v, 0.0), 1.0);
        strokeChanged = true;
        return updateVertices();
      }
    });
    Object.defineProperty(this, "ending", {
      get: function() {
        return ending;
      },
      set: function(v) {
        ending = min(max(v, 0.0), 1);
        strokeChanged = true;
        return updateVertices();
      }
    });
    this.vertices = vertices.slice(0);
    _.each(this.vertices, (function(v) {
      return v.bind(Two.Events.change, updateVertices);
    }), this);
    return updateVertices();
  };
  return _.extend(Polygon.prototype, Two.Shape.prototype, {
    clone: function() {
      var clone, points;

      points = _.map(this.vertices, function(v) {
        return new Two.Vector(v.x, v.y);
      });
      clone = new Polygon(points, this.closed, this.curved);
      _.each(Two.Shape.Properties, (function(k) {
        return clone[k] = this[k];
      }), this);
      clone.translation.copy(this.translation);
      clone.rotation = this.rotation;
      clone.scale = this.scale;
      return clone;
    },
    center: function() {
      var rect;

      rect = this.getBoundingClientRect();
      rect.centroid = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      };
      _.each(this.vertices, function(v) {
        return v.subSelf(rect.centroid);
      });
      this.translation.addSelf(rect.centroid);
      return this;
    },
    /*
    Remove self from the scene / parent.
    */

    remove: function() {
      if (!this.parent) {
        return this;
      }
      this.parent.remove(this);
      return this;
    },
    getBoundingClientRect: function() {
      var border, bottom, left, ll, right, top, ul;

      border = this.linewidth;
      left = Infinity;
      right = -Infinity;
      top = Infinity;
      bottom = -Infinity;
      _.each(this.vertices, function(v) {
        var x, y;

        x = v.x;
        y = v.y;
        top = Math.min(y, top);
        left = Math.min(x, left);
        right = Math.max(x, right);
        return bottom = Math.max(y, bottom);
      });
      top -= border;
      left -= border;
      right += border;
      bottom += border;
      ul = this._matrix.multiply(left, top, 1);
      ll = this._matrix.multiply(right, bottom, 1);
      return {
        top: ul.y,
        left: ul.x,
        right: ll.x,
        bottom: ll.y,
        width: ll.x - ul.x,
        height: ll.y - ul.y
      };
    },
    isPip: function(point) {
      var i, inPoint, inside, intersect, j, offset, x, xi, xj, y, yi, yj;

      x = point.x;
      y = point.y;
      offset = this.translation;
      inPoint = this.vertices;
      inside = false;
      i = 0;
      j = inPoint.length - 1;
      while (i < inPoint.length) {
        xi = inPoint[i].x + offset.x;
        yi = inPoint[i].y + offset.y;
        xj = inPoint[j].x + offset.x;
        yj = inPoint[j].y + offset.y;
        intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) {
          inside = !inside;
        }
        j = i++;
      }
      return inside;
    }
  });
})();
