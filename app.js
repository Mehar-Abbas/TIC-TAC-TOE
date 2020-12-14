
// -----------------   TIC TAC TOE Game implemented with Node.js using HTML, CSS and JAVASCRIPT  -------------------------------//
// -----------------   It is played by 2-players choosing between 'X' or 'O'                     -------------------------------//

// app.js file that starts the local/web server to serve the application

const path = require("path")
const http = require("http")
const fs = require("fs")

// port 3000 for running on localhost
// port 8080 for running on the web in OpenShift
const port = 8080

// creating the server
const server = http.createServer((req, res) => {

// goto main index.html page at start
let filePath = path.join(__dirname, "public", req.url === "/" ? "index.html" : req.url)

// getting the extension of the file to be loaded
let extension_name = path.extname(filePath)

// set default content-type of the file as .html
let content_type = "text/html"

// set the content-type of the page according to the file for correct rendering of the data
switch (extension_name) {
    case ".css" : content_type = "text/css";
        break;
    case ".js" : content_type = "text/javascript";
        break;
    case ".json": content_type = "application/json";
        break;
    }

// read the file and render in the browser according to its respective content-type
fs.readFile(filePath, (err, data) => {
res.writeHead(200, {"Content-Type": content_type })
res.end(data, "utf8")
 })
})

// server starts listening on the specified port
server.listen(port, function (error) {
    if(error) {
        console.log("Something went wrong", error)
    } else{
        console.log("Server is listening on port " + port)
    }
})



