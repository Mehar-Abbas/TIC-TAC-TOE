// main app.js file that starts the web server

const path = require("path")
const http = require("http")
const fs = require("fs")

// port 3000 for running on localhost
// port 8080 for running on the web in OpenShift
const port = process.env.PORT || 3000

// creating the server
const server = http.createServer((req, res) => {

    let filePath = path.join(__dirname, "public", req.url === "/" ? "index.html" : req.url)

    let extension_name = path.extname(filePath)

    let content_type = "text/html"

    switch (extension_name) {
        case ".css" : content_type = "text/css";
            break;
        case ".js" : content_type = "text/javascript";
            break;
        case ".json": content_type = "application/json";
            break;
    }

    fs.readFile(filePath, (err, data) => {
       res.writeHead(200, {"Content-Type": content_type })
        res.end(data, "utf8")
    })

})

server.listen(port, function (error) {
    if(error) {
        console.log("Something went wrong", error)
    } else{
        console.log("Server is listening on port " + port)
    }
})



