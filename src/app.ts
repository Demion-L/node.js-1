import { createServer, IncomingMessage, ServerResponse } from 'http';
import * as fs from 'fs';
import { host, port, file, encoding } from './constants';

function notFound(res: ServerResponse): void {
  res.writeHead(404, 'Not found\n', { 'Content-Type': 'text/plain' });
  res.end();
}

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
  switch (req.method) {
    case 'GET': {
      fs.readFile(file, encoding, function (err: Error, data: string): void {
        if (err) return console.error(err);
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(data);
      });

      break;
    }
    case 'POST': {
      const message: string = 'Hello World!';
      fs.writeFile(file, message, function (err: Error): void {
        if (err) console.error(err);
        res.end();
      });

      break;
    }
    case 'PATCH': {
      const additionalData: string = 'Hello, Node.js!!!';
      fs.access(file, (err) => {
        if (err) {
          console.error(err);
          return;
        }
        fs.appendFile(file, additionalData, function (err: Error): void {
          if (err) console.error(err);
          res.end();
        });
      });

      break;
    }
    case 'DELETE': {
      fs.unlink(file, function (err: Error) {
        if (err) {
          res.writeHead(404, 'File not found');
          res.write(err);
          res.end();
          console.error(err);
        }
        res.end();
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
