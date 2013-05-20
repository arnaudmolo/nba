exports.initialize = (app) ->
    new app.mongoose.Schema({

        name: String

        city: String

        state: String

        creation: Number

        years: {}

    });