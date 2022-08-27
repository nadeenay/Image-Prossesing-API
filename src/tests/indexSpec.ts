import supertest from 'supertest';
import app from '../index';
import path from 'path';
import resize from '../../utilities/resizeImg';

const request = supertest(app);

describe('test /api/images end point', () => {
  it('test the resize endpoint ', async () => {
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

describe('test resize function', () => {
  it('test the resize function should return the file path without any error', async () => {
    const fileInPath = path.join(
      __dirname,
      '..',
      '..',
      '..',
      'public',
      'images',
      ('fjord' + '.jpg') as string
    );
    const fileOutPath = path.join(
      __dirname,
      '..',
      '..',
      '..',
      'public',
      'thumb',
      ('fjord' + '_' + '20' + '_' + '20' + '.jpg') as string
    );
    const exfile = await resize(fileInPath, fileOutPath, 20, 20);
    expect(exfile).toBe(fileOutPath);
  });
});
