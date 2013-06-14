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
      return t.traceGraph();
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
      var JsonCircle, arcpoints, arcsg, backgroundarcs, circleCenterDeux, circleRadii, circleRadiusFrom, circleRadiusTo, circlecenter, contentg, corres, degres, draw, drawfirst, drawlegend, graphSelection, gtext, hideall, hideshow, hideshowlegend, i, image, j, launch, loadinformations, maxassists, maxblocks, maxfieldsGoalsMade, maxfreeThrow, maxpoints, maxrebounds, maxthreePointsMade, minassists, minblocks, minfieldsGoalsMade, minfreeThrow, minpoints, minrebounds, minthreePointsMade, namedegres, namedonnee, onclick, polygonSelection, showall, svgSelection, tabassists, tabassistsp, tabblocks, tabblocksp, tabdonnees, tabdonneesp, tabfieldsGoalsMade, tabfieldsGoalsMadep, tabfreeThrow, tabfreeThrowp, tabpoints, tabpointsp, tabrebounds, tabreboundsp, tabtemp, tabthreePointsMade, tabthreePointsMadep, valuesblocks, valuestabassists, valuestabfieldsGoalsMade, valuestabfreeThrow, valuestabpoints, valuestabrebounds, valuestabthreePointsMade;

      graphSelection = d3.select("#graph");
      svgSelection = graphSelection.append("svg").attr("width", 595).attr("height", 595);
      JsonCircle = this.model.get('years');
      _.each(JsonCircle, function(e, i) {
        if (parseInt(i) <= 1969) {
          return delete JsonCircle[i];
        }
      });
      hideshow = function() {
        hideall();
        return showall();
      };
      hideshowlegend = function() {
        var iddonnees;

        hideall();
        if (this.className !== "all") {
          iddonnees = void 0;
          switch (this.className) {
            case "points":
              iddonnees = "arc0";
              break;
            case "rebounds":
              iddonnees = "arc1";
              break;
            case "fieldsGoalsMade":
              iddonnees = "arc2";
              break;
            case "assists":
              iddonnees = "arc3";
              break;
            case "freeThrow":
              iddonnees = "arc4";
              break;
            case "threePointsMade":
              iddonnees = "arc5";
              break;
            case "blocks":
              iddonnees = "arc6";
          }
        } else {
          hideall();
          showall();
        }
        return drawlegend(this);
      };
      hideall = function() {
        d3.selectAll(".arcs").transition().duration(500).delay(0).attr("d", arcpoints.outerRadius(0)).ease("linear");
        circlecenter.transition().attr("r", "40").duration(0).delay(400).ease("elastic");
        return circlecenter.transition().attr("r", circleRadiusTo).duration(1000).delay(401).ease("elastic");
      };
      showall = function() {
        hideall();
        return draw();
      };
      loadinformations = function(yo) {
        var i, _results;

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
      drawfirst = function() {
        var count, count2, showdiagramm;

        count = 0;
        count2 = 0;
        return showdiagramm = arcsg.selectAll(".garcs").data(function(d, i) {
          return circleRadii[i];
        }).enter().append("path").attr("d", arcpoints.outerRadius(0).startAngle(0).endAngle(0)).attr("class", function(d, i) {
          return "arc" + i + " arcs";
        }).attr("transform", "translate(315,315)").attr("fill", function(d, i) {
          switch (i) {
            case 0:
              return "#b23843";
            case 1:
              return "#1abc9c";
            case 2:
              return "#3498db";
            case 3:
              return "#9b59b6";
            case 4:
              return "#34495e";
            case 5:
              return "#f1c40f";
            case 6:
              return "#e67e22";
          }
        }).transition().duration(1000).delay(50).ease("elastic").attr("d", arcpoints.outerRadius(function(d) {
          return d;
        }).startAngle(function(d, i) {
          if (i === 0) {
            count2 = count2 + 1;
          }
          return ((2 * Math.PI) / tabrebounds.length) * count2 - 0.03;
        }).endAngle(function(d, i) {
          if (i === 0) {
            count = count + 1;
          }
          return ((2 * Math.PI) / tabrebounds.length) * (count + 1) - 0.07;
        }));
      };
      draw = function() {
        var count, count2;

        count = 0;
        count2 = 0;
        return arcsg.selectAll(".arcs").attr("class", function(d, i) {
          return "arc" + i + " arcs";
        }).attr("transform", "translate(315,315)").attr("fill", function(d, i) {
          switch (i) {
            case 0:
              return "#b23843";
            case 1:
              return "#1abc9c";
            case 2:
              return "#3498db";
            case 3:
              return "#9b59b6";
            case 4:
              return "#34495e";
            case 5:
              return "#f1c40f";
            case 6:
              return "#e67e22";
          }
        }).transition().delay(400).duration(1000).ease("elastic").attr("d", arcpoints.outerRadius(function(d) {
          return d;
        }).startAngle(function(d, i) {
          if (i === 0) {
            count2 = count2 + 1;
          }
          return ((2 * Math.PI) / tabrebounds.length) * count2 - 0.03;
        }).endAngle(function(d, i) {
          if (i === 0) {
            count = count + 1;
          }
          return ((2 * Math.PI) / tabrebounds.length) * (count + 1) - 0.07;
        }));
      };
      drawlegend = function(nameselect) {
        var count, count2, iddonnees;

        iddonnees = void 0;
        if (nameselect.className !== "all") {
          switch (nameselect.className) {
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
        } else {
          hideall();
          showall();
        }
        count = 0;
        count2 = 0;
        return d3.selectAll(".arc" + iddonnees).transition().duration(500).delay(400).ease("cubic-in-out").attr("d", arcpoints.outerRadius(function(d, i) {
          return (tabdonneesp[iddonnees][i] * 154) + 69;
        }).startAngle(function(d, i) {
          return ((2 * Math.PI) / tabrebounds.length) * (i + 1) - 0.03;
        }).endAngle(function(d, i) {
          return ((2 * Math.PI) / tabrebounds.length) * (i + 2) - 0.07;
        }));
      };
      tabblocks = [];
      valuesblocks = [];
      tabblocksp = [];
      tabthreePointsMade = [];
      valuestabthreePointsMade = [];
      tabthreePointsMadep = [];
      tabfreeThrow = [];
      valuestabfreeThrow = [];
      tabfreeThrowp = [];
      tabassists = [];
      valuestabassists = [];
      tabassistsp = [];
      tabfieldsGoalsMade = [];
      valuestabfieldsGoalsMade = [];
      tabfieldsGoalsMadep = [];
      tabrebounds = [];
      valuestabrebounds = [];
      tabreboundsp = [];
      tabpoints = [];
      valuestabpoints = [];
      tabpointsp = [];
      _.each(JsonCircle, function(e, i) {
        valuesblocks.push(e.blocks);
        valuestabthreePointsMade.push(e.threePointsMade);
        valuestabfreeThrow.push(e.freeThrow);
        valuestabfieldsGoalsMade.push(e.fieldsGoalsMade);
        valuestabrebounds.push(e.rebounds);
        valuestabassists.push(e.assists);
        return valuestabpoints.push(e.points);
      });
      minblocks = 169;
      maxblocks = 697;
      i = 0;
      while (i < valuesblocks.length) {
        tabblocks[i] = ((valuesblocks[i] - minblocks) / (maxblocks - minblocks)) * 22 + 69;
        tabblocksp[i] = valuesblocks[i] / maxblocks;
        ++i;
      }
      minthreePointsMade = 10;
      maxthreePointsMade = 841;
      i = 0;
      while (i < valuestabthreePointsMade.length) {
        tabthreePointsMade[i] = ((valuestabthreePointsMade[i] - minthreePointsMade) / (maxthreePointsMade - minthreePointsMade)) * 22 + tabblocks[i];
        tabthreePointsMadep[i] = valuestabthreePointsMade[i] / maxthreePointsMade;
        ++i;
      }
      minfreeThrow = 59;
      maxfreeThrow = 83.2;
      i = 0;
      while (i < valuestabfreeThrow.length) {
        tabfreeThrow[i] = ((valuestabfreeThrow[i] - minfreeThrow) / (maxfreeThrow - minfreeThrow)) * 22 + tabthreePointsMade[i];
        tabfreeThrowp[i] = valuestabfreeThrow[i] / maxfreeThrow;
        ++i;
      }
      minassists = 305;
      maxassists = 2575;
      i = 0;
      while (i < valuestabassists.length) {
        tabassists[i] = ((valuestabassists[i] - minassists) / (maxassists - minassists)) * 22 + tabfreeThrow[i];
        tabassistsp[i] = valuestabassists[i] / maxassists;
        ++i;
      }
      minfieldsGoalsMade = 962;
      maxfieldsGoalsMade = 3980;
      i = 0;
      while (i < valuestabfieldsGoalsMade.length) {
        tabfieldsGoalsMade[i] = ((valuestabfieldsGoalsMade[i] - minfieldsGoalsMade) / (maxfieldsGoalsMade - minfieldsGoalsMade)) * 22 + tabassists[i];
        tabfieldsGoalsMadep[i] = valuestabfieldsGoalsMade[i] / maxfieldsGoalsMade;
        ++i;
      }
      minrebounds = 1567;
      maxrebounds = 6131;
      i = 0;
      while (i < valuestabrebounds.length) {
        tabrebounds[i] = ((valuestabrebounds[i] - minrebounds) / (maxrebounds - minrebounds)) * 22 + tabfieldsGoalsMade[i];
        tabreboundsp[i] = valuestabrebounds[i] / maxrebounds;
        ++i;
      }
      minpoints = 2844;
      maxpoints = 10371;
      i = 0;
      while (i < valuestabpoints.length) {
        tabpoints[i] = ((valuestabpoints[i] - minpoints) / (maxpoints - minpoints)) * 22 + tabrebounds[i];
        tabpointsp[i] = valuestabpoints[i] / maxpoints;
        ++i;
      }
      circleRadii = [];
      tabdonnees = [tabpoints, tabrebounds, tabfieldsGoalsMade, tabassists, tabfreeThrow, tabthreePointsMade, tabblocks];
      tabdonneesp = [tabpointsp, tabreboundsp, tabfieldsGoalsMadep, tabassistsp, tabfreeThrowp, tabthreePointsMadep, tabblocksp];
      namedonnee = ["points", "rebounds", "fieldsGoalsMade", "assists", "freeThrow", "threePointsMade", "blocks"];
      i = 0;
      while (i < tabpoints.length) {
        tabtemp = [];
        j = 0;
        while (j < 7) {
          tabtemp.push(tabdonnees[j][i]);
          j++;
        }
        circleRadii.push(tabtemp);
        i++;
      }
      corres = {
        "boston-celtics": {
          x: 250,
          y: 0
        },
        "brooklyn-nets": {
          x: 120,
          y: 0
        },
        "new-york-knicks": {
          x: -10,
          y: 0
        },
        "philadelphia-76ers": {
          x: -140,
          y: 0
        },
        "toronto-raptors": {
          x: -270,
          y: 0
        },
        "atlanta-hawks": {
          x: -400,
          y: 0
        },
        "charlotte-bobcats": {
          x: -530,
          y: 0
        },
        "chicago-bulls": {
          x: -660,
          y: 0
        },
        "cleveland-cavaliers": {
          x: -790,
          y: 0
        },
        "dallas-mavericks": {
          x: -920,
          y: 0
        },
        "denver-nuggets": {
          x: -1050,
          y: 0
        },
        "detroit-pistons": {
          x: -1180,
          y: 0
        },
        "golden-state-warriors": {
          x: -1310,
          y: 0
        },
        "houston-rockets": {
          x: -1440,
          y: 0
        },
        "indiana-pacers": {
          x: -1570,
          y: 201
        },
        "los-angeles-clippers": {
          x: -1700,
          y: 0
        },
        "los-angeles-lakers": {
          x: -1830,
          y: 0
        },
        "memphis-grizzlies": {
          x: -1960,
          y: 0
        },
        "miami-heat": {
          x: -2090,
          y: 0
        },
        "milwaukee-bucks": {
          x: -2220,
          y: 0
        },
        "minnesota-timberwolves": {
          x: -2350,
          y: 0
        },
        "new-orleans-hornets": {
          x: -2480,
          y: 0
        },
        "oklahoma-thunder": {
          x: -2610,
          y: 0
        },
        "orlando-magic": {
          x: -2740,
          y: 0
        },
        "phoenix-suns": {
          x: -2870,
          y: 0
        },
        "portland-blazers": {
          x: -3000,
          y: 0
        },
        "sacramento-kings": {
          x: -3130,
          y: 0
        },
        "san-antonio-spurs": {
          x: -3260,
          y: 0
        },
        "utah-jazz": {
          x: -3390,
          y: 0
        },
        "washington-capitols": {
          x: -3250,
          y: 0
        },
        "washington-wizards": {
          x: -3520,
          y: 0
        }
      };
      degres = [0, 8, 16, 24, 32, 40, 48, 56, 64, 72, 80, 88, 96, 104, 112, 120, 128, 136, 144, 152, 160, 168, 176, 184, 192, 200, 208, 216, 224, 232, 240, 248, 256, 264, 272, 280, 288, 296, 304, 312, 320, 328, 336, 344, 352, 0, 8, 16, 24, 32, 40, 48, 56, 64, 72, 80, 88, 96, 104, 112, 120, 128, 136, 144, 152, 160, 168, 176, 184, 192, 200, 208, 216, 224, 232, 240, 248, 256, 264, 272, 280, 288, 296, 304, 312, 320, 328, 336, 344, 352];
      namedegres = ["1970-1971", "1971-1972", "1972-1973", "1973-1974", "1974-1975", "1975-1976", "1976-1977", "1977-1978", "1978-1979", "1979-1980", "1980-1981", "1981-1982", "1982-1983", "1983-1984", "1984-1985", "1985-1986", "1986-1987", "1987-1988", "1988-1989", "1989-1990", "1990-1991", "1991-1992", "1992-1993", "1993-1994", "1994-1995", "1995-1996", "1996-1997", "1997-1998", "1998-1999", "1999-2000", "2000-2001", "2001-2002", "2002-2003", "2003-2004", "2004-2005", "2005-2006", "2006-2007", "2007-2008", "2008-2009", "2009-2010", "2010-2011"];
      contentg = svgSelection.append("g");
      backgroundarcs = contentg.append("g").attr("class", "backgroundarcs");
      polygonSelection = svgSelection.append("polygon").attr("opacity", 0.1).style("fill", "none").attr("stroke", "#B4B4B4").attr("stroke-miterlimit", 10).attr("points", "80.23,461.186 70.531,184.706 305.299,38.355 549.77,168.483 559.469,444.963 324.701,591.314");
      svgSelection.append("polygon").attr("opacity", 0.1).style("fill", "none").attr("stroke", "#B4B4B4").attr("stroke-miterlimit", 10).attr("points", "176.527,554.5 38.056,315 176.527,75.5 453.473,75.5 591.944,315 453.473,554.5 ");
      svgSelection.append("circle").style("fill", "none").attr("stroke", "#FFFFFF").attr("stroke-width", 4.36).attr("stroke-miterlimit", 10).attr("cx", "315").attr("cy", "314.834").attr("r", "220");
      circleRadiusFrom = 65;
      circleRadiusTo = 60;
      circleCenterDeux = svgSelection.append("circle").style("fill", "#FFFFFF").attr("cx", "315").attr("cy", "314.834").attr("r", circleRadiusFrom).attr("class", "all");
      circlecenter = svgSelection.append("circle").style("fill", "url(#svgbg)").attr("stroke", "#FFFFFF").attr("stroke-width", 1).attr("stroke-miterlimit", 10).attr("cx", "315").attr("cy", "314.834").attr("r", "0").attr("class", "all");
      image = svgSelection.append('defs').append('pattern').attr('id', 'svgbg').attr('patternUnits', 'userSpaceOnUse').attr('width', 3904).attr('height', 250).append('image').attr('xlink:href', '/img/logos/sprite-logo.png').attr('width', 3904).attr('height', 270).attr('x', corres[this.model.get('sluggedName')].x).attr('y', -132);
      $(".all").mouseover(function() {
        circlecenter.transition().attr("r", circleRadiusTo).duration(0).delay(10).ease("elastic");
        circlecenter.transition().attr("r", circleRadiusFrom).duration(900).delay(11).ease("elastic");
        circleCenterDeux.transition().attr("r", circleRadiusTo).duration(0).delay(10).ease("elastic");
        return circleCenterDeux.transition().attr("r", circleRadiusFrom).duration(900).delay(11).ease("elastic");
      });
      $(".all").click(false, hideshow);
      $("ul.legend li").click(false, hideshowlegend);
      arcpoints = d3.svg.arc().innerRadius(function() {
        return 0;
      });
      arcsg = contentg.selectAll("svgSelection").data(circleRadii).enter().append("g").attr("class", "garcs").attr("id", function(d, i) {
        return i;
      });
      d3.selectAll(".garcs").append("path").attr("transform", "translate(315,315)").attr("d", d3.svg.arc().outerRadius(220).startAngle(function(d, i) {
        return ((2 * Math.PI) / tabrebounds.length) * (i + 1) - 0.03;
      }).endAngle(function(d, i) {
        return ((2 * Math.PI) / tabrebounds.length) * (i + 2) - 0.07;
      })).attr("fill", "#2f2f34");
      gtext = arcsg.append("g").attr("transform", function(d, i) {
        return "translate(310,85) rotate(" + (i + 1) * 360 / tabrebounds.length + ",0,230)";
      });
      gtext.append("text").data(namedegres).text(function(d, i) {
        return namedegres[namedegres.length - tabpoints.length + i];
      }).attr("id", "yo").attr("x", "5").attr("y", "15").attr("transform", "rotate(-90)").attr("font-family", "sans-serif").attr("font-size", "10px").attr("fill", "white");
      onclick = {
        year: $(".yearsinfos h4 strong"),
        points: $(".points p span .change"),
        rebounds: $(".rebounds p span .change"),
        fieldgoals: $(".fieldgoals p span .change"),
        assists: $(".assists p span .change"),
        freeThrow: $(".freeThrow p span .change"),
        threepointers: $(".threepointers p span .change"),
        blocks: $(".blocks p span .change"),
        svgGG: d3.selectAll("svg g g")
      };
      d3.selectAll("g g").on("click", function() {
        return launch(this);
      });
      launch = function(elem) {
        onclick.year.html(namedegres[Math.round(elem.id) + (41 - tabpoints.length)]);
        onclick.points.countTo({
          to: valuestabpoints[elem.id],
          from: parseFloat(onclick.points.html()),
          speed: 500,
          refreshInterval: 20
        });
        onclick.rebounds.countTo({
          to: valuestabrebounds[elem.id],
          from: parseFloat(onclick.rebounds.html()),
          speed: 500,
          refreshInterval: 20
        });
        onclick.fieldgoals.countTo({
          to: Math.round(tabfieldsGoalsMadep[elem.id] * 100),
          from: parseFloat(onclick.fieldgoals.html()),
          speed: 500,
          refreshInterval: 20
        });
        onclick.assists.countTo({
          to: valuestabassists[elem.id],
          from: parseFloat(onclick.assists.html()),
          speed: 500,
          refreshInterval: 20
        });
        onclick.freeThrow.countTo({
          to: Math.round(tabfreeThrowp[elem.id] * 100),
          from: parseFloat(onclick.freeThrow.html()),
          speed: 500,
          refreshInterval: 20
        });
        onclick.threepointers.countTo({
          to: Math.round(tabthreePointsMadep[elem.id] * 100),
          from: parseFloat(onclick.threepointers.html()),
          speed: 500,
          refreshInterval: 20
        });
        onclick.blocks.countTo({
          to: Math.round(valuesblocks[elem.id]),
          from: parseFloat(onclick.blocks.html()),
          speed: 500,
          refreshInterval: 20
        });
        loadinformations(elem.id);
        onclick.svgGG.classed("active", false);
        return d3.select(elem).classed("active", true);
      };
      drawfirst();
      launch($('#0')[0]);
      return circlecenter.attr("r", circleRadiusTo).transition().attr("r", circleRadiusTo).duration(1000).delay(200).ease("elastic");
    };

    return DataView;

  })(View);
});
