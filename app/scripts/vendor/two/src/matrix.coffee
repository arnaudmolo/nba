(->
  
  ###
  Constants
  ###
  range = _.range(6)
  cos = Math.cos
  sin = Math.sin
  tan = Math.tan
  
  ###
  Two.Matrix contains an array of elements that represent
  the two dimensional 3 x 3 matrix as illustrated below:
  
  =====
  a b c
  d e f
  g h i  // this row is not really used in 2d transformations
  =====
  
  String order is for transform strings: a, d, b, e, c, f
  
  @class
  ###
  Matrix = Two.Matrix = (a, b, c, d, e, f) ->
    @elements = new Two.Array(9)
    elements = a
    elements = _.toArray(arguments)  unless _.isArray(elements)
    
    # initialize the elements with default values.
    @identity().set elements

  _.extend Matrix,
    Identity: [1, 0, 0, 0, 1, 0, 0, 0, 1]
    
    ###
    Multiply two matrix 3x3 arrays
    ###
    Multiply: (A, B) ->
      if B.length <= 3 # Multiply Vector
        x = undefined
        y = undefined
        z = undefined
        a = B[0] or 0
        b = B[1] or 0
        c = B[2] or 0
        e = A
        
        # Go down rows first
        # a, d, g, b, e, h, c, f, i
        x = e[0] * a + e[1] * b + e[2] * c
        y = e[3] * a + e[4] * b + e[5] * c
        z = e[6] * a + e[7] * b + e[8] * c
        return (
          x: x
          y: y
          z: z
        )
      A0 = A[0]
      A1 = A[1]
      A2 = A[2]
      A3 = A[3]
      A4 = A[4]
      A5 = A[5]
      A6 = A[6]
      A7 = A[7]
      A8 = A[8]
      B0 = B[0]
      B1 = B[1]
      B2 = B[2]
      B3 = B[3]
      B4 = B[4]
      B5 = B[5]
      B6 = B[6]
      B7 = B[7]
      B8 = B[8]
      [A0 * B0 + A1 * B3 + A2 * B6, A0 * B1 + A1 * B4 + A2 * B7, A0 * B2 + A1 * B5 + A2 * B8, A3 * B0 + A4 * B3 + A5 * B6, A3 * B1 + A4 * B4 + A5 * B7, A3 * B2 + A4 * B5 + A5 * B8, A6 * B0 + A7 * B3 + A8 * B6, A6 * B1 + A7 * B4 + A8 * B7, A6 * B2 + A7 * B5 + A8 * B8]

  _.extend Matrix::,
    
    ###
    Takes an array of elements or the arguments list itself to
    set and update the current matrix's elements. Only updates
    specified values.
    ###
    set: (a, b, c, d, e, f) ->
      elements = a
      l = arguments.length
      elements = _.toArray(arguments)  unless _.isArray(elements)
      _.each elements, ((v, i) ->
        @elements[i] = v  if _.isNumber(v)
      ), this
      this

    
    ###
    Turn matrix to identity, like resetting.
    ###
    identity: ->
      @set Matrix.Identity
      this

    
    ###
    Multiply scalar or multiply by another matrix.
    ###
    multiply: (a, b, c, d, e, f, g, h, i) ->
      elements = arguments
      l = elements.length
      
      # Multiply scalar
      if l <= 1
        _.each @elements, ((v, i) ->
          @elements[i] = v * a
        ), this
        return this
      if l <= 3 # Multiply Vector
        x = undefined
        y = undefined
        z = undefined
        a = a or 0
        b = b or 0
        c = c or 0

        e = @elements
        
        # Go down rows first
        # a, d, g, b, e, h, c, f, i
        x = e[0] * a + e[1] * b + e[2] * c
        y = e[3] * a + e[4] * b + e[5] * c
        z = e[6] * a + e[7] * b + e[8] * c
        return (
          x: x
          y: y
          z: z
        )
      
      # Multiple matrix
      A = @elements
      B = elements
      A0 = A[0]
      A1 = A[1]
      A2 = A[2]

      A3 = A[3]
      A4 = A[4]
      A5 = A[5]

      A6 = A[6]
      A7 = A[7]
      A8 = A[8]

      B0 = B[0]
      B1 = B[1]
      B2 = B[2]

      B3 = B[3]
      B4 = B[4]
      B5 = B[5]

      B6 = B[6]
      B7 = B[7]
      B8 = B[8]

      @elements[0] = A0 * B0 + A1 * B3 + A2 * B6
      @elements[1] = A0 * B1 + A1 * B4 + A2 * B7
      @elements[2] = A0 * B2 + A1 * B5 + A2 * B8
      @elements[3] = A3 * B0 + A4 * B3 + A5 * B6
      @elements[4] = A3 * B1 + A4 * B4 + A5 * B7
      @elements[5] = A3 * B2 + A4 * B5 + A5 * B8
      @elements[6] = A6 * B0 + A7 * B3 + A8 * B6
      @elements[7] = A6 * B1 + A7 * B4 + A8 * B7
      @elements[8] = A6 * B2 + A7 * B5 + A8 * B8
      this

    
    ###
    Set a scalar onto the matrix.
    ###
    scale: (sx, sy) ->
      l = arguments.length
      sy = sx  if l <= 1
      @multiply sx, 0, 0, 0, sy, 0, 0, 0, 1

    
    ###
    Rotate the matrix.
    ###
    rotate: (radians) ->
      c = cos(radians)
      s = sin(radians)
      @multiply c, -s, 0, s, c, 0, 0, 0, 1

    
    ###
    Translate the matrix.
    ###
    translate: (x, y) ->
      @multiply 1, 0, x, 0, 1, y, 0, 0, 1

    
    #
    #     * Skew the matrix by an angle in the x axis direction.
    #     
    skewX: (radians) ->
      a = tan(radians)
      @multiply 1, a, 0, 0, 1, 0, 0, 0, 1

    
    #
    #     * Skew the matrix by an angle in the y axis direction.
    #     
    skewY: (radians) ->
      a = tan(radians)
      @multiply 1, 0, 0, a, 1, 0, 0, 0, 1

    
    ###
    Create a transform string to be used with rendering apis.
    ###
    toString: ->
      @toArray().join " "

    
    ###
    Create a transform array to be used with rendering apis.
    ###
    toArray: (fullMatrix) ->
      elements = @elements
      a = parseFloat(elements[0].toFixed(3))
      b = parseFloat(elements[1].toFixed(3))
      c = parseFloat(elements[2].toFixed(3))
      d = parseFloat(elements[3].toFixed(3))
      e = parseFloat(elements[4].toFixed(3))
      f = parseFloat(elements[5].toFixed(3))
      unless not fullMatrix
        g = parseFloat(elements[6].toFixed(3))
        h = parseFloat(elements[7].toFixed(3))
        i = parseFloat(elements[8].toFixed(3))
        return [a, d, g, b, e, h, c, f, i]
      [a, d, b, e, c, f] # Specific format see LN:19

    
    ###
    Clone the current matrix.
    ###
    clone: ->
      a = @elements[0]
      b = @elements[1]
      c = @elements[2]
      d = @elements[3]
      e = @elements[4]
      f = @elements[5]
      g = @elements[6]
      h = @elements[7]
      i = @elements[8]
      new Two.Matrix(a, b, c, d, e, f, g, h, i)

)()