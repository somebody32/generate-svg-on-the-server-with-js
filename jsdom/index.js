var jsdom = require('jsdom').jsdom;
var fs = require('fs');

var boilerplate = fs.readFileSync('index.html');

var doc = jsdom(boilerplate);
doc.implementation.addFeature(
  'http://www.w3.org/TR/SVG11/feature#BasicStructure', '1.1'
)

var window = doc.parentWindow;

window.onload = function() {
  window.Raphael.prototype.renderfix = function(){};
  var svgContainer = window.document.getElementById('svg');
  var paper = window.Raphael(svgContainer, 640, 480);
  
  paper
    .rect(0, 0, 640, 480, 10)
    .attr({
      fill: '#fff',
      stroke: 'none'
    });

  var circle = paper
                .circle(320, 240, 60)
                .attr({
                  fill: '#223fa3',
                  stroke: '#000',
                  'stroke-width': 80,
                  'stroke-opacity': 0.5
                });

  paper
    .rect(circle.attr('cx') - 10, circle.attr('cy') - 10, 20, 20)
    .attr({
      fill: '#fff',
      stroke: 'none'
    });

  console.log(svgContainer.innerHTML);
};
