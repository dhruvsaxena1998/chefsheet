import * as request from 'supertest';

describe('SubCategoryController (e2e)', () => {
  jest.setTimeout(30000);

  const app = request('http://localhost:3000/api/sub-categories');

  it('/ (POST)', async () => {
    const requestBody = {};
  });
});
