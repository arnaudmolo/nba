var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['lodash'], function(_) {
  var Utils, _ref;

  console.log("coucou");
  return Utils = (function(_super) {
    __extends(Utils, _super);

    function Utils() {
      _ref = Utils.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    return Utils;

  })(_);
});
