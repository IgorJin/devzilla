// @1  itteration with Array.from
// old form
// const giveAway1 = playersCount => {
//   for (let i = playersCount - 1; i >= 0; i--) 
//     // do some playersCount times
// } 

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

// use Array.from
const giveAway = async playersCount => Array.from({ length: playersCount }, async (_, k) => {
  await sleep(1000)
  console.log('do '+k)
  // do some playersCount times
})

async function s() {
  await giveAway(2)
}

s()

// @2 Array.isArray Implementations
Array.prototype.isArray = function(obj) {
  return Object.prototype.toString.call(obj) == "[object Array]";
}

