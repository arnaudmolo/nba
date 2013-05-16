(->
  
  ###
  Constants
  ###
  min = Math.min
  max = Math.max
  round = Math.round
  Polygon = Two.Polygon = (vertices, closed, curved) ->
    Two.Shape.call this
    
    # Further getter setters for Polygon for closed and curved properties
    
    # Add additional logic for watching the vertices.
    closed = !!closed
    curved = !!curved
    beginning = 0.0
    ending = 1.0
    strokeChanged = false
    renderedVertices = vertices.slice(0)
    updateVertices = _.debounce(_.bind((property) -> # Call only once a frame.
      l = undefined
      ia = undefined
      ib = undefined
      last = undefined
      if strokeChanged
        l = @vertices.length
        last = l - 1
        ia = round((beginning) * last)
        ib = round((ending) * last)
        renderedVertices.length = 0
        i = ia

        while i < ib + 1
          v = @vertices[i]
          renderedVertices.push new Two.Vector(v.x, v.y)
          i++
      @trigger Two.Events.change, @id, "vertices", renderedVertices, closed, curved, strokeChanged
      strokeChanged = false
    , this), 0)
    Object.defineProperty this, "closed",
      get: ->
        closed

      set: (v) ->
        closed = !!v
        updateVertices()

    Object.defineProperty this, "curved",
      get: ->
        curved

      set: (v) ->
        curved = !!v
        updateVertices()

    Object.defineProperty this, "beginning",
      get: ->
        beginning

      set: (v) ->
        beginning = min(max(v, 0.0), 1.0)
        strokeChanged = true
        updateVertices()

    Object.defineProperty this, "ending",
      get: ->
        ending

      set: (v) ->
        ending = min(max(v, 0.0), 1)
        strokeChanged = true
        updateVertices()

    
    # At the moment cannot alter the array itself, just it's points.
    @vertices = vertices.slice(0)
    _.each @vertices, ((v) ->
      v.bind Two.Events.change, updateVertices
    ), this
    updateVertices()

  _.extend Polygon::, Two.Shape::,
    clone: ->
      points = _.map(@vertices, (v) ->
        new Two.Vector(v.x, v.y)
      )
      clone = new Polygon(points, @closed, @curved)
      _.each Two.Shape.Properties, ((k) ->
        clone[k] = this[k]
      ), this
      clone.translation.copy @translation
      clone.rotation = @rotation
      clone.scale = @scale
      clone

    center: ->
      rect = @getBoundingClientRect()
      rect.centroid =
        x: rect.left + rect.width / 2
        y: rect.top + rect.height / 2

      _.each @vertices, (v) ->
        v.subSelf rect.centroid

      @translation.addSelf rect.centroid
      this

    
    ###
    Remove self from the scene / parent.
    ###
    remove: ->
      return this  unless @parent
      @parent.remove this
      this

    getBoundingClientRect: ->
      border = @linewidth
      left = Infinity
      right = -Infinity
      top = Infinity
      bottom = -Infinity
      _.each @vertices, (v) ->
        x = v.x
        y = v.y
        top = Math.min(y, top)
        left = Math.min(x, left)
        right = Math.max(x, right)
        bottom = Math.max(y, bottom)

      
      # Expand borders
      top -= border
      left -= border
      right += border
      bottom += border
      ul = @_matrix.multiply(left, top, 1)
      ll = @_matrix.multiply(right, bottom, 1)
      top: ul.y
      left: ul.x
      right: ll.x
      bottom: ll.y
      width: ll.x - ul.x
      height: ll.y - ul.y

    
    # ray-casting algorithm based on http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
    # @src https://github.com/substack/point-in-polygon/blob/master/index.js
    #isPointInPolygon
    isPip: (point) ->
      x = point.x
      y = point.y
      offset = @translation
      inPoint = @vertices
      inside = false
      i = 0
      j = inPoint.length - 1

      while i < inPoint.length
        xi = inPoint[i].x + offset.x
        yi = inPoint[i].y + offset.y
        xj = inPoint[j].x + offset.x
        yj = inPoint[j].y + offset.y
        intersect = ((yi > y) isnt (yj > y)) and (x < (xj - xi) * (y - yi) / (yj - yi) + xi)
        inside = not inside  if intersect
        j = i++
      inside

)()