const CONTROLS = {
  compare: {
    action: (a, b) => {
      if (!(a && b)) return 'command "COMPARE" need two and more arguments'

      return a === b ? 'is equal' : 'is different'
    }
  },
  unite: {
    action: (a, b) => {
      if (typeof a  !== typeof b ) return a

      const operandType = typeof a

      const OPERATION_BY_TYPE = {
        number: (a, b) => (a+b),
        string: (a, b) => (a+b),
        boolean: (a, b) => (a || b),
        object: (a, b) => Array.isArray(a) ? ([...a, ...b]) : ({...a, ...b}),
      }

      const operations = Object.keys(OPERATION_BY_TYPE)

      return operations.includes(operandType) ? OPERATION_BY_TYPE[operandType](a, b) : a //need calback with error
    }
  },
  keep: {

  },
  get: {

  },
}

/* MAIN FUNCTION */
const createPrint = () => {
  const cache = {}
  let targetEl

  return (commands, ...templateData) => {
    let actionOfCommand = () => {}
    let resultOfCommand = ''

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
        acc += resultOfCommand
        resultOfCommand = ''
      } else if (command === uniteSymbol) {
        args = [targetEl, param]
      } else {
        return acc
      }

      console.log('action func result');
      console.log(actionOfCommand(...args), ...args)
      resultOfCommand = actionOfCommand(...args)
      
      if (idx === arr.length - 1) {
        acc += resultOfCommand
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
    const res = commandSet.reduce(commandSetReduceCallback(templateData), '')

    console.log( "\u001b[1;32m"+res+'\u001b[0m' );

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
  
}


const fObject = {x: 12}
const sObject = {x: 12, y: 'hi second'}
const trdObject = {add: (a, b) => (a + b)}

const print = createPrint()

//print`compare ${fObject}&${sObject} unite ${trdObject} keep ${'memo'}`
print`compare errorWord ${fObject}&${sObject}`

print`compare ${fObject}`