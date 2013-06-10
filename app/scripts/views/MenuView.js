var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['text!templates/Menu.handlebars', 'view'], function(templateString, View) {
  var MenuView, _ref;

  return MenuView = (function(_super) {
    __extends(MenuView, _super);

    function MenuView() {
      _ref = MenuView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    MenuView.prototype.initialize = function() {
      this.$el = $(this.el);
      return this;
    };

    MenuView.prototype.toggleMenu = function() {
      if (this.el.classList.contains('open')) {
        return this.close();
      } else {
        return this.open();
      }
    };

    MenuView.prototype.open = function() {
      var t;

      window.mainView.el.classList.add('open');
      this.el.classList.add('open');
      this.$el.find('.open').removeClass('open').removeClass('double');
      t = this;
      console.log('open');
      console.log(this.el);
      this.$el.find('>ul>li>a').on('click', function(e) {
        t.double(this.parentElement.getElementsByTagName('ul')[0]);
        return false;
      });
      return $('#main').on('mousedown', function(e) {
        $(this).unbind('mousedown');
        return t.close();
      });
    };

    MenuView.prototype.close = function() {
      this.$el.find('.show').removeClass('show');
      this.$el.find('.open').removeClass('open');
      this.$el.find('.double').removeClass('double');
      window.mainView.el.classList.remove('double');
      window.mainView.el.classList.remove('open');
      this.el.classList.remove('show');
      this.el.classList.remove('open');
      return this.el.classList.remove('double');
    };

    MenuView.prototype.double = function(el) {
      console.log('double');
      this.$el.find('.show').removeClass('show');
      el.classList.add('show');
      window.mainView.el.classList.add('double');
      return this.el.classList.add('double');
    };

    return MenuView;

  })(View);
});
