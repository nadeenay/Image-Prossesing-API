import { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';

const validUrl = (
  req: Request,
  res: Response,
  next: NextFunction
): void | never => {

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

  if (imgname === undefined || width === undefined || height === undefined) {
    res.status(400).send('Wrong url');
  } else if (fs.existsSync(fileInPath)) {
    next();
  } else {
    res.status(400).send('Image not exist');
  }
};
export default validUrl;
