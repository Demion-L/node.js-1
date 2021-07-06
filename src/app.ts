const http = require("http"),
  fs = require("fs");

const host = "127.0.0.1";
const port = 7000;

function notFound(res) {
  res.statusCode = 404;
  res.setHeader("Content-Type", "text/plain");
  res.end("Not found\n");
}

const server = http.createServer((req, res) => {
  switch (req.method) {
    case "GET": {
      try {
        fs.readFile("input.txt", function (err, data) {
          if (err) return console.error(err);
          console.log(data.toString());
        });
      } catch (error) {
         console.error(error);
      }

      break;
    }
    case "POST": {
       
      break;
    }
    case "PATCH": {
      break;
    }
    case "DELETE": {
      break;
    }
    default: {
      notFound(res);
      break;
    }
  }
});

server.listen(port, host, () => {
  console.log(`Server listens http://${host}:${port}`);
});
