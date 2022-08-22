import { app } from './app';

const port = 4003 || process.env.PORT;

app.listen(port, () => console.log('🖌️  Server Online!'));
