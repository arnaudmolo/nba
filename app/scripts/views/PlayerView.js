var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['text!templates/Player.handlebars', 'view', '../framework/jquery.knob', '../framework/counter'], function(templateString, View) {
  var PlayerView, _ref;

  return PlayerView = (function(_super) {
    __extends(PlayerView, _super);

    function PlayerView() {
      _ref = PlayerView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    PlayerView.prototype.initialize = function() {};

    PlayerView.prototype.render = function() {
      var data, html, template;

      this.onRender();
      template = Handlebars.compile(templateString);
      data = {};
      if (typeof this.model !== 'undefined') {
        data = this.model;
      }
      html = template(data);
      this.el.innerHTML = html;
      this.$el.find('.dial input').knob({
        angleOffset: 180,
        width: 180,
        readOnly: true,
        thickness: 0.2
      });
      this.onRendered();
      return this.el;
    };

    PlayerView.prototype.onRendered = function() {
      return this.$el.find('.counter').each(function(i, e) {
        var $this, val;

        $this = $(this);
        val = $this.html() || $this.val();
        val = parseFloat(val);
        return $this.countTo({
          from: 0,
          to: val,
          speed: 1000,
          refreshInterval: 20
        });
      });
    };

    PlayerView.prototype.changePlayer = function(player) {
      var html, insert, template;

      this.$el.find('.counter').each(function(i, e) {
        var $this, corres, val;

        $this = $(this);
        val = $this.html() || $this.val();
        val = parseFloat(val);
        corres = player[$this.attr('data-prop')];
        return $(this).countTo({
          to: corres,
          from: val,
          speed: 1000,
          refreshInterval: 20
        });
      });
      template = Handlebars.compile(templateString);
      html = $(template(player));
      insert = html.find('.infos').html();
      return console.log(this.$el.find('.infos').html(insert));
    };

    return PlayerView;

  })(View);
});
