var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['text!templates/Stats.handlebars', 'backbone', 'view', './PlayerView', './DataView', './CompareView'], function(templateString, Backbone, View, PlayerView, DataView, CompareView) {
  var StatsView, _ref;

  Handlebars.registerHelper("debug", function(optionalValue) {
    console.log('debug', this);
    console.log(optionalValue);
    if (optionalValue) {
      return console.log(optionalValue);
    }
  });
  Handlebars.registerHelper("ifCond", function(v1, operator, v2, options) {
    switch (operator) {
      case "==":
        return (v1 === v2 ? options.fn(this) : options.inverse(this));
      case "===":
        return (v1 === v2 ? options.fn(this) : options.inverse(this));
      case "<":
        return (v1 < v2 ? options.fn(this) : options.inverse(this));
      case "<=":
        return (v1 <= v2 ? options.fn(this) : options.inverse(this));
      case ">":
        return (v1 > v2 ? options.fn(this) : options.inverse(this));
      case ">=":
        return (v1 >= v2 ? options.fn(this) : options.inverse(this));
      default:
        return options.inverse(this);
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
      this.listenTo(this.model, 'change', this.render);
      this.parent = $("#stats-style");
      return this.parent.addClass('show');
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
      this.toHide = this.$el.find('#awards, #data, #players, #compare');
      this.onRendered();
      return this.el;
    };

    StatsView.prototype.onRendered = function() {
      return this.parent.addClass('rendered');
    };

    StatsView.prototype.menuNav = function(index) {
      var nav;

      nav = this.$el.find('>nav.navigation a');
      nav.removeClass('active');
      return nav[index].classList.add('active');
    };

    StatsView.prototype.data = function() {
      var show;

      if (this.dataView === void 0) {
        this.dataView = new DataView({
          model: this.model,
          el: $("#data")[0]
        });
      }
      show = this.$el.find('#data');
      this.toHide.not(show).addClass('hidden');
      show.removeClass('hidden');
      this.menuNav(0);
      return this.parent.attr('data-url', 'stats/' + this.model.get('sluggedName'));
    };

    StatsView.prototype.awards = function() {
      var show;

      show = this.$el.find('#awards');
      this.toHide.not(show).addClass('hidden');
      show.removeClass('hidden');
      this.menuNav(1);
      return this.parent.attr('data-url', 'awards/' + this.model.get('sluggedName'));
    };

    StatsView.prototype.players = function() {
      var show;

      if (this.playerView === void 0) {
        this.playerView = new PlayerView({
          model: this.model.get('players')[0],
          el: this.$el.find('.player')[0]
        });
      }
      this.$el.find('.changePlayer a.best-ever').addClass('active');
      this.$el.find('.changePlayer a.best-year').removeClass('active');
      this.playerView.render();
      show = this.$el.find('#players');
      this.toHide.not(show).addClass('hidden');
      show.removeClass('hidden');
      this.menuNav(2);
      return this.parent.attr('data-url', 'players/' + this.model.get('sluggedName'));
    };

    StatsView.prototype.compare = function() {
      var compare;

      compare = $(document.getElementById('compare'));
      if (this.compareView === void 0) {
        this.compareView = new CompareView({
          model: this.model,
          el: compare
        });
      }
      this.toHide.not(compare).addClass('hidden');
      compare.removeClass('hidden');
      this.menuNav(3);
      return this.compareView.render();
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
