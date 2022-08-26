import { app } from './app';

const port = 4003 || process.env.PORT;

app.get("/", (request: Request, response: Response) => {
    return response.send("🖌️  Server Online!");
})

app.listen(port, () => console.log('🖌️  Server Online!'));
