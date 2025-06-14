import * as assert from 'assert'
import * as order from '../../Application/order.js'
import { cache } from '../../Infrastructure/cache.js'

// Init cache
const Cache = new cache()
await Cache.init()

// Start tests
describe('Order', async function () {
    describe('asset inquiry', async function () {
        before("init cache", function () {
            Cache.setAsset(10)
        })
        it('should success', async function () {
            const res = await order.canBuy(2, Cache)
            assert.equal(res, true)
        })
        it('should fail', async function () {
            const res = await order.canBuy(11, Cache)
            assert.equal(res, false)
        })
    })
    describe('deduction', async function () {
        before("init cache", async function () {
            await Cache.setAsset(10)
        })
        it('should success', async function () {
            const res = await order.deduct(1, Cache)
            assert.equal(res, 9)
        })
        it('should fail', async function () {
            const res = await order.deduct(2, Cache)
            assert.equal(res, 7)
        })
    })
})