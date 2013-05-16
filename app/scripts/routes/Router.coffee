define ['backbone'], ->
	class Router extends Backbone.Router
		routes:
			'':'init',
			'/state/:name':'state'
		state: (name)->
			console.log name
		init: ->
			console.log 'init'