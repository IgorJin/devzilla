class CustomPromise {
  constructor(promiseFn) {
    this.promiseFn = promiseFn
  }

  then(resolve) {
    this.resolve = resolve
    this.promiseFn(this.resolve)
  }

  CURRENT_STATE = 'WAITING'
  STATES = ['CREATED', 'WAITING', 'FINISHED']
}

const sleep = new CustomPromise((res) => setTimeout(res, 1000))
sleep.then(() => console.log('After sleep'))