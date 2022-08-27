import express, { Request, Response } from 'express';
import validUrl from './middlewares/validate';
import path from 'path';
import sharp from 'sharp';
import { promises as fs } from 'fs';

const routes = express.Router();
routes.use(express.static(path.join(__dirname, '..', '..', 'public')));
routes.get('/', validUrl, async (req: Request, res: Response) => {
  try {
    //if the URL valid and the file doesn't exist , then resize
    const imgname: unknown = req.query.filename;
    const width: unknown = req.query.width;
    const height: unknown = req.query.height;

    const fileInPath = path.join(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      'public',
      'images',
      (imgname + '.jpg') as string
    );
    const fileOutPath = path.join(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      'public',
      'thumb',
      (imgname + '_' + `${width}` + '_' + `${height}` + '.jpg') as string
    );
    await sharp(fileInPath)
      .resize(parseInt(width as string), parseInt(height as string))
      .toBuffer()
      .then((data) => {
        fs.writeFile(fileOutPath, data).then(() => {
          res.status(200).sendFile(fileOutPath);
        });
      });
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
});

export default routes;
