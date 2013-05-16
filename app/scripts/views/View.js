var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['text!templates/Application.handlebars', 'backbone', 'two'], function(templateString, Backbone, Two) {
  var ApplicationView, _ref;

  return ApplicationView = (function(_super) {
    __extends(ApplicationView, _super);

    function ApplicationView() {
      _ref = ApplicationView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    ApplicationView.prototype.initialize = function() {};

    ApplicationView.prototype.onRender = function() {};

    ApplicationView.prototype.onRendered = function() {};

    ApplicationView.prototype.onClose = function() {};

    ApplicationView.prototype.onClosed = function() {};

    ApplicationView.prototype.close = function(removeElement) {
      if (removeElement == null) {
        removeElement = false;
      }
      if (this.onClose) {
        this.onClose();
      }
      this.undelegateEvents();
      this.$el.removeData().unbind();
      this.$el.empty();
      if (removeElement) {
        this.remove();
      }
      if (this.onClosed) {
        return this.onClosed();
      }
    };

    ApplicationView.prototype.render = function() {
      var data, template;

      this.onRender();
      template = Handlebars.compile(templateString);
      data = {};
      if (typeof this.model !== 'undefined') {
        data = this.model.attributes;
      }
      $(this.el).empty().append(template(data));
      return this.onRendered();
    };

    return ApplicationView;

  })(Backbone.View);
});
