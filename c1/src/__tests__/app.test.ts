import request from 'supertest';
import { app } from '../app';
import path from 'path';

describe('query controller', () => {
  it('should return success and size on proper request', async () => {
    const filePath = path.join(__dirname, '../../assets/github.png');

    const response = await request(app)
      .post('/query')
      .attach('image', filePath);

    expect(response.body).toMatchSnapshot();
  });

  it('should return BAD_REQUEST on missing image', async () => {
    const response = await request(app).post('/query');

    expect(response.body).toMatchSnapshot();
  });
});
