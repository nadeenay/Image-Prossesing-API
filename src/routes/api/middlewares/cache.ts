import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';

const Exist = (
  req: Request,
  res: Response,
  next: NextFunction
): void | string => {
  try {
    const imgname: unknown = req.query.filename;
    const width: unknown = req.query.width;
    const height: unknown = req.query.height;
    const fileOutPath = path.join(
      __dirname,
      '..',
      '..',
      '..',
      'public',
      'thumb',
      (imgname + '_' + `${width}` + '_' + `${height}.jpg`) as string
    );
    if (fs.existsSync(fileOutPath)) {
      res.status(200).sendFile(fileOutPath);
    } else {
      next();
    }
  } catch (err) {
    console.log('helooo from cach');
    throw new Error(err as string);
  }
};
export default Exist;
