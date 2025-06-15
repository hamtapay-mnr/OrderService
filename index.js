import { createServer } from 'http';
import { parse } from 'url';
import { Cache } from './Src/Infrastructure/cache.js';
import { Lock } from './Src/Infrastructure/lock.js';
import { OrderController } from './Src/Controller/orderController.js';
import Redlock from "redlock";
import { PubSub } from './Src/Infrastructure/eventQueue.js';
import { createClient } from 'redis';
import { router } from './Src/Controller/orderRoutes.js';

// Load Dependencies
const redis = createClient();
redis.on('error', err => console.log('Redis Client Error', err));
await redis.connect();

// Inject dependencies
const pubSub = new PubSub(redis);
const cache = new Cache(redis);
const lock = new Lock(new Redlock([redis]));

// Instantiate Controller
const orderController = new OrderController(cache, lock, pubSub);

const server = createServer(async (req, res) => {
    const parsedUrl = parse(req.url, true);
    const path = parsedUrl.pathname;
    if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', async () => {
            body = JSON.parse(body);
            const result = await router(path, body, orderController);
            res.writeHead(result.status, { 'Content-Type': 'text/plain' });
            res.end(JSON.stringify(result.message));
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});


const port = 3000;
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});