import express from 'express';
import path from 'path';

import multer from 'multer';

const app = express();
const __dirname = path.resolve();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://172.30.1.43:5500');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, DELETE',
  );
  next();
});

const upload = multer({
  dest: __dirname + '/uploads/', // 이미지 업로드 경로
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

app.post('/formdata', upload.single('file'), (req, res) => {
  const {
    fieldname,
    originalname,
    encoding,
    mimetype,
    destination,
    filename,
    path,
    size,
  } = req.file;
  const { name } = req.body;

  console.log('body 데이터 : ', name);
  console.log('폼에 정의된 필드명 : ', fieldname);
  console.log('사용자가 업로드한 파일 명 : ', originalname);
  console.log('파일의 엔코딩 타입 : ', encoding);
  console.log('파일의 Mime 타입 : ', mimetype);
  console.log('파일이 저장된 폴더 : ', destination);
  console.log('destinatin에 저장된 파일 명 : ', filename);
  console.log('업로드된 파일의 전체 경로 ', path);
  console.log('파일의 바이트(byte 사이즈)', size);

  res.json({ ok: true, data: 'Single Upload Ok' });
});
app.post('/formdata', (req, res) => {
  console.log(req.body);
  res.end();
  // res.sendFile(__dirname + '/result.html');
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
