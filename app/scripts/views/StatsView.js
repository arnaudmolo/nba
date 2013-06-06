var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['text!templates/Stats.handlebars', 'backbone', 'view', './PlayerView'], function(templateString, Backbone, View, PlayerView) {
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

    StatsView.prototype.events = {
      'click .changePlayer a.best-ever': 'bestEver',
      'click .changePlayer a.best-year': 'bestYear'
    };

    StatsView.prototype.initialize = function() {
      this.el = document.createElement('section');
      this.$el = $(this.el);
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
      this.toHide = this.$el.find('#awards, #data, #players');
      this.onRendered();
      return this.el;
    };

    StatsView.prototype.menuNav = function(index) {
      var nav;

      nav = this.$el.find('>nav.navigation a');
      nav.removeClass('active');
      return nav[index].classList.add('active');
    };

    StatsView.prototype.data = function() {
      this.toHide.addClass('hidden').addClass('transition');
      this.$el.find('#data').removeClass('hidden').find('.center.navigation a');
      return this.menuNav(0);
    };

    StatsView.prototype.awards = function() {
      var show;

      this.toHide.addClass('hidden');
      show = this.$el.find('#awards').removeClass('hidden');
      this.menuNav(1);
      return show.on('webkitTransitionEnd', function() {
        this.classList.remove('transition');
        return $(this).unbind('webkitTransitionEnd');
      });
    };

    StatsView.prototype.players = function() {
      if (this.playerView === void 0) {
        this.playerView = new PlayerView({
          model: this.model.get('players')[0],
          el: this.$el.find('.player')[0]
        });
      }
      this.$el.find('.changePlayer a.best-ever').addClass('active');
      this.$el.find('.changePlayer a.best-year').removeClass('active');
      this.playerView.render();
      this.toHide.addClass('hidden').addClass('transition');
      this.$el.find('#players').removeClass('hidden');
      return this.menuNav(2);
    };

    StatsView.prototype.bestEver = function(e) {
      e.preventDefault();
      this.$el.find('.changePlayer a.best-ever').addClass('active');
      this.$el.find('.changePlayer a.best-year').removeClass('active');
      return this.playerView.changePlayer(this.model.get('players')[0]);
    };

    StatsView.prototype.bestYear = function(e) {
      e.preventDefault();
      this.$el.find('.changePlayer a.best-year').addClass('active');
      this.$el.find('.changePlayer a.best-ever').removeClass('active');
      return this.playerView.changePlayer(this.model.get('players')[1]);
    };

    return StatsView;

  })(View);
});
