define ['backbone', '.././views/BottomBarView', '.././views/StatsView'], (Backbone, BottomBarView, StatsView) ->
    class Team extends Backbone.Model
        idAttribute: "_id"
        bottomBarView: null
        statsView: null
        defaults:
            name: ""
            city: ""
            creation: 0
            years:
                '':
                    players: []
                    points: 0
                    rebounds: 0
                    fieldGoalsMade: 0
                    fieldGoalsAttemped: 0
                    assists: 0
                    threePointsMade: 0
                    threePointsAttemped: 0
                    blocks: 0
        initialize: ->
            console.log "coucou"
            _.each @get('years'), (year)->
                year.fieldGoalsPercent = year.fieldGoalsMade / year.fieldGoalsAttemped * 100
                year.threePointsPercent = year.threePointsMade / year.threePointsAttemped * 100
        
        bottomBar: ->
        
            if @bottomBarView is null
                @bottomBarView = new BottomBarView(model:@)
            window.mainView.bottomBarElement.insertBefore(@bottomBarView.render())
            @bottomBarView.el.classList.add('show')
        
        stats: ->
            window.mainView.resetMap();

            if @statsView is null
                @statsView = new StatsView({model:@})
        
            $("#stats").empty().prepend(@statsView.render())
        
            @