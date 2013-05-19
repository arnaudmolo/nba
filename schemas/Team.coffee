exports.initialize = (app) ->
    new app.mongoose.Schema({

        name: String

        city: String

        state: String

        creation: Number

        years: {}
            # 'Number':
            #     players: Array
                
            #     points: Number

            #     rebounds: Number

            #     fieldsGoalsMade: Number

            #     fieldsGoalsAttemped: Number

            #     assists: Number #Total assist

            #     freeThrow: Number

            #     threePointsMade: Number

            #     threePointsAttemped: Number

            #     blocks: Number

        # points: Number

        # rebounds: Number

        # fieldsGoalsMade: Number

        # fieldsGoalsAttemped: Number

        # assists: Number #Total assist

        # freeThrow: Number

        # threePointsMade: Number

        # threePointsAttemped: Number

        # blocks: Number

    });