import sharp from 'sharp';

const resize = async (
  fileInPath: string,
  fileOutPath: string,
  width: unknown,
  height: unknown
): Promise<string> => {
    try{
  console.log(fileInPath);
  sharp(fileInPath)
    .resize(parseInt(width as string), parseInt(height as string))
    .toFile(fileOutPath);
  return fileOutPath;
    }catch(err)
    {
        console.log(err);
        throw new Error('error while resizing');
    }
};
export default resize;
