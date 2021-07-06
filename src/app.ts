import * as Buffer from "buffer";
import {IncomingMessage, ServerResponse} from "http";
import * as http from "http";
import * as fs from "fs";

const host: string = "127.0.0.1";
const port: number = 7000;

function notFound(res) {
  res.statusCode = 404;
  res.setHeader("Content-Type", "text/plain");
  res.end("Not found\n");
}

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
  switch (req.method) {
    case "GET": {
      try {
        fs.readFile("input.txt", "utf-8", function (err: Error, data: Buffer):void {
          if (err) return console.error(err);
          console.log(data.toString());
        });
      } catch (error) {
         console.error(error);
      }

      break;
    }
    case "POST": {
      try {
        let message: string = "Hello World!"
        fs.writeFile("input.txt", message, function (err: Error): void {
          if (err) return console.error(err);
        });
      } catch (error) {
        console.error(error);
      }

      break;
    }
    case "PATCH": {
      try {
        let additionalData: string = "Hello, Node.js!!!"
        fs.appendFile("input.txt", additionalData, function (err: Error): void {
          if (err) return console.error(err);
        });
      } catch (error) {
        console.error(error);
      }

      break;
    }
    case "DELETE": {
      try {
        fs.unlink("input.txt", function (err: Error) {
          if (err) return console.error(err);
           return console.log('File "input.txt" deleted!');
        });
      } catch (error) {
        console.error(error);
      }

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
