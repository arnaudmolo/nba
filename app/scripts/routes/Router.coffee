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
            'the-team': 'theTeam'
            'compare/:name': 'compare'
        state: (name)->
            window.mainView.goTo(name)
            $.scrollTo "#teams", 500, axis: 'y'
            window.transition = true
        init: ->

        stats: (name)->
            window.mainView.goTo(window.mainView.stats(name).get('state'), zoom: window.transition, stats: true)
        map:->
            $.scrollTo "#teams", 500,
                axis: 'y'
        playoffs: ->
            $.scrollTo "#playoffs-style", 500,
                axis: 'y'
        awards: (name)->
            window.mainView.goTo(window.mainView.awards(name).get('state'), zoom: window.transition, stats: true)
        players: (name)->
            window.mainView.goTo(window.mainView.players(name).get('state'), zoom: window.transition, stats: true)
        theTeam: ->
            $.scrollTo "#the-team", 500,
                axis: 'y'
        compare: (name)->
            window.mainView.goTo(window.mainView.compare(name).get('state'), zoom: window.transition, stats: true)