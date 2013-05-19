var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['text!templates/BottomBar.handlebars', 'backbone', 'view', 'two'], function(templateString, Backbone, View) {
  var BottomBarView, _ref;

  return BottomBarView = (function(_super) {
    __extends(BottomBarView, _super);

    function BottomBarView() {
      _ref = BottomBarView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    BottomBarView.prototype.initialize = function() {
      this.el = document.createElement('a');
      this.el.href = "#/stats/" + this.model.get('name');
      return this.listenTo(this.model, 'change', this.render);
    };

    BottomBarView.prototype.render = function() {
      var data, template;

      this.onRender();
      template = Handlebars.compile(templateString);
      this.data = {};
      if (typeof this.model !== 'undefined') {
        data = this.model.attributes;
      }
      this.el.innerHTML = template(data);
      this.onRendered();
      return this.el;
    };

    return BottomBarView;

  })(View);
});
