import * as assert from 'assert'
import { deduct, inquiry } from '../../Application/order.js'

describe('Order', function () {
    describe.skip('asset inquiry', function () {
        it('should success', function () {
            const res = inquiry(11)
            assert.equal(res, true)
        })
        it('should fail', function () {
            const res = deduct(2)
            assert.notEqual(res, false)
        })
    })
    describe('deduction', function () {
        it('should success', function () {
            const res = deduct(1)
            assert.equal(res, 1)
        })
        it('should fail', function () {
            const res = deduct(2)
            assert.notEqual(res, 1)
        })
    })
})