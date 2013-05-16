(->
  Group = Two.Group = (o) ->
    Two.Shape.call this, true
    delete @stroke
    delete @fill
    delete @linewidth
    delete @opacity
    delete @cap
    delete @join
    delete @miter

    Group.MakeGetterSetter this, Two.Shape.Properties
    @children = {}

  _.extend Group,
    MakeGetterSetter: (group, properties) ->
      properties = [properties]  unless _.isArray(properties)
      _.each properties, (k) ->
        secret = "_" + k
        Object.defineProperty group, k,
          get: ->
            this[secret]

          set: (v) ->
            this[secret] = v
            _.each @children, (child) -> # Trickle down styles
              child[k] = v




  _.extend Group::, Two.Shape::,
    
    ###
    Group has a gotcha in that it's at the moment required to be bound to
    an instance of two in order to add elements correctly. This needs to
    be rethought and fixed.
    ###
    clone: (parent) ->
      parent = parent or @parent
      children = _.map(@children, (child) ->
        child.clone parent
      )
      group = new Group()
      parent.add group
      group.add children
      group.translation.copy @translation
      group.rotation = @rotation
      group.scale = @scale
      group

    
    ###
    Anchors all children around the center of the group.
    ###
    center: ->
      rect = @getBoundingClientRect()
      rect.centroid =
        x: rect.left + rect.width / 2
        y: rect.top + rect.height / 2

      _.each @children, (child) ->
        child.translation.subSelf rect.centroid

      @translation.copy rect.centroid
      this

    
    ###
    Add an object to the group.
    ###
    add: (o) ->
      l = arguments_.length
      objects = o
      children = @children
      grandparent = @parent
      ids = []
      objects = _.toArray(arguments_)  unless _.isArray(o)
      
      # A bubbled up version of 'change' event for the children.
      broadcast = _.bind((id, property, value, closed, curved, strokeChanged) ->
        @trigger Two.Events.change, id, property, value, closed, curved, strokeChanged
      , this)
      
      # Add the objects
      _.each objects, ((object) ->
        id = object.id
        parent = object.parent
        if _.isUndefined(id)
          grandparent.add object
          id = object.id
        if _.isUndefined(children[id])
          
          # Release object from previous parent.
          delete parent.children[id]  if parent
          
          # Add it to this group and update parent-child relationship.
          children[id] = object
          object.parent = this
          object.unbind(Two.Events.change).bind Two.Events.change, broadcast
          ids.push id
      ), this
      @trigger Two.Events.change, @id, Two.Properties.hierarchy, ids  if ids.length > 0
      this

    
    # return this.center();
    
    ###
    Remove an object from the group.
    ###
    remove: (o) ->
      l = arguments_.length
      objects = o
      children = @children
      grandparent = @parent
      ids = []
      if l <= 0 and grandparent
        grandparent.remove this
        return this
      objects = _.toArray(arguments_)  unless _.isArray(o)
      _.each objects, (object) ->
        id = object.id
        grandchildren = object.children
        return  unless id of children
        delete children[id]

        object.unbind Two.Events.change
        ids.push id

      @trigger Two.Events.change, @id, Two.Properties.demotion, ids  if ids.length > 0
      this

    
    # return this.center();
    
    ###
    Return an object with top, left, right, bottom, width, and height
    parameters of the group.
    ###
    getBoundingClientRect: ->
      left = Infinity
      right = -Infinity
      top = Infinity
      bottom = -Infinity
      _.each @children, ((child) ->
        rect = child.getBoundingClientRect()
        top = Math.min(rect.top, top)
        left = Math.min(rect.left, left)
        right = Math.max(rect.right, right)
        bottom = Math.max(rect.bottom, bottom)
      ), this
      ul = @_matrix.multiply(left, top, 1)
      ll = @_matrix.multiply(right, bottom, 1)
      top: ul.y
      left: ul.x
      right: ll.x
      bottom: ll.y
      width: ll.x - ul.x
      height: ll.y - ul.y

    
    ###
    Trickle down of noFill
    ###
    noFill: ->
      _.each @children, (child) ->
        child.noFill()

      this

    
    ###
    Trickle down of noStroke
    ###
    noStroke: ->
      _.each @children, (child) ->
        child.noStroke()

      this

)()