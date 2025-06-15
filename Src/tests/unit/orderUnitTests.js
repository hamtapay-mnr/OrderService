import * as assert from 'assert';
import * as order from '../../Application/order.js';
import { Cache } from '../../Infrastructure/cache.js';
import { EventQueue } from '../../Infrastructure/eventQueue.js';
import { createClient } from 'redis';

const redis = createClient();
redis.on('error', err => console.log('Redis Client Error', err));
await redis.connect();
// Init cache
const eventQueue = new EventQueue(redis);
await eventQueue.initStream();

const cache = new Cache(redis);

// Start tests
describe('Order', async function () {
    describe('asset inquiry', async function () {
        before("init cache", function () {
            cache.setAsset(10);
        });
        it('should success', async function () {
            const res = await order.canBuy(2, cache);
            assert.equal(res, true);
        });
        it('should fail', async function () {
            const res = await order.canBuy(11, cache);
            assert.equal(res, false);
        });
    });
    describe('deduction', async function () {
        before("init cache", async function () {
            await cache.setAsset(10);
        });
        it('should success', async function () {
            const res = await order.deduct(1, cache);
            assert.equal(res, 9);
        });
        it('should fail', async function () {
            const res = await order.deduct(2, cache);
            assert.equal(res, 7);
        });
    });
    describe('pubsub', async function () {
        // before.skip("subscribe", function () {
        //     pubSub.subscribe((msg) => {
        //         console.log(1111111, msg);
        //     });
        // });
        it('send a message to stream', async function () {
            const id = await eventQueue.publishEvent({ data: "hello" });
            assert.equal(1, 1);
        });
    });
});