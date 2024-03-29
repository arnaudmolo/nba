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
                    fieldsGoalsMade: 0
                    fieldsGoalsAttemped: 0
                    assists: 0
                    threePointsMade: 0
                    threePointsAttemped: 0
                    blocks: 0
                    fielsdGoalsPercent: 0
                    threePointsPercent: 0
        initialize: ->
        bottomBar: ->
            if @bottomBarView isnt undefined
                @bottomBarView = new BottomBarView model:@
            window.mainView.bottomBarElement.insertBefore @bottomBarView.render()
            t = @
            setTimeout ->
                t.bottomBarView.el.classList.add 'show'
            , 3
            window.mainView.bottomBarModels.push(@)
        bottomBarRemove: ->
            @bottomBarView.remove()
        render: ->
            if @get('sluggedName') isnt window.temp.showedTeam
                window.temp.showedTeam = @get('sluggedName')
                @statsView = new StatsView model:@
                $("#stats").empty().prepend @statsView.render()
        stats: ->
            @render()
            @statsView.data()
            return @
        awards: ->
            @render()
            @statsView.awards()
        players: ->
            @render()
            @statsView.players()
        compare: ->
            @render()
            @statsView.compare()