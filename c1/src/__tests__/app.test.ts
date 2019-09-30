import request from 'supertest';
import { app } from '../app';
import path from 'path';
import * as nats from '../generals/nats';

jest.mock('../generals/nats');

describe('query controller', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

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

  it('should call sendMessage when called with valid parameters', async () => {
    const filePath = path.join(__dirname, '../../assets/github.png');
    const mockedSendMessage = nats.sendMessage as jest.Mock;
    mockedSendMessage.mockImplementationOnce(() => 'GUID');

    await request(app)
      .post('/query')
      .attach('image', filePath);

    expect(mockedSendMessage).toHaveBeenCalledTimes(1);
    expect(mockedSendMessage.mock.calls[0][0].originalname).toBe('github.png');
  });
});
