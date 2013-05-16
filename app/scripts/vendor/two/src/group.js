(function() {
  var Group;

  Group = Two.Group = function(o) {
    Two.Shape.call(this, true);
    delete this.stroke;
    delete this.fill;
    delete this.linewidth;
    delete this.opacity;
    delete this.cap;
    delete this.join;
    delete this.miter;
    Group.MakeGetterSetter(this, Two.Shape.Properties);
    return this.children = {};
  };
  _.extend(Group, {
    MakeGetterSetter: function(group, properties) {
      if (!_.isArray(properties)) {
        properties = [properties];
      }
      return _.each(properties, function(k) {
        var secret;

        secret = "_" + k;
        return Object.defineProperty(group, k, {
          get: function() {
            return this[secret];
          },
          set: function(v) {
            this[secret] = v;
            return _.each(this.children, function(child) {
              return child[k] = v;
            });
          }
        });
      });
    }
  });
  return _.extend(Group.prototype, Two.Shape.prototype, {
    /*
    Group has a gotcha in that it's at the moment required to be bound to
    an instance of two in order to add elements correctly. This needs to
    be rethought and fixed.
    */

    clone: function(parent) {
      var children, group;

      parent = parent || this.parent;
      children = _.map(this.children, function(child) {
        return child.clone(parent);
      });
      group = new Group();
      parent.add(group);
      group.add(children);
      group.translation.copy(this.translation);
      group.rotation = this.rotation;
      group.scale = this.scale;
      return group;
    },
    /*
    Anchors all children around the center of the group.
    */

    center: function() {
      var rect;

      rect = this.getBoundingClientRect();
      rect.centroid = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      };
      _.each(this.children, function(child) {
        return child.translation.subSelf(rect.centroid);
      });
      this.translation.copy(rect.centroid);
      return this;
    },
    /*
    Add an object to the group.
    */

    add: function(o) {
      var broadcast, children, grandparent, ids, l, objects;

      l = arguments_.length;
      objects = o;
      children = this.children;
      grandparent = this.parent;
      ids = [];
      if (!_.isArray(o)) {
        objects = _.toArray(arguments_);
      }
      broadcast = _.bind(function(id, property, value, closed, curved, strokeChanged) {
        return this.trigger(Two.Events.change, id, property, value, closed, curved, strokeChanged);
      }, this);
      _.each(objects, (function(object) {
        var id, parent;

        id = object.id;
        parent = object.parent;
        if (_.isUndefined(id)) {
          grandparent.add(object);
          id = object.id;
        }
        if (_.isUndefined(children[id])) {
          if (parent) {
            delete parent.children[id];
          }
          children[id] = object;
          object.parent = this;
          object.unbind(Two.Events.change).bind(Two.Events.change, broadcast);
          return ids.push(id);
        }
      }), this);
      if (ids.length > 0) {
        this.trigger(Two.Events.change, this.id, Two.Properties.hierarchy, ids);
      }
      return this;
    },
    /*
    Remove an object from the group.
    */

    remove: function(o) {
      var children, grandparent, ids, l, objects;

      l = arguments_.length;
      objects = o;
      children = this.children;
      grandparent = this.parent;
      ids = [];
      if (l <= 0 && grandparent) {
        grandparent.remove(this);
        return this;
      }
      if (!_.isArray(o)) {
        objects = _.toArray(arguments_);
      }
      _.each(objects, function(object) {
        var grandchildren, id;

        id = object.id;
        grandchildren = object.children;
        if (!(id in children)) {
          return;
        }
        delete children[id];
        object.unbind(Two.Events.change);
        return ids.push(id);
      });
      if (ids.length > 0) {
        this.trigger(Two.Events.change, this.id, Two.Properties.demotion, ids);
      }
      return this;
    },
    /*
    Return an object with top, left, right, bottom, width, and height
    parameters of the group.
    */

    getBoundingClientRect: function() {
      var bottom, left, ll, right, top, ul;

      left = Infinity;
      right = -Infinity;
      top = Infinity;
      bottom = -Infinity;
      _.each(this.children, (function(child) {
        var rect;

        rect = child.getBoundingClientRect();
        top = Math.min(rect.top, top);
        left = Math.min(rect.left, left);
        right = Math.max(rect.right, right);
        return bottom = Math.max(rect.bottom, bottom);
      }), this);
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
    /*
    Trickle down of noFill
    */

    noFill: function() {
      _.each(this.children, function(child) {
        return child.noFill();
      });
      return this;
    },
    /*
    Trickle down of noStroke
    */

    noStroke: function() {
      _.each(this.children, function(child) {
        return child.noStroke();
      });
      return this;
    }
  });
})();
