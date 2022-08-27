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
    '..',
    'public',
    'thumb',
    (imgname + '_' + `${width}` + '_' + `${height}.jpg`) as string
  );

  if (imgname === undefined || width === undefined || height === undefined || !fs.existsSync(fileInPath)) {
    res.status(400).send('Wrong url');
  } else if (fs.existsSync(fileOutPath)) {
    res.status(200).sendFile(fileOutPath);
  } else {
    next();
  }
};
export default validUrl;

