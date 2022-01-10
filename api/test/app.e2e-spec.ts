import * as request from 'supertest';

describe('AppController (e2e)', () => {
  jest.setTimeout(30000);

  const app = request('http://localhost:3000/api');

  it('/ (GET)', async () => {
    const response = await app.get('/').expect(200);

    expect(response.body).toEqual({
      message: 'Hello World!',
    });
  });
});
