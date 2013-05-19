define ['backbone','goto'], ->
    class Router extends Backbone.Router
        routes:
            '':'init',
            'state/:name':'state'
            'stats/:name':'stats'
            'map':'map'
        state: (name)->
            window.mainView.goTo(name)
            $.scrollTo "#bottom-bar", 500
        init: ->

        stats: (name)->
            window.mainView.goTo(window.mainView.stats(name).get('state'), {zoom: false})
            $.scrollTo "#stats", 500
        map:->
            $.scrollTo "#map", 500