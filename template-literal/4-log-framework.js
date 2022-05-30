const isDeepEqual = (object1, object2) => {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);
  if (keys1.length !== keys2.length) {
    return false;
  }
  for (const key of keys1) {
    const val1 = object1[key];
    const val2 = object2[key];
    const areObjects = isObject(val1) && isObject(val2);
    if (
      areObjects && !deepEqual(val1, val2) ||
      !areObjects && val1 !== val2
    ) {
      return false;
    }
  }
  return true;
}
function isObject(object) {
  return object != null && typeof object === 'object';
}
const formatToString = param => JSON.stringify(param).slice(0, 30)

/* MAIN FUNCTION */
const print = (commands, ...templateData) => {
  let targetEl
  let actionOfCommand = () => {}
  let resultOfCommand = ''

  const CONTROLS = {
    compare: {
      action: (a, b) => {
        if (!(a && b)) return 'command "COMPARE" need two and more arguments'
  
        return `${(formatToString(a))} and ${formatToString(b)} is ${isDeepEqual(a, b) ? 'equal' : 'different'}`
      }
    },
    unite: {
      action: (a, b) => {
        if (!(a && b)) return 'command "UNITE" need two and more arguments'
  
        if (typeof a  !== typeof b) return a

        const operandType = typeof a
  
        const OPERATION_BY_TYPE = {
          number: (a, b) => (a+b),
          string: (a, b) => (a+b),
          boolean: (a, b) => (a || b),
          object: (a, b) => Array.isArray(a) ? ([...a, ...b]) : ({...a, ...b}),
        }
  
        const operations = Object.keys(OPERATION_BY_TYPE)

        console.log('==== ', operations.includes(operandType), a, b, JSON.stringify(OPERATION_BY_TYPE[operandType](a, b)))
  
        return operations.includes(operandType) ? formatToString(OPERATION_BY_TYPE[operandType](a, b)) : `type ${operandType} not found`
      }
    },
  }

  const generalCommands = Object.keys(CONTROLS)
  const uniteSymbol = '&'
  const AVAILABLE_COMMANDS = [...generalCommands, uniteSymbol] // rewrite

  const commandSetReduceCallback = (templateData) => (acc, command, idx, arr) => {
    const param = templateData[idx]
    let args = []
    console.log('START');
    console.log('---------------', param, command, command in CONTROLS)
  
    if (command in CONTROLS) {
      const { action } = CONTROLS[command]
  
      actionOfCommand = action
      targetEl = param
      args = [targetEl]
      acc.push(resultOfCommand)
      resultOfCommand = ''
    } else if (command === uniteSymbol) {
      args = [targetEl, param]
    } else {
      return acc
    }

    console.log('action func result');
    console.log('result ', actionOfCommand(...args), '||||all args ', ...args)
    resultOfCommand = actionOfCommand(...args)
    
    if (idx === arr.length - 1) {
      acc.push(resultOfCommand)
    }
  
    return  acc 
  }

  const makeCommandSet = (commands) => commands
    .map(
      command => command.split(' ').map(v => v.replace(/\s/g, '')).filter(v => v.length && AVAILABLE_COMMANDS.includes(v))
    )
    .filter(c => c.length)
    .flat()

  const commandSet = makeCommandSet(commands)
  console.log("🚀 ~ file: 4-own-test-framework.js ~ line 47 ~ return ~ commandSet", commandSet)

  // create result string
  const res = commandSet
    .reduce(commandSetReduceCallback(templateData), [])
    .filter(Boolean)
    .join(' | ')

  console.log("\u001b[1;32m"+res+'\u001b[0m');

  // cArg = [arg]
  // cFn = func
  // tempRes = cFn(...cArg) 

  // -> func || end => acc += tempRes  and repeat
  // -> & cArgs = [cArg, arg] cFn = cFn(cArg, arg)

  /*
    [compare] => 1 isEqual 2 ? is equal : is different. 1 in chain
    [unite] => if same type ? unite : 1 and error. result or 1
    [keep] => keep in cache
    [get] => get from cache
  */

  // console.log(commands, templateData)
}

// EXAMPLE
const fObject = {x: 12}
const sObject = {x: 12, y: 'hi second'}
const trdObject = { length: 12 }

// const print = createPrint()

// print`compare errorWord ${fObject}&${sObject}`
// print`compare ${fObject}`
print`compare ${fObject}&${sObject} unite ${fObject}&${trdObject}`
