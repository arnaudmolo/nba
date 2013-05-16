define [], () ->
    class Team extends Backbone.Model
        idAttribute: "_id"
        defaults:
            name: ""
            city: ""
            players: []
            points: 0
        bottomBar: ->
            console.log "OUI"