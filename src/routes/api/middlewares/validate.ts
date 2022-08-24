import { Request, Response, NextFunction } from 'express';

const validUrl = (
  req: Request,
  res: Response,
  next: NextFunction
): void | never => {
  const imgname: unknown = req.query.filename;
  const width: unknown = req.query.width;
  const height: unknown = req.query.height;

  if (imgname === undefined || width === undefined || height === undefined) {
    res.status(400).send('Wrong url');
  } else next();
};
export default validUrl;
