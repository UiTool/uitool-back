import { app } from './app';

const port = process.env.PORT || 4003;

app.listen(port, () => console.log('🖌️  Server Online!'));
