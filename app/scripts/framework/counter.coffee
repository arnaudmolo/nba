(($) ->
    $.fn.countTo = (options) ->
        
        # merge the default plugin settings with the custom options
        options = $.extend({}, $.fn.countTo.defaults, options or {})
        
        # how many times to update the value, and how much to increment the value on each update
        loops = Math.ceil(options.speed / options.refreshInterval)
        increment = (options.to - options.from) / loops
        $(this).each ->
            _this = this
            loopCount = 0
            value = options.from
            updateTimer = ->
                value += increment
                loopCount++
                enterValue.call(_this, value.toFixed(options.decimals))
                $(_this).html value.toFixed(options.decimals)
                options.onUpdate.call _this, value    if typeof (options.onUpdate) is "function"
                if loopCount >= loops
                    clearInterval interval
                    value = options.to
                    options.onComplete.call _this, value    if typeof (options.onComplete) is "function"
            interval = setInterval(updateTimer, options.refreshInterval)

    enterValue= (val)->
        if @tagName is 'INPUT'
            $(@).val(val).trigger('change')
        else
            $(@).html val

    $.fn.countTo.defaults =
        from: 0 # the number the element should start at
        to: 100 # the number the element should end at
        speed: 1000 # how long it should take to count between the target numbers
        refreshInterval: 100 # how often the element should be updated
        decimals: 0 # the number of decimal places to show
        onUpdate: null # callback method for every time the element is updated,
        onComplete: null # callback method for when the element finishes updating
) jQuery