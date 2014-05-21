var port, server, service, page, url, svgDrawer
    fs = require('fs');

port = 9494;
server = require('webserver').create();

page = require('webpage').create();
url = 'file://' + fs.absolute('./index.html');

svgDrawer = function(data) {
  var svgContainer = document.getElementById("svg");
  var paper = Raphael(svgContainer, 640, 480);
  paper
    .rect(data.x, data.y, 640, 480, 10)
    .attr({
      fill: '#fff',
      stroke: 'none'
    });
  var circle = paper
                .circle(data.x/2, data.y/2, 60)
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
}

service = server.listen(port, function (request, response) {
  var drawerPayload = JSON.parse(request.post).data;
  page.open(url, function (status) {
    var svg = page.evaluate(svgDrawer, drawerPayload);

    response.statusCode = 200;
    response.write(svg);
    response.close();
  });
});

if (service) {
  console.log('Web server running on port ' + port);
} else {
  console.log('Error: Could not create web server listening on port ' + port);
  phantom.exit();
}
