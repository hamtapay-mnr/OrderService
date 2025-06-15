
export class Lock {
    constructor(locker) {
        this.locker = locker;
    }
    lock(timeout = 1000) {
        return this.locker.acquire(["buy-lock"], timeout);
        // return this.locker.lock("buy-lock", timeout);
    }
    unlock(lockObj) {
        return lockObj.release();
    }
}