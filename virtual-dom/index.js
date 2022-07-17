// import { render, initialTree, $ } from './virtualDom

const testVNode = createVNode("div", { class: "container" }, [
  createVNode("h1", {}, ["Hello, Virtual DOM"]),
  "Text node without tags",
  createVNode("img", { src: "https://i.ibb.co/M6LdN5m/2.png", width: 200 })
]);

//----------------------------------------------------------------
const click = () => console.log('click')
const virtualTree = createVNode("div", {class: 'wrapper'}, [
  createVNode("h1", {}, ["Hello, Virtual DOM"]),
  createVNode("div", {}, [
    createVNode("span", {}, ['Counter: ']),
    createVNode("div", { 'count': 5 }, [
      (props) => props.count,
      createVNode("span", { decrement: (props) => ({ ...props, count: props.count + 1 })}, [
        createVNode('input', { type: "button", onclick: click }, ['+'])
      ]),
    ]),
  ])
])

const store = {
  state: { count: 0 },
  handleStateChange: () => {},
  setState(nextState) {
    this.state = nextState
    this.handleStateChange()
  }
}

const createVApp = () => {
  const { count } = store.state

  return createVNode("div", {class: 'wrapper'}, [
    createVNode("h1", {}, ["Hello, Virtual DOM"]),
    createVNode("img", { src: "https://i.ibb.co/M6LdN5m/2.png", width: 200 }),
    createVNode("div", {}, [
      createVNode("span", {}, [`Counter: ${count}`]),
      // createVNode("div", { 'count': count }, [
      //   (props) => props.count,
      //   createVNode("span", { decrement: (props) => ({ ...props, count: props.count + 1 })}, [
      //     createVNode('input', { type: "button", onclick: click }, ['+'])
      //   ]),
      // ]),
    ])
  ])
}

const state = { count: 0 }

let vApp = createVApp()
let rootNode = mount(createRealDOMNode(vApp), $('#app'));

setInterval(() => {
  if (store.state.count > 5) return
  store.setState({ count: store.state.count + 1 })

  // new vitrual dome
  const nextVApp = createVApp()

  // change real DOM
  rootNode = patchNode(rootNode, vApp, nextVApp)
  
  vApp = nextVApp
  console.log(state.count, " ================================================================")
}, 1000)

