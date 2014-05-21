var fs = require('fs');
var page = require('webpage').create();
var url = 'file://' + fs.absolute('./index.html');

var svgDrawer = function() {
  var svgContainer = document.getElementById("svg");
  var paper = Raphael(svgContainer, 640, 480);
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

  return svgContainer.innerHTML;
};

page.open(url, function (status) {
  console.log(page.evaluate(svgDrawer));
  phantom.exit();
});
