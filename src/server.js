import app from './app';

const port = 3333;

app.listen(port, () => {
  console.log(`App is listening at http://localhost:${port}`);
});
