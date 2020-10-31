const http = require('http');
const PORT = 5000;

const mockData = [
  { id: 1, text: 'blablabla' },
  { id: 2, text: 'qwerty' },
  { id: 3, text: 'ssssssss' },
  { id: 4, text: 'dddddd' },
  { id: 5, text: 'zzzzzz' },
];

const server = http.createServer((req, res) => {
  const { headers, url, method } = req;

  /*console.log(
    `Headers: ${JSON.stringify(
      headers,
      null,
      2
    )}, url: ${url}, method: ${method}`
  );*/

  /*
  res.statusCode = 404;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('X-Powered-By', 'Node.JS');
  */
  /*res.writeHead(400, {
    'Content-Type': 'application/json',
    'X-Powered-By': 'Node.JS',
  });*/

  let body = [];
  req
    .on('data', (chunk) => {
      body.push(chunk);
    })
    .on('end', () => {
      body = Buffer.concat(body).toString();

      let status = 404;
      const response = {
        success: false,
        data: null,
      };

      if (method === 'GET' && url === '/text') {
        status = 200;
        response.success = true;
        response.data = mockData;
        response.error = null;
      } else if (method === 'POST' && url === '/text') {
        const { id, text } = JSON.parse(body);

        if (!id || !text) {
          status = 400;
          response.error = 'Please add some data';
        } else {
          mockData.push({ id, text });
          status = 201;
          response.success = true;
          response.data = mockData;
          response.error = null;
        }
      }

      res.writeHead(status, {
        'Content-Type': 'application/json',
        'X-Powered-By': 'Node.JS',
      });

      res.end(JSON.stringify(response, null, 2));
    });

  /*res.end(
    JSON.stringify(
      {
        success: false,
        error: 'not found',
        data: null,
      },
      null,
      2
    )
  );*/
});

server.listen(PORT, () => console.log(`Server Running on Port ${PORT}`));
