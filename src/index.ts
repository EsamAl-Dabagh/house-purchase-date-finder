import { app } from './app/app';

const port: string = '8000';

app.listen(port, () => {
  return console.log(`Server is listening on port ${port}`);
});
