var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['text!templates/Data.handlebars', 'view'], function(templateString, View) {
  var DataView, _ref;

  return DataView = (function(_super) {
    __extends(DataView, _super);

    function DataView() {
      _ref = DataView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    DataView.prototype.initialize = function() {
      var t;

      this.$el = $(this.el);
      t = this;
      this.render();
      this.$el.on('scrollSpy:enter', function(e) {
        t.traceGraph();
        return $(this).unbind('scrollSpy:enter');
      });
      return this.$el.scrollSpy();
    };

    DataView.prototype.render = function() {
      var data, html, template;

      this.onRender();
      template = Handlebars.compile(templateString);
      data = {};
      if (typeof this.model !== 'undefined') {
        data = this.model;
      }
      html = template(data);
      this.el.innerHTML = html;
      return this.el;
    };

    DataView.prototype.traceGraph = function() {
      var JsonCircle, animate, circleRadii, circlecenter, circles, contentg, coucou, coucou2, degres, graphSelection, hideall, i, j, loadinformations, maxassists, maxblocks, maxfieldsGoalsMade, maxfreeThrow, maxpoints, maxrebounds, maxthreePointsMade, minassists, minblocks, minfieldsGoalsMade, minfreeThrow, minpoints, minrebounds, minthreePointsMade, namedegres, namedonnee, polygonSelection, polygonclipath, polygong, polygonpath, showall, svgSelection, tabassists, tabassistsp, tabblocks, tabblocksp, tabdonnees, tabdonneesp, tabfieldsGoalsMade, tabfieldsGoalsMadep, tabfreeThrow, tabfreeThrowp, tabpoints, tabpointsp, tabrebounds, tabreboundsp, tabtemp, tabthreePointsMade, tabthreePointsMadep, valuesblocks, valuestabassists, valuestabfieldsGoalsMade, valuestabfreeThrow, valuestabpoints, valuestabrebounds, valuestabthreePointsMade;

      graphSelection = d3.select(this.el.getElementsByTagName('div')[0]);
      svgSelection = graphSelection.append("svg").attr("width", 595).attr("height", 595);
      JsonCircle = this.model.get('years');
      coucou = function() {
        hideall();
        return showall();
      };
      coucou2 = function() {
        var iddonnees;

        hideall();
        circlecenter.transition().attr("r", "40").duration(0).delay(400).ease("elastic");
        circlecenter.transition().attr("r", "69").duration(1000).delay(401).ease("elastic");
        if (this.className !== "all") {
          iddonnees = void 0;
          switch (this.className) {
            case "points":
              iddonnees = 0;
              break;
            case "rebounds":
              iddonnees = 1;
              break;
            case "fieldsGoalsMade":
              iddonnees = 2;
              break;
            case "assists":
              iddonnees = 3;
              break;
            case "freeThrow":
              iddonnees = 4;
              break;
            case "threePointsMade":
              iddonnees = 5;
              break;
            case "blocks":
              iddonnees = 6;
          }
          console.log(tabdonneesp[0]);
          return d3.selectAll("." + this.className).transition().duration(1000).delay(500).ease("elastic").attr("r", function(d, i) {
            return (tabdonneesp[iddonnees][i] * 154) + 69;
          });
        } else {
          hideall();
          return showall();
        }
      };
      hideall = function() {
        return d3.selectAll(".cercles_donnees").transition().duration(500).delay(0).attr("r", "69").ease("linear");
      };
      showall = function() {
        $("g g").css("opacity", "0.6");
        d3.selectAll(".cercles_donnees").transition().attr("r", function(d) {
          return d;
        }).duration(800).delay(500).ease("elastic");
        circlecenter.transition().attr("r", "40").duration(0).delay(400).ease("elastic");
        return circlecenter.transition().attr("r", "69").duration(1000).delay(401).ease("elastic");
      };
      loadinformations = function(yo) {
        var i, _results;

        console.log("coucou");
        $("li li.circlestat").css("background", "rgba(120,120,120,0)");
        i = 0;
        while (i < Math.round(tabreboundsp[yo] * 100 / 5)) {
          setTimeout("$(\"li.points li.circlestat:nth-child(\"+(" + i + "+1)+\")\").css(\"background-color\",\"rgba(178,56,67,1)\")", i * 50 + i * 10);
          i++;
        }
        i = 0;
        while (i < Math.round(tabreboundsp[yo] * 100 / 5)) {
          setTimeout("$(\"li.rebounds li.circlestat:nth-child(\"+(" + i + "+1)+\")\").css(\"background-color\",\"rgba(26,188,156,1)\")", i * 50 + i * 10);
          i++;
        }
        i = 0;
        while (i < Math.round(tabfieldsGoalsMadep[yo] * 100 / 5)) {
          setTimeout("$(\"li.fieldgoals li.circlestat:nth-child(\"+(" + i + "+1)+\")\").css(\"background-color\",\"rgba(52,152,219,1)\")", i * 50 + i * 10);
          i++;
        }
        i = 0;
        while (i < Math.round(tabassistsp[yo] * 100 / 5)) {
          setTimeout("$(\"li.assists li.circlestat:nth-child(\"+(" + i + "+1)+\")\").css(\"background-color\",\"rgba(155,89,182,1)\")", i * 50 + i * 10);
          i++;
        }
        i = 0;
        while (i < Math.round(tabfreeThrowp[yo] * 100 / 5)) {
          setTimeout("$(\"li.freeThrow li.circlestat:nth-child(\"+(" + i + "+1)+\")\").css(\"background-color\",\"rgba(52,73,94,1)\")", i * 50 + i * 10);
          i++;
        }
        i = 0;
        while (i < Math.round(tabthreePointsMadep[yo] * 100 / 5)) {
          setTimeout("$(\"li.threepointers li.circlestat:nth-child(\"+(" + i + "+1)+\")\").css(\"background-color\",\"rgba(241,196,15,1)\")", i * 50 + i * 10);
          i++;
        }
        i = 0;
        _results = [];
        while (i < Math.round(tabblocksp[yo] * 100 / 5)) {
          setTimeout("$(\"li.blocks li.circlestat:nth-child(\"+(" + i + "+1)+\")\").css(\"background-color\",\"rgba(230,126,34,1)\")", i * 50 + i * 10);
          _results.push(i++);
        }
        return _results;
      };
      tabblocks = [];
      valuesblocks = [];
      tabblocksp = [];
      $.each(JsonCircle, function(i, e) {
        return valuesblocks.push(this.blocks);
      });
      minblocks = Math.min.apply(null, valuesblocks) + 0.1;
      maxblocks = Math.max.apply(null, valuesblocks);
      i = 0;
      while (i < valuesblocks.length) {
        tabblocks[i] = ((valuesblocks[i] - minblocks) / (maxblocks - minblocks)) * 22 + 69;
        tabblocksp[i] = valuesblocks[i] / maxblocks;
        ++i;
      }
      tabthreePointsMade = [];
      valuestabthreePointsMade = [];
      tabthreePointsMadep = [];
      $.each(JsonCircle, function(i, e) {
        return valuestabthreePointsMade.push(this.threePointsMade);
      });
      minthreePointsMade = Math.min.apply(null, valuestabthreePointsMade) + 0.1;
      maxthreePointsMade = Math.max.apply(null, valuestabthreePointsMade);
      i = 0;
      while (i < valuestabthreePointsMade.length) {
        tabthreePointsMade[i] = ((valuestabthreePointsMade[i] - minthreePointsMade) / (maxthreePointsMade - minthreePointsMade)) * 22 + tabblocks[i];
        tabthreePointsMadep[i] = valuestabthreePointsMade[i] / maxthreePointsMade;
        ++i;
      }
      tabfreeThrow = [];
      valuestabfreeThrow = [];
      tabfreeThrowp = [];
      $.each(JsonCircle, function(i, e) {
        return valuestabfreeThrow.push(this.freeThrow);
      });
      minfreeThrow = Math.min.apply(null, valuestabfreeThrow) + 0.1;
      maxfreeThrow = Math.max.apply(null, valuestabfreeThrow);
      i = 0;
      while (i < valuestabfreeThrow.length) {
        tabfreeThrow[i] = ((valuestabfreeThrow[i] - minfreeThrow) / (maxfreeThrow - minfreeThrow)) * 22 + tabthreePointsMade[i];
        tabfreeThrowp[i] = valuestabfreeThrow[i] / maxfreeThrow;
        ++i;
      }
      tabassists = [];
      valuestabassists = [];
      tabassistsp = [];
      $.each(JsonCircle, function(i, e) {
        return valuestabassists.push(this.assists);
      });
      minassists = Math.min.apply(null, valuestabassists) + 0.1;
      maxassists = Math.max.apply(null, valuestabassists);
      i = 0;
      while (i < valuestabassists.length) {
        tabassists[i] = ((valuestabassists[i] - minassists) / (maxassists - minassists)) * 22 + tabfreeThrow[i];
        tabassistsp[i] = valuestabassists[i] / maxassists;
        ++i;
      }
      tabfieldsGoalsMade = [];
      valuestabfieldsGoalsMade = [];
      tabfieldsGoalsMadep = [];
      $.each(JsonCircle, function(i, e) {
        return valuestabfieldsGoalsMade.push(this.fieldsGoalsMade);
      });
      minfieldsGoalsMade = Math.min.apply(null, valuestabfieldsGoalsMade) + 0.1;
      maxfieldsGoalsMade = Math.max.apply(null, valuestabfieldsGoalsMade);
      i = 0;
      while (i < valuestabfieldsGoalsMade.length) {
        tabfieldsGoalsMade[i] = ((valuestabfieldsGoalsMade[i] - minfieldsGoalsMade) / (maxfieldsGoalsMade - minfieldsGoalsMade)) * 22 + tabassists[i];
        tabfieldsGoalsMadep[i] = valuestabfieldsGoalsMade[i] / maxfieldsGoalsMade;
        ++i;
      }
      tabrebounds = [];
      valuestabrebounds = [];
      tabreboundsp = [];
      $.each(JsonCircle, function(i, e) {
        return valuestabrebounds.push(this.rebounds);
      });
      minrebounds = Math.min.apply(null, valuestabrebounds) + 0.1;
      maxrebounds = Math.max.apply(null, valuestabrebounds);
      i = 0;
      while (i < valuestabrebounds.length) {
        tabrebounds[i] = ((valuestabrebounds[i] - minrebounds) / (maxrebounds - minrebounds)) * 22 + tabfieldsGoalsMade[i];
        tabreboundsp[i] = valuestabrebounds[i] / maxrebounds;
        ++i;
      }
      tabpoints = [];
      valuestabpoints = [];
      tabpointsp = [];
      $.each(JsonCircle, function(i, e) {
        return valuestabpoints.push(this.points);
      });
      minpoints = Math.min.apply(null, valuestabpoints) + 0.1;
      maxpoints = Math.max.apply(null, valuestabpoints);
      i = 0;
      while (i < valuestabpoints.length) {
        tabpoints[i] = ((valuestabpoints[i] - minpoints) / (maxpoints - minpoints)) * 22 + tabrebounds[i];
        tabpointsp[i] = valuestabpoints[i] / maxpoints;
        ++i;
      }
      circleRadii = [];
      tabdonnees = new Array(tabpoints, tabrebounds, tabfieldsGoalsMade, tabassists, tabfreeThrow, tabthreePointsMade, tabblocks);
      tabdonneesp = new Array(tabpointsp, tabreboundsp, tabfieldsGoalsMadep, tabassistsp, tabfreeThrowp, tabthreePointsMadep, tabblocksp);
      namedonnee = new Array("points", "rebounds", "fieldsGoalsMade", "assists", "freeThrow", "threePointsMade", "blocks");
      i = 0;
      while (i < 45) {
        tabtemp = [];
        j = 0;
        while (j < 7) {
          tabtemp.push(tabdonnees[j][i]);
          j++;
        }
        circleRadii.push(tabtemp);
        i++;
      }
      degres = [0, 8, 16, 24, 32, 40, 48, 56, 64, 72, 80, 88, 96, 104, 112, 120, 128, 136, 144, 152, 160, 168, 176, 184, 192, 200, 208, 216, 224, 232, 240, 248, 256, 264, 272, 280, 288, 296, 304, 312, 320, 328, 336, 344, 352, 0, 8, 16, 24, 32, 40, 48, 56, 64, 72, 80, 88, 96, 104, 112, 120, 128, 136, 144, 152, 160, 168, 176, 184, 192, 200, 208, 216, 224, 232, 240, 248, 256, 264, 272, 280, 288, 296, 304, 312, 320, 328, 336, 344, 352];
      namedegres = ["1970-1971", "1971-1972", "1972-1973", "1973-1974", "1974-1975", "1975-1976", "1976-1977", "1977-1978", "1978-1979", "1979-1980", "1980-1981", "1981-1982", "1982-1983", "1983-1984", "1984-1985", "1985-1986", "1986-1987", "1987-1988", "1988-1989", "1989-1990", "1990-1991", "1991-1992", "1992-1993", "1993-1994", "1994-1995", "1995-1996", "1996-1997", "1997-1998", "1998-1999", "1999-2000", "2000-2001", "2001-2002", "2002-2003", "2003-2004", "2004-2005", "2005-2006", "2006-2007", "2007-2008", "2008-2009", "2009-2010", "2010-2011", "2011-2012", "2012-2013", "2013-2014"];
      contentg = svgSelection.append("g").attr("transform", "translate(294.8,94.9)");
      polygong = contentg.selectAll("g").data(circleRadii).enter().append("g").attr("x", "150").attr("y", "150").attr("id", function(d, i) {
        return i;
      }).attr("transform", function(d, i) {
        return "rotate(" + degres[i + (45 - tabpoints.length)] + ")";
      });
      polygong.append("text").text(function(d, i) {
        return namedegres[i];
      }).attr("id", "yo").attr("x", "5").attr("y", "15").attr("transform", "rotate(-90)").attr("font-family", "sans-serif").attr("font-size", "10px").attr("fill", "white");
      animate = polygong.append("animateTransform").attr("attributeName", "transform").attr("attributeType", "XML").attr("type", "rotate").attr("begin", "0").attr("dur", "1s").attr("from", "0 20 220").attr("to", function(d, i) {
        return degres[i + (45 - tabpoints.length)] + " 20 220";
      }).attr("fill", "freeze");
      polygonpath = polygong.append("path").style("fill", "#2f2f34").attr("stroke-miterlimit", 10).attr("d", "M25.236,0.504C24.43,9.298,12.667,180.422,12.667,180.422L0.112,0.512");
      polygong.append("path").style("fill", "none").attr("id", "SVGID_1_").attr("d", "M12.667,180.422L0.112,0.512c0,0,12.292-1.146,25.124-0.008C24.43,9.298,12.667,180.422,12.667,180.422z");
      polygonclipath = polygong.append("clipPath").attr("id", "SVGID_2_");
      polygonclipath.append("use").attr("xlink:href", "#SVGID_1_").attr("overflow", "visible");
      circles = polygong.selectAll("circle").data(function(d, i) {
        return circleRadii[i];
      }).enter().append("circle").attr("clip-path", "url(#SVGID_2_)").attr("cx", "20.5").attr("cy", "220").attr("r", 0).attr("class", function(d, i) {
        return "cercles_donnees " + namedonnee[i];
      }).style("fill", function(d, i) {
        var nbr, returnColor;

        returnColor = void 0;
        nbr = this.parentElement.id;
        if (d === circleRadii[nbr][0]) {
          returnColor = "#b23843";
        } else if (d === circleRadii[nbr][1]) {
          returnColor = "#1abc9c";
        } else if (d === circleRadii[nbr][2]) {
          returnColor = "#3498db";
        } else if (d === circleRadii[nbr][3]) {
          returnColor = "#9b59b6";
        } else if (d === circleRadii[nbr][4]) {
          returnColor = "#34495e";
        } else if (d === circleRadii[nbr][5]) {
          returnColor = "#f1c40f";
        } else {
          if (d === circleRadii[nbr][6]) {
            returnColor = "#e67e22";
          }
        }
        return returnColor;
      });
      d3.select("g g").classed("active", true);
      loadinformations(0);
      polygonpath = polygong.append("path").style("fill", "none").attr("stroke", "#313348").attr("stroke-miterlimit", 10).attr("d", "M25.236,0.504C24.43,9.298,12.667,180.422,12.667,180.422L0.112,0.512");
      polygonSelection = svgSelection.append("polygon").attr("opacity", 0.1).style("fill", "none").attr("stroke", "#B4B4B4").attr("stroke-miterlimit", 10).attr("points", "80.23,461.186 70.531,184.706 305.299,38.355 549.77,168.483 559.469,444.963 324.701,591.314");
      svgSelection.append("polygon").attr("opacity", 0.1).style("fill", "none").attr("stroke", "#B4B4B4").attr("stroke-miterlimit", 10).attr("points", "176.527,554.5 38.056,315 176.527,75.5 453.473,75.5 591.944,315 453.473,554.5 ");
      svgSelection.append("circle").style("fill", "none").attr("stroke", "#FFFFFF").attr("stroke-width", 4.36).attr("stroke-miterlimit", 10).attr("cx", "315").attr("cy", "314.834").attr("r", "220");
      circlecenter = svgSelection.append("circle").style("fill", "#313348").attr("stroke", "#FFFFFF").attr("stroke-width", 5).attr("stroke-miterlimit", 10).attr("cx", "315").attr("cy", "314.834").attr("r", "0").attr("class", "all");
      circlecenter.transition().attr("r", "66").duration(2000).delay(300).ease("elastic");
      d3.selectAll(".cercles_donnees").transition().attr("r", function(d) {
        return d;
      }).duration(800).delay(0).ease("linear");
      d3.selectAll("g g").on("click", function() {
        d3.selectAll("svg g g").classed("active", false);
        return d3.select(this).classed("active", true);
      });
      $(".all").mouseover(function() {
        circlecenter.transition().attr("r", "65").duration(0).delay(10).ease("elastic");
        return circlecenter.transition().attr("r", "69").duration(900).delay(11).ease("elastic");
      });
      $(".all").click(false, coucou);
      $("ul.legend li").click(false, coucou2);
      return $("g g").click(false, function() {
        $(".yearsinfos h4 span").html(namedegres[Math.round(this.id) + (41 - tabpoints.length)]);
        $(".points p span").html(valuestabpoints[this.id] + " / " + maxpoints);
        $(".rebounds p span").html(valuestabrebounds[this.id] + " / " + maxrebounds);
        $(".fieldgoals p span").html(Math.round(tabfieldsGoalsMadep[this.id] * 100) + " / 100%");
        $(".assists p span").html(valuestabassists[this.id] + " / " + maxassists);
        $(".freeThrow p span").html(Math.round(tabfreeThrowp[this.id] * 100) + " / 100%");
        $(".threepointers p span").html(Math.round(tabthreePointsMadep[this.id] * 100) + " / 100%");
        $(".blocks p span").html(valuesblocks[this.id] + " / " + maxblocks);
        return loadinformations(this.id);
      });
    };

    return DataView;

  })(View);
});
