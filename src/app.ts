import { createServer ,IncomingMessage, ServerResponse} from "http";
import * as fs from "fs";

const host: string = "127.0.0.1";
const port: number = 7000;

function notFound(res):void {
  res.statusCode = 404;
  res.setHeader("Content-Type", "text/plain");
  res.end("Not found\n");
}

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
  switch (req.method) {
    case "GET": {

        fs.readFile("input.txt", "utf-8", function (err: Error, data: string):void {
          if (err) return console.error(err);
          res.writeHead(200, {"Content-Type": "text/plain"})
          res.end(data)
        });

      break;
    }
    case "POST": {

        const message: string = "Hello World!"
        fs.writeFile("input.txt", message, function (err: Error): void {
          if (err) return console.error(err);
          res.end()
        });

      break;
    }
    case "PATCH": {

        const additionalData: string = "Hello, Node.js!!!"
        fs.appendFile("input.txt", additionalData,{flag: "r+"}, function (err: Error): void {
          if (err)  console.error(err);
          res.end()
        });

      break;
    }
    case "DELETE": {

        fs.unlink("input.txt", function (err: Error) {
          if (err) return console.error(err);
          res.end()
        });

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
