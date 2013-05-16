(function() {
  /*
  Constants
  */

  var Matrix, cos, range, sin, tan;

  range = _.range(6);
  cos = Math.cos;
  sin = Math.sin;
  tan = Math.tan;
  /*
  Two.Matrix contains an array of elements that represent
  the two dimensional 3 x 3 matrix as illustrated below:
  
  =====
  a b c
  d e f
  g h i  // this row is not really used in 2d transformations
  =====
  
  String order is for transform strings: a, d, b, e, c, f
  
  @class
  */

  Matrix = Two.Matrix = function(a, b, c, d, e, f) {
    var elements;

    this.elements = new Two.Array(9);
    elements = a;
    if (!_.isArray(elements)) {
      elements = _.toArray(arguments);
    }
    return this.identity().set(elements);
  };
  _.extend(Matrix, {
    Identity: [1, 0, 0, 0, 1, 0, 0, 0, 1],
    /*
    Multiply two matrix 3x3 arrays
    */

    Multiply: function(A, B) {
      var A0, A1, A2, A3, A4, A5, A6, A7, A8, B0, B1, B2, B3, B4, B5, B6, B7, B8, a, b, c, e, x, y, z;

      if (B.length <= 3) {
        x = void 0;
        y = void 0;
        z = void 0;
        a = B[0] || 0;
        b = B[1] || 0;
        c = B[2] || 0;
        e = A;
        x = e[0] * a + e[1] * b + e[2] * c;
        y = e[3] * a + e[4] * b + e[5] * c;
        z = e[6] * a + e[7] * b + e[8] * c;
        return {
          x: x,
          y: y,
          z: z
        };
      }
      A0 = A[0];
      A1 = A[1];
      A2 = A[2];
      A3 = A[3];
      A4 = A[4];
      A5 = A[5];
      A6 = A[6];
      A7 = A[7];
      A8 = A[8];
      B0 = B[0];
      B1 = B[1];
      B2 = B[2];
      B3 = B[3];
      B4 = B[4];
      B5 = B[5];
      B6 = B[6];
      B7 = B[7];
      B8 = B[8];
      return [A0 * B0 + A1 * B3 + A2 * B6, A0 * B1 + A1 * B4 + A2 * B7, A0 * B2 + A1 * B5 + A2 * B8, A3 * B0 + A4 * B3 + A5 * B6, A3 * B1 + A4 * B4 + A5 * B7, A3 * B2 + A4 * B5 + A5 * B8, A6 * B0 + A7 * B3 + A8 * B6, A6 * B1 + A7 * B4 + A8 * B7, A6 * B2 + A7 * B5 + A8 * B8];
    }
  });
  return _.extend(Matrix.prototype, {
    /*
    Takes an array of elements or the arguments list itself to
    set and update the current matrix's elements. Only updates
    specified values.
    */

    set: function(a, b, c, d, e, f) {
      var elements, l;

      elements = a;
      l = arguments.length;
      if (!_.isArray(elements)) {
        elements = _.toArray(arguments);
      }
      _.each(elements, (function(v, i) {
        if (_.isNumber(v)) {
          return this.elements[i] = v;
        }
      }), this);
      return this;
    },
    /*
    Turn matrix to identity, like resetting.
    */

    identity: function() {
      this.set(Matrix.Identity);
      return this;
    },
    /*
    Multiply scalar or multiply by another matrix.
    */

    multiply: function(a, b, c, d, e, f, g, h, i) {
      var A, A0, A1, A2, A3, A4, A5, A6, A7, A8, B, B0, B1, B2, B3, B4, B5, B6, B7, B8, elements, l, x, y, z;

      elements = arguments;
      l = elements.length;
      if (l <= 1) {
        _.each(this.elements, (function(v, i) {
          return this.elements[i] = v * a;
        }), this);
        return this;
      }
      if (l <= 3) {
        x = void 0;
        y = void 0;
        z = void 0;
        a = a || 0;
        b = b || 0;
        c = c || 0;
        e = this.elements;
        x = e[0] * a + e[1] * b + e[2] * c;
        y = e[3] * a + e[4] * b + e[5] * c;
        z = e[6] * a + e[7] * b + e[8] * c;
        return {
          x: x,
          y: y,
          z: z
        };
      }
      A = this.elements;
      B = elements;
      A0 = A[0];
      A1 = A[1];
      A2 = A[2];
      A3 = A[3];
      A4 = A[4];
      A5 = A[5];
      A6 = A[6];
      A7 = A[7];
      A8 = A[8];
      B0 = B[0];
      B1 = B[1];
      B2 = B[2];
      B3 = B[3];
      B4 = B[4];
      B5 = B[5];
      B6 = B[6];
      B7 = B[7];
      B8 = B[8];
      this.elements[0] = A0 * B0 + A1 * B3 + A2 * B6;
      this.elements[1] = A0 * B1 + A1 * B4 + A2 * B7;
      this.elements[2] = A0 * B2 + A1 * B5 + A2 * B8;
      this.elements[3] = A3 * B0 + A4 * B3 + A5 * B6;
      this.elements[4] = A3 * B1 + A4 * B4 + A5 * B7;
      this.elements[5] = A3 * B2 + A4 * B5 + A5 * B8;
      this.elements[6] = A6 * B0 + A7 * B3 + A8 * B6;
      this.elements[7] = A6 * B1 + A7 * B4 + A8 * B7;
      this.elements[8] = A6 * B2 + A7 * B5 + A8 * B8;
      return this;
    },
    /*
    Set a scalar onto the matrix.
    */

    scale: function(sx, sy) {
      var l;

      l = arguments.length;
      if (l <= 1) {
        sy = sx;
      }
      return this.multiply(sx, 0, 0, 0, sy, 0, 0, 0, 1);
    },
    /*
    Rotate the matrix.
    */

    rotate: function(radians) {
      var c, s;

      c = cos(radians);
      s = sin(radians);
      return this.multiply(c, -s, 0, s, c, 0, 0, 0, 1);
    },
    /*
    Translate the matrix.
    */

    translate: function(x, y) {
      return this.multiply(1, 0, x, 0, 1, y, 0, 0, 1);
    },
    skewX: function(radians) {
      var a;

      a = tan(radians);
      return this.multiply(1, a, 0, 0, 1, 0, 0, 0, 1);
    },
    skewY: function(radians) {
      var a;

      a = tan(radians);
      return this.multiply(1, 0, 0, a, 1, 0, 0, 0, 1);
    },
    /*
    Create a transform string to be used with rendering apis.
    */

    toString: function() {
      return this.toArray().join(" ");
    },
    /*
    Create a transform array to be used with rendering apis.
    */

    toArray: function(fullMatrix) {
      var a, b, c, d, e, elements, f, g, h, i;

      elements = this.elements;
      a = parseFloat(elements[0].toFixed(3));
      b = parseFloat(elements[1].toFixed(3));
      c = parseFloat(elements[2].toFixed(3));
      d = parseFloat(elements[3].toFixed(3));
      e = parseFloat(elements[4].toFixed(3));
      f = parseFloat(elements[5].toFixed(3));
      if (!!fullMatrix) {
        g = parseFloat(elements[6].toFixed(3));
        h = parseFloat(elements[7].toFixed(3));
        i = parseFloat(elements[8].toFixed(3));
        return [a, d, g, b, e, h, c, f, i];
      }
      return [a, d, b, e, c, f];
    },
    /*
    Clone the current matrix.
    */

    clone: function() {
      var a, b, c, d, e, f, g, h, i;

      a = this.elements[0];
      b = this.elements[1];
      c = this.elements[2];
      d = this.elements[3];
      e = this.elements[4];
      f = this.elements[5];
      g = this.elements[6];
      h = this.elements[7];
      i = this.elements[8];
      return new Two.Matrix(a, b, c, d, e, f, g, h, i);
    }
  });
})();
