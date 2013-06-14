define ['text!templates/Menu.handlebars', 'view'], (templateString, View) ->
    class MenuView extends View
        initialize: ->
            @$el = $(@el)
            @sections = @$el.find('section')
            @mainToCompare = window.mainView.$el.find('>section')
            @update()
            @overlay = $('#overlay')
            return @
        update: ->
            t = @
            @sections.each (index, section)->
                section = $(section)
                section.height($(t.mainToCompare[index+1]).height())
        toggleMenu: ->
            @update()
            if @el.classList.contains 'open'
                @close()
            else
                @open()
        open: ->
            @overlay.addClass('show')
            @el.classList.add 'open'
            @$el.find('.open').removeClass('open').removeClass('double')
            t = @
            @$el.find('>ul>li>a').on 'click', (e)->
                t.double(this.parentElement.getElementsByTagName('ul')[0])
                return false
            $('#overlay').on 'mousedown', (e)->
                $(this).unbind 'mousedown'
                t.close()
        close: ->
            @overlay.removeClass('show')
            @$el.find('.show').removeClass('show')
            @$el.find('.open').removeClass('open')
            window.mainView.el.classList.remove 'open'
            @el.classList.remove 'show'
            @el.classList.remove 'open'