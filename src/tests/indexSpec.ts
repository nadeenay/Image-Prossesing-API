import supertest from 'supertest';
import app from '../index';

const request = supertest(app);

describe('test /api/images end point', () => {
  it('test the resize endpoint & resize function ', async () => {
    const res = request.get('/api/images?filename=fjord&width=50&height=50');
    expect((await res).status).toBe(200);
  });
});

describe('test valid url ', () => {
  it('test the resize endpoint', async () => {
    const res = request.get('/api/images?width=300&height=300');
    expect((await res).status).toBe(400);
  });
});
