import express from 'express';

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://172.30.1.43:5500');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, DELETE',
  );
  next();
});

app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>Academy</title></head>');
  res.write('<body><h1>Welcom!</h1></body>');
  res.write('</html>');
  res.end();
});

app.get('/test', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>Academy</title></head>');
  res.write('<body><h1>file</h1></body>');
  res.write('</html>');
  res.end();
});

app.get('/test2', (req, res) => {
  res.sendStatus(404);
});

app.post('/formdata', (req, res) => {
  console.log(req.body);
});

// * 처리할 수 없는 경로에 대한 처리
app.use((req, res, next) => {
  res.status(404).send('Not available! 🤯');
});

app.use((error, req, res, next) => {
  console.log(error);
  res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(8080);
