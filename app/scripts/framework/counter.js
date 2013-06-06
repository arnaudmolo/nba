(function($) {
  var enterValue;

  $.fn.countTo = function(options) {
    var increment, loops;

    options = $.extend({}, $.fn.countTo.defaults, options || {});
    loops = Math.ceil(options.speed / options.refreshInterval);
    increment = (options.to - options.from) / loops;
    return $(this).each(function() {
      var interval, loopCount, updateTimer, value, _this;

      _this = this;
      loopCount = 0;
      value = options.from;
      updateTimer = function() {
        value += increment;
        loopCount++;
        enterValue.call(_this, value.toFixed(options.decimals));
        $(_this).html(value.toFixed(options.decimals));
        if (typeof options.onUpdate === "function") {
          options.onUpdate.call(_this, value);
        }
        if (loopCount >= loops) {
          clearInterval(interval);
          value = options.to;
          if (typeof options.onComplete === "function") {
            return options.onComplete.call(_this, value);
          }
        }
      };
      return interval = setInterval(updateTimer, options.refreshInterval);
    });
  };
  enterValue = function(val) {
    if (this.tagName === 'INPUT') {
      return $(this).val(val).trigger('change');
    } else {
      return $(this).html(val);
    }
  };
  return $.fn.countTo.defaults = {
    from: 0,
    to: 100,
    speed: 1000,
    refreshInterval: 100,
    decimals: 0,
    onUpdate: null,
    onComplete: null
  };
})(jQuery);
