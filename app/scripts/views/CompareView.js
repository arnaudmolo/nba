var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['text!templates/Compare.handlebars', 'backbone', '../framework/customForm'], function(templateString, Backbone) {
  var ApplicationView, _ref;

  return ApplicationView = (function(_super) {
    __extends(ApplicationView, _super);

    function ApplicationView() {
      _ref = ApplicationView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    ApplicationView.prototype.events = {
      'change select': 'changeTeam'
    };

    ApplicationView.prototype.changeTeam = function(e) {
      console.log;
      return this.onRendered(this.model, window.NBA.findWhere({
        sluggedName: $(e.currentTarget).val()
      }));
    };

    ApplicationView.prototype.initialize = function() {};

    ApplicationView.prototype.onRender = function() {};

    ApplicationView.prototype.onRendered = function() {};

    ApplicationView.prototype.onClose = function() {};

    ApplicationView.prototype.onClosed = function() {};

    ApplicationView.prototype.close = function(removeElement) {
      if (removeElement == null) {
        removeElement = false;
      }
      if (this.onClose) {
        this.onClose();
      }
      this.undelegateEvents();
      this.$el.removeData().unbind();
      this.$el.empty();
      if (removeElement) {
        this.remove();
      }
      if (this.onClosed) {
        return this.onClosed();
      }
    };

    ApplicationView.prototype.render = function() {
      var data, template;

      this.onRender();
      template = Handlebars.compile(templateString);
      data = {};
      if (typeof this.model !== 'undefined') {
        data = this.model.attributes;
      }
      this.$el.html(template(data));
      return this.onRendered(this.model, window.NBA.models[2]);
    };

    ApplicationView.prototype.onRendered = function(datateam1, datateam2) {
      var difftabpoints2, drawlines, duration, graphSelection, height, i, innerHeight, j, k, svgSelection, tabassists, tabassists2, tabblocks, tabblocks2, tabdonnees, tabdonnees2, tabfieldsGoalsMade, tabfieldsGoalsMade2, tabfreeThrow, tabfreeThrow2, tabmax, tabmax2, tabpoints, tabpoints2, tabrebounds, tabrebounds2, tabthreePointsMade, tabthreePointsMade2, tabvalues, tabvalues2, tabzone, team1, team2, valuesa, valuesa2, valuesb, valuesb2, valuesf, valuesf2, valuesft, valuesft2, valuesp, valuesp2, valuesr, valuesr2, valuest, valuest2, widthpoint, widthwindows, years;

      _.each(datateam1, function(e, i) {
        if (parseInt(i) <= 1969) {
          return delete datateam1[i];
        }
      });
      _.each(datateam2, function(e, i) {
        if (parseInt(i) <= 1969) {
          return delete datateam2[i];
        }
      });
      innerHeight = 490;
      height = innerHeight + 10;
      duration = 1000;
      drawlines = function() {
        var area, area2, circles, circles2, line, lineb, loaddata, offsetLeft, pathEl, pathLength, pathareateam1, pathareateam2, pathteam1, pathteam2, totalLength;

        loaddata = function(datalegend, datalegend2) {
          pathteam1.transition().attr("d", function(d) {
            return area(datalegend);
          }).duration(duration).ease("elastic");
          pathareateam1.transition().duration(duration).ease("elastic").attr("d", function(d) {
            return area(datalegend);
          });
          d3.selectAll(".circlesteam1").transition().duration(duration).ease("elastic").attr("cy", function(d, i) {
            return datalegend[i];
          });
          pathteam2.transition().attr("d", function(d) {
            return area(datalegend2);
          }).duration(duration).ease("elastic");
          pathareateam2.transition().duration(duration).ease("elastic").attr("d", function(d) {
            return area(datalegend2);
          });
          return d3.selectAll(".circlesteam2").transition().duration(duration).ease("elastic").attr("cy", function(d, i) {
            return datalegend2[i];
          });
        };
        line = d3.svg.line().x(function(d, i) {
          return i * widthpoint;
        }).y(function(d, i) {
          return d;
        }).interpolate("ease");
        lineb = d3.svg.line().x(function(d, i) {
          return i * widthpoint;
        }).y(function(d, i) {
          return d;
        }).interpolate("ease");
        pathteam1 = svgSelection.append("path").attr("d", function(d) {
          return line(team1);
        }).attr("stroke", "#b23843").attr("stroke-width", "1").attr("stroke-dasharray", 0).attr("stroke-dashoffset", 0).attr("fill", "rgba(178,56,67,0)");
        pathteam2 = svgSelection.append("path").attr("d", function(d) {
          return lineb(team2);
        }).attr("stroke", "#777caf").attr("stroke-width", "1").attr("stroke-dasharray", 0).attr("stroke-dashoffset", 0).attr("fill", "rgba(178,56,67,0)");
        area = d3.svg.area().x(function(d, i) {
          return i * widthpoint;
        }).y(function(d) {
          return d;
        }).y0(height).interpolate("ease");
        pathareateam1 = svgSelection.append("path");
        area2 = d3.svg.area().x(function(d, i) {
          return i * widthpoint;
        }).y(function(d) {
          return d;
        }).y0(height).interpolate("ease");
        pathareateam2 = svgSelection.append("path");
        totalLength = pathteam1.node().getTotalLength();
        pathteam1.transition().duration(duration).attr("stroke-dasharray", totalLength + " " + totalLength).attr("stroke-dashoffset", totalLength).ease("linear").delay(0).attr("stroke-dashoffset", 0).each("end", function() {
          return pathareateam1.attr("d", function(d) {
            return area(team1);
          }).attr("fill", "rgba(178,56,67,0)").transition().duration(250).ease("linear").attr("fill", "rgba(178,56,67,0.3)");
        });
        pathteam2.transition().duration(duration).attr("stroke-dasharray", totalLength + " " + totalLength).attr("stroke-dashoffset", totalLength).ease("linear").delay(0).attr("stroke-dashoffset", 0).each("end", function() {
          return pathareateam2.attr("d", function(d) {
            return area2(team2);
          }).attr("fill", "rgba(119,124,175,0)").transition().duration(250).ease("linear").attr("fill", "rgba(119,124,175,0.3)");
        });
        circles = svgSelection.selectAll("svgSelection").data(team1).enter().append("circle").attr("class", "circlesteam1").attr("r", "0").attr("stroke", "#FFFFFF").attr("fill", "#b23843").transition().duration(duration).ease("elastic").delay(function(d, i) {
          return i * duration / team1.length;
        }).attr("r", "5").attr("cx", function(d, i) {
          return i * widthpoint;
        }).attr("cy", function(d) {
          return d;
        });
        circles2 = svgSelection.selectAll("svgSelection").data(team2).enter().append("circle").attr("class", "circlesteam2").attr("stroke", "#FFFFFF").attr("r", "0").attr("fill", "#777caf").transition().duration(duration).ease("elastic").delay(function(d, i) {
          return i * duration / team1.length;
        }).attr("r", "5").attr("cx", function(d, i) {
          return i * widthpoint;
        }).attr("cy", function(d) {
          return d;
        });
        $("ul li.general").click(false, function() {
          return loaddata(team1, team2);
        });
        $("ul li.points").click(false, function() {
          return loaddata(tabpoints, tabpoints2);
        });
        $("ul li.rebounds").click(false, function() {
          return loaddata(tabrebounds, tabrebounds2);
        });
        $("ul li.fieldsGoalsMade").click(false, function() {
          return loaddata(tabfieldsGoalsMade, tabfieldsGoalsMade2);
        });
        $("ul li.assists").click(false, function() {
          return loaddata(tabassists, tabassists2);
        });
        $("ul li.freeThrow").click(false, function() {
          return loaddata(tabfreeThrow, tabfreeThrow2);
        });
        $("ul li.threePointsMade").click(false, function() {
          return loaddata(tabthreePointsMade, tabthreePointsMade2);
        });
        $("ul li.blocks").click(false, function() {
          return loaddata(tabblocks, tabblocks2);
        });
        [tabpoints, tabrebounds, tabfieldsGoalsMade, tabassists, tabfreeThrow, tabthreePointsMade, tabblocks];
        line = svgSelection.append("line").attr("x2", 0).attr("y2", height).style("stroke", "#b23843").style("stroke-width", "2");
        pathEl = pathteam1.node();
        pathLength = pathEl.getTotalLength();
        offsetLeft = document.getElementById("graphcompareteam").offsetLeft;
        return svgSelection.on("mousemove", function() {
          var beginning, end, i, pos, target, x;

          x = d3.event.pageX;
          i = 0;
          while (i < tabzone.length) {
            if (x > tabzone[i] && x < tabzone[i + 1]) {
              $("#valuehover p").html(Math.round(-(team1[i] - height) / 2) + "    " + Math.round(-(team2[i] - height) / 2) + "         " + years[years.length - team1.length + i]);
            }
            i++;
          }
          beginning = x;
          end = pathLength;
          target = void 0;
          while (true) {
            target = Math.floor((beginning + end) / 2);
            pos = pathEl.getPointAtLength(target);
            if ((target === end || target === beginning) && pos.x !== x) {
              break;
            }
            if (pos.x > x) {
              end = target;
            } else if (pos.x < x) {
              beginning = target;
            } else {
              break;
            }
          }
          return line.attr("y1", 0).attr("x1", x).attr("x2", x).attr("y2", height);
        });
      };
      team1 = [];
      tabpoints = [];
      tabrebounds = [];
      tabfieldsGoalsMade = [];
      tabassists = [];
      tabfreeThrow = [];
      tabthreePointsMade = [];
      tabblocks = [];
      valuesp = [];
      valuesr = [];
      valuesf = [];
      valuesa = [];
      valuesft = [];
      valuest = [];
      valuesb = [];
      tabvalues = [valuesp, valuesr, valuesf, valuesa, valuesft, valuest, valuesb];
      tabdonnees = [tabpoints, tabrebounds, tabfieldsGoalsMade, tabassists, tabfreeThrow, tabthreePointsMade, tabblocks];
      tabmax = [];
      $.each(datateam1.get('years'), function() {
        valuesp.push(this.points);
        valuesr.push(this.rebounds);
        valuesf.push(this.fieldsGoalsMade);
        valuesa.push(this.assists);
        valuesft.push(this.freeThrow);
        valuest.push(this.threePointsMade);
        return valuesb.push(this.blocks);
      });
      i = 0;
      while (i < 7) {
        tabmax.push(Math.max.apply(null, tabvalues[i]));
        i++;
      }
      j = 0;
      while (j < 7) {
        i = 0;
        while (i < tabvalues[j].length) {
          tabdonnees[j][i] = (tabvalues[j][i] / tabmax[j]) * -innerHeight + height;
          ++i;
        }
        j++;
      }
      i = 0;
      while (i < tabpoints.length) {
        team1.push((tabpoints[i] + tabrebounds[i] + tabfieldsGoalsMade[i] + tabassists[i] + tabfreeThrow[i] + tabthreePointsMade[i] + tabblocks[i]) / 7);
        i++;
      }
      team2 = [];
      tabpoints2 = [];
      tabrebounds2 = [];
      tabfieldsGoalsMade2 = [];
      tabassists2 = [];
      tabfreeThrow2 = [];
      tabthreePointsMade2 = [];
      tabblocks2 = [];
      valuesp2 = [];
      valuesr2 = [];
      valuesf2 = [];
      valuesa2 = [];
      valuesft2 = [];
      valuest2 = [];
      valuesb2 = [];
      tabvalues2 = [valuesp2, valuesr2, valuesf2, valuesa2, valuesft2, valuest2, valuesb2];
      tabdonnees2 = [tabpoints2, tabrebounds2, tabfieldsGoalsMade2, tabassists2, tabfreeThrow2, tabthreePointsMade2, tabblocks2];
      tabmax2 = [];
      $.each(datateam2.get('years'), function() {
        valuesp2.push(this.points);
        valuesr2.push(this.rebounds);
        valuesf2.push(this.fieldsGoalsMade);
        valuesa2.push(this.assists);
        valuesft2.push(this.freeThrow);
        valuest2.push(this.threePointsMade);
        return valuesb2.push(this.blocks);
      });
      i = 0;
      while (i < 7) {
        tabmax2.push(Math.max.apply(null, tabvalues2[i]));
        i++;
      }
      if (valuesp.length > valuesp2.length) {
        difftabpoints2 = valuesp.length - valuesp2.length;
        j = 0;
        while (j < 7) {
          k = 0;
          while (k < difftabpoints2) {
            tabdonnees2[j].push(height);
            k++;
          }
          j++;
        }
      }
      j = 0;
      while (j < 7) {
        i = 0;
        while (i < tabvalues2[j].length) {
          tabdonnees2[j].push((tabvalues2[j][i] / tabmax2[j]) * -innerHeight + height);
          ++i;
        }
        j++;
      }
      i = 0;
      while (i < tabpoints2.length) {
        team2.push((tabpoints2[i] + tabrebounds2[i] + tabfieldsGoalsMade2[i] + tabassists2[i] + tabfreeThrow2[i] + tabthreePointsMade2[i] + tabblocks2[i]) / 7);
        i++;
      }
      years = ["1970-1971", "1971-1972", "1972-1973", "1973-1974", "1974-1975", "1975-1976", "1976-1977", "1977-1978", "1978-1979", "1979-1980", "1980-1981", "1981-1982", "1982-1983", "1983-1984", "1984-1985", "1985-1986", "1986-1987", "1987-1988", "1988-1989", "1989-1990", "1990-1991", "1991-1992", "1992-1993", "1993-1994", "1994-1995", "1995-1996", "1996-1997", "1997-1998", "1998-1999", "1999-innerHeight0", "innerHeight0-innerHeight1", "innerHeight1-innerHeight2", "innerHeight2-innerHeight3", "innerHeight3-innerHeight4", "innerHeight4-innerHeight5", "innerHeight5-innerHeight6", "innerHeight6-innerHeight7", "innerHeight7-innerHeight8", "innerHeight8-innerHeight9", "innerHeight9-2010", "2010-2011"];
      graphSelection = d3.select("#graphcompareteam");
      widthwindows = window.innerWidth;
      widthpoint = widthwindows / (team1.length - 1);
      svgSelection = void 0;
      tabzone = [0];
      i = 0;
      while (i < team1.length) {
        tabzone.push(widthpoint * i + (widthpoint / 2));
        i++;
      }
      window.addEventListener("resize", function() {
        var _results;

        d3.selectAll("svg").remove();
        svgSelection = graphSelection.append("svg").attr("width", "100%").attr("height", height);
        widthwindows = window.innerWidth;
        widthpoint = widthwindows / (team1.length - 1);
        drawlines();
        widthwindows = window.innerWidth;
        tabzone = [];
        i = 0;
        _results = [];
        while (i < team1.length) {
          tabzone.push(widthpoint * i + (widthpoint / 2));
          _results.push(i++);
        }
        return _results;
      });
      console.log(team1);
      svgSelection = graphSelection.append("svg").attr("width", "100%").attr("height", height);
      return drawlines();
    };

    return ApplicationView;

  })(Backbone.View);
});
