define ['text!templates/Menu.handlebars', 'view'], (templateString, View) ->
    class MenuView extends View
        initialize: ->
            @$el = $(@el)
            return @
        toggleMenu: ->
            if @el.classList.contains 'open'
                @close()
            else
                @open()
        open: ->
            window.mainView.el.classList.add 'open'
            @el.classList.add 'open'
            @$el.find('.open').removeClass('open').removeClass('double')
            t = @
            console.log 'open'
            console.log @el
            @$el.find('>ul>li>a').on 'click', (e)->
                t.double(this.parentElement.getElementsByTagName('ul')[0])
                return false
            $('#main').on 'mousedown', (e)->
                $(this).unbind 'mousedown'
                t.close()
        close: ->
            @$el.find('.show').removeClass('show')
            @$el.find('.open').removeClass('open')
            @$el.find('.double').removeClass('double')
            window.mainView.el.classList.remove 'double'
            window.mainView.el.classList.remove 'open'
            @el.classList.remove 'show'
            @el.classList.remove 'open'
            @el.classList.remove 'double'
        double: (el)->
            console.log 'double'
            @$el.find('.show').removeClass('show')
            el.classList.add 'show'
            window.mainView.el.classList.add 'double'
            @el.classList.add 'double'
