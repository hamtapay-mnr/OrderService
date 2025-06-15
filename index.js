import { createServer } from 'http';
import { parse } from 'url';
import { Cache } from './Src/Infrastructure/cache.js';
import { Lock } from './Src/Infrastructure/lock.js';
import { OrderController } from './Src/Controller/orderController.js';
import Redlock from "redlock";

// Initiate Objects
const cache = new Cache();
await cache.init();
const redlock = new Redlock([cache]);
const lock = new Lock(redlock);
const orderController = new OrderController(cache, lock);

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
            let result = false;
            if (path === '/buy')
                result = await orderController.makeOrder(body.amount);
            if (path === '/add')
                result = await orderController.setAsset(body.amount);
            if (result) {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end('Done!');
            } else {
                res.writeHead(500, { 'Content-Type': 'text/html' });
                res.end('Failed!');
            }
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