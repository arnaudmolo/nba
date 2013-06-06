var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['view', 'd3', '../framework/spy'], function(View, ignore) {
  var PlayoffsView, _ref;

  return PlayoffsView = (function(_super) {
    __extends(PlayoffsView, _super);

    function PlayoffsView() {
      _ref = PlayoffsView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    PlayoffsView.prototype.width = 955;

    PlayoffsView.prototype.height = 550;

    PlayoffsView.prototype.initialize = function() {
      var t;

      t = this;
      this.svg = d3.select("#playoffs").append("svg").attr("width", this.width).attr("height", this.height);
      this.pie = d3.layout.pie().sort(null).value(function(d) {
        return 1;
      });
      $("#playoffs").on('scrollSpy:enter', function(e) {
        console.log(this);
        d3.json("haha.json", function(error, datas) {
          return t.render(datas);
        });
        return $(this).unbind('scrollSpy:enter');
      });
      return $('#playoffs').scrollSpy();
    };

    PlayoffsView.prototype.render = function(datas) {
      var array, group, i, lignes, line, nullArray, text, texts, _this;

      _this = this;
      datas.final.reverse();
      datas.finalconf.reverse();
      datas.semifinal.reverse();
      datas.quarterfinal.reverse();
      _this.dessine(datas.final, {
        translateX: 380,
        rotateX: 100,
        radius: 4,
        order: 4,
        name: "final"
      });
      _this.dessine(datas.finalconf, {
        translateX: 280,
        radius: 7.5,
        rotateX: 200,
        order: 3,
        name: "finalconf"
      });
      _this.dessine(datas.semifinal, {
        translateX: 180,
        rotateX: 300,
        radius: 11,
        order: 2,
        name: "semifinal"
      });
      _this.dessine(datas.quarterfinal, {
        translateX: 80,
        rotateX: 400,
        radius: 14,
        order: 1,
        name: "quarterfinal"
      });
      array = [
        {
          x: 20,
          y: 500
        }, {
          x: 475,
          y: 500
        }
      ];
      nullArray = [
        {
          x: 475,
          y: 500
        }, {
          x: 475,
          y: 500
        }
      ];
      line = d3.svg.line().x(function(d) {
        return d.x;
      }).y(function(d) {
        return d.y;
      });
      texts = this.svg.append('g').attr('id', 'playoffs-text').attr('transform', 'translate(10, 490)');
      lignes = this.svg.append('g').attr('id', 'playoffs-lignes');
      i = 0;
      while (i < 44) {
        lignes.append('path').attr('d', line(nullArray)).attr('opacity', 0.5).attr('transform', 'rotate(' + i * 4.0909090909090909090909090909091 + ', 480, 500)').style("stroke", "grey").transition().duration(2000).delay(200).attr('d', line(array));
        group = texts.append('g');
        group.attr('transform', 'translate(470,0),rotate(0,470,0)').attr('opacity', 0).transition().duration(1000).delay(200).attr('transform', 'rotate(' + i * 4.0909090909090909090909090909091 + ', 470, 0)').attr('opacity', 1);
        text = group.append('text');
        text.text(1970 + i).attr("color", "red").attr("font-size", "12px");
        if (i > 23) {
          text.attr('transform', 'rotate(180, 12, 0)');
        }
        i++;
      }
      return d3.selectAll("#legend>.team").on("mouseenter", function(e) {
        var dessins, elClass, show;

        elClass = this.classList[1];
        show = d3.selectAll("#playoffs ." + elClass);
        return dessins = d3.selectAll("#playoffs-finalconf path:not(." + elClass + "), #playoffs-final path:not(." + elClass + "), #playoffs-semifinal path:not(." + elClass + "), #playoffs-quarterfinal path:not(." + elClass + ")").attr('opacity', 0.25);
      }).on("mouseleave", function() {
        var dessins;

        return dessins = d3.selectAll("#playoffs-finalconf path, #playoffs-final path, #playoffs-semifinal path, #playoffs-quarterfinal path").attr('opacity', 1);
      });
    };

    PlayoffsView.prototype.dessine = function(tableau, option) {
      var arc, _svg, _this;

      if (option == null) {
        option = {
          translateX: 280,
          radius: 7.5,
          rotateX: 200,
          order: 1
        };
      }
      _this = this;
      arc = d3.svg.arc().outerRadius(option.radius).innerRadius(0);
      _svg = _this.svg.append('g').attr('id', 'playoffs-' + option.name);
      return tableau.forEach(function(data, index) {
        var g, i, paths, rotate, svg2;

        if (data.color !== void 0) {
          data = [data];
        }
        i = index + 1;
        rotate = -180 - i * 4.09;
        svg2 = _svg.append("g").attr('transform', 'translate(480, 500), rotate(0, 0, 0)').attr('opacity', '0');
        g = svg2.selectAll(".arc").data(_this.pie(data)).enter().append("g").attr("class", "arc");
        svg2.transition().duration(1000).delay(1000 + option.order * 500).attr("transform", "translate(" + option.translateX + ",500), rotate(" + rotate + ", " + option.rotateX + ", 0)").attr('opacity', 0.8);
        paths = g.append("path").attr('class', function(d) {
          return d.data.team;
        });
        paths.style("fill", function(d) {
          return d.data.color;
        });
        return paths.transition().duration(500).attr('d', arc);
      });
    };

    return PlayoffsView;

  })(View);
});
