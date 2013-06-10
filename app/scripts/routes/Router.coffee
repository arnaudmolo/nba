define ['backbone','goto'], ->
    class Router extends Backbone.Router
        routes:
            '':'init',
            'state/:name':'state'
            'stats/:name':'stats'
            'map':'map'
            'playoffs':'playoffs'
            'awards/:name':'awards'
            'players/:name':'players'
        state: (name)->
            window.mainView.goTo(name)
            $.scrollTo "#teams", 500, axis: 'y'
            window.transition = true
        init: ->

        stats: (name)->
            window.transition = true
            if window.transition
                window.mainView.goTo(window.mainView.stats(name).get('state'), zoom: window.transition, stats: true)
            else
                $.scrollTo "#stats", 1000,
                    axis: 'y'
                window.mainView.stats name
            window.mainView.menu.close()
        map:->
            $.scrollTo "#teams", 500,
                axis: 'y'
        playoffs: ->
            $.scrollTo "#playoffs", 500,
                axis: 'y'
        awards: (name)->
            if window.transition
                window.mainView.goTo(window.mainView.awards(name).get('state'), zoom: window.transition, stats: true)
            else
                window.mainView.awards(name)
        players: (name)->
            if window.transition
                window.mainView.goTo(window.mainView.players(name).get('state'), zoom: window.transition, stats: true)
            else
                window.mainView.players(name)