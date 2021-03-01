import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { sendMessage } from './generals/nats';

const app = express();
const upload = multer();
const storagePath = path.join(__dirname, '../storage');

app.use('/images', express.static(storagePath));
app.get('/images', (req, response) => {
  fs.readdir(storagePath, (err, files) => {
    if (err) {
      return response.send({ data: [] });
    }

    const url = `${req.protocol}://${req.get('host')!}${req.originalUrl}`;
    const fileList = Array.isArray(files)
      ? files.map((file) => ({
          name: file,
          url: `${url}${file}`,
        }))
      : [];

    return response.send({ data: fileList });
  });
});

app.post('/query', upload.any(), async (request, response) => {
  if (!Array.isArray(request.files) || request.files.length === 0) {
    return response.status(400).send({
      error: {
        code: 'BAD_REQUEST',
        message: 'Missing or invalid parameters',
      },
    });
  }

  const [firstImage] = request.files;
  const imageSize = firstImage.size / 1024 ** 1;

  await sendMessage(firstImage);

  return response.status(200).send({
    status: 'SUCCESS',
    size: `${imageSize.toFixed(2)}kb`,
  });
});

export { app };
