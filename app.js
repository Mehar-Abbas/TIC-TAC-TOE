const path = require("path")
const http = require("http")
const fs = require("fs")

const port = 8080
//
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
//-----------------------------------------------------------------------------------

    // // extension
    //
    //
    // res.writeHead(200, {"Content-Type":"text/html"})
    //
    // fs.readFile("index.html", "utf8", function (error, data){
    //     if (error) {
    //         res.writeHead(404)
    //         res.write("Error: file not found")
    //     }  else {
    //         res.write(data)
    //     }
    //     res.end()
    // })
    // //

//---------------------------------------


server.listen( port, function (error) {
    if(error) {
        console.log("something went wrong", error)
    } else{
        console.log("Server is listening on port " + port)
    }
})



