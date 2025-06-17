import { createServer } from 'http';
import { parse } from 'url';
import { Cache } from './Src/Infrastructure/cache.js';
import { Lock } from './Src/Infrastructure/lock.js';
import { OrderController } from './Src/Controller/orderController.js';
import Redlock from "redlock";
import { EventQueue } from './Src/Infrastructure/eventQueue.js';
import { createClient } from 'redis';
import { router } from './router.js';

// Simulate .env file (no internet to npm i dotenv!)
process.env.STREAM_KEY_WRITE = 'new-order';
process.env.GROUP_NAME = 'order_group';
process.env.PORT = 3000;

// Load Dependencies
const redis = createClient();
redis.on('error', err => console.log('Redis Client Error', err));
await redis.connect();

// Inject dependencies
const eventQueue = new EventQueue(redis, process.env.STREAM_KEY_READ, process.env.STREAM_KEY_WRITE, process.env.GROUP_NAME, process.env.CONSUMER_NAME);
await eventQueue.initStream();
const cache = new Cache(redis);
const lock = new Lock(new Redlock([redis]));

// Instantiate Controller
const orderController = new OrderController(cache, lock, eventQueue);

const server = createServer(async (req, res) => {

    const parsedUrl = parse(req.url, true);
    const path = parsedUrl.pathname;
    if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', async () => {
            try {
                body = JSON.parse(body);
                const result = await router(path, body, orderController);
                res.writeHead(result.status, { 'Content-Type': 'text/plain' });
                res.end(JSON.stringify(result.message));
            } catch (error) {
                console.log("Fatal Error:", error);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Something went wrong!');
            }
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});


server.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}/`);
});