"PhantomJS as server" solution
==================================

1. Install [PhantomJS](http://phantomjs.org/download.html)
1. Run the script: `phantomjs server.js`
1. Make a request to the server:
```
curl -X POST -d @payload.json \
-H "Content-Type: application/json" localhost:9494 > result.svg
```
