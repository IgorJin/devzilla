// example

/* MAIN FUNCTION */
const print = (commands, ...templateData) => {
  commands.replace(/\s/g, '').split('|');
  console.log(commands, templateData)
}

const fObject = {x: 12}
const sObject = {x: 12, y: 'hi second'}
const trdObject = {add: (a, b) => (a + b)}

print`compare ${fObject}&${sObject} unite with ${trdObject} keep`

const commands = [
  'compare',
  'unite',
  'put',
  'keep',
  'get',
]

/*
  [compare] => 1 isEqual 2 ? is equal : is different. 1 in chain
  [unite] => if same type ? unite : 1 and error. result or 1
  [put] => if same type ? unite : 1 and error. result or 1
  [keep] => keep in cache
  [get] => get from cache
*/