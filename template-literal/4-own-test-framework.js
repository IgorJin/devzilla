// example

/* MAIN FUNCTION */
const createPrint = () => {
  const cache = {}
  let targetEl
  let proccessingEl

  return (commands, ...templateData) => {
    let currentAction
    const controlMap = {
      compare: {
        action: (a, b) => a === b ? 'is equal' : 'is different'
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
      put: {

      },  
      keep: {

      },
      get: {

      },
    }

    const generalCommands = Object.keys(controlMap)
    const uniteSymbol = '&'
    const AVAILABLE_COMMANDS = [...generalCommands, uniteSymbol] // rewrite

    const makeCommandSet = (commands) => commands
      .map(
        command => command.split(' ').map(v => v.replace(/\s/g, '')).filter(v => v.length && AVAILABLE_COMMANDS.includes(v))
      )
      .filter(c => c.length)
      .flat()

    const commandSet = makeCommandSet(commands)
    console.log("🚀 ~ file: 4-own-test-framework.js ~ line 47 ~ return ~ commandSet", commandSet)

    // create result string
    const res = commandSet.reduce((acc, command, idx) => {
      const param = templateData[idx]
      
      if (command in controlMap) {
        const { action } = controlMap[command]

        currentAction = action
        acc += targetEl
        targetEl = null
      } else if (command === uniteSymbol) {
        targetEl = currentAction(targetEl, param)
      }
      
      return acc
    }, '')

    console.log(res)

    /*
      [compare] => 1 isEqual 2 ? is equal : is different. 1 in chain
      [unite] => if same type ? unite : 1 and error. result or 1
      [put] => if same type ? unite : 1 and error. result or 1
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