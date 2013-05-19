var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['text!templates/Stats.handlebars', 'backbone', 'view'], function(templateString, Backbone, View) {
  var StatsView, _ref;

  Handlebars.registerHelper("debug", function(optionalValue) {
    console.log(this);
    if (optionalValue) {
      return console.log(optionalValue);
    }
  });
  return StatsView = (function(_super) {
    __extends(StatsView, _super);

    function StatsView() {
      _ref = StatsView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    StatsView.prototype.initialize = function() {
      this.el = document.createElement('section');
      return this.listenTo(this.model, 'change', this.render);
    };

    StatsView.prototype.render = function() {
      var data, template;

      this.onRender();
      template = Handlebars.compile(templateString);
      data = {};
      if (typeof this.model !== 'undefined') {
        data = this.model.attributes;
      }
      this.el.innerHTML = template(data);
      this.onRendered();
      return this.el;
    };

    return StatsView;

  })(View);
});
