
import path from 'path';
import routes from './routes/api/index';
import express from 'express';

const app = express();
const port = 3001;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use('/api/images', routes);


app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});

export default app;
