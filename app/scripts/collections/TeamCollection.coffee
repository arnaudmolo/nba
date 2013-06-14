define ["./../models/Team"], (Team) ->
    class TeamCollection extends Backbone.Collection
        model: Team
        url: 'http://localhost:9898/team'