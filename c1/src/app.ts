import express from 'express';
import multer from 'multer';
import { sendMessage } from './generals/nats';

const app = express();
const upload = multer();

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
  const imageSize = firstImage.size / Math.pow(1024, 1);

  await sendMessage(firstImage);

  return response.status(200).send({
    status: 'SUCCESS',
    size: `${imageSize.toFixed(2)}kb`,
  });
});

export { app };
