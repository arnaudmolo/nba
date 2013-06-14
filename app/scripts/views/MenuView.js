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
      this.sections = this.$el.find('section');
      this.mainToCompare = window.mainView.$el.find('>section');
      this.update();
      this.overlay = $('#overlay');
      return this;
    };

    MenuView.prototype.update = function() {
      var t;

      t = this;
      return this.sections.each(function(index, section) {
        section = $(section);
        return section.height($(t.mainToCompare[index + 1]).height());
      });
    };

    MenuView.prototype.toggleMenu = function() {
      this.update();
      if (this.el.classList.contains('open')) {
        return this.close();
      } else {
        return this.open();
      }
    };

    MenuView.prototype.open = function() {
      var t;

      this.overlay.addClass('show');
      this.el.classList.add('open');
      this.$el.find('.open').removeClass('open').removeClass('double');
      t = this;
      this.$el.find('>ul>li>a').on('click', function(e) {
        t.double(this.parentElement.getElementsByTagName('ul')[0]);
        return false;
      });
      return $('#overlay').on('mousedown', function(e) {
        $(this).unbind('mousedown');
        return t.close();
      });
    };

    MenuView.prototype.close = function() {
      this.overlay.removeClass('show');
      this.$el.find('.show').removeClass('show');
      this.$el.find('.open').removeClass('open');
      window.mainView.el.classList.remove('open');
      this.el.classList.remove('show');
      return this.el.classList.remove('open');
    };

    return MenuView;

  })(View);
});
