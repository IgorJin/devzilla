// import { render, initialTree, $ } from './virtualDom
// div.wrapper
//  span Hello world! 
//  span count: {{ counter }}
//  span increment decrement

// {
//  tag: 'div', 
//  attributes: { class: wrapper },
//   props: {
//     counter: 5
//  },
//  children: [{
//     tag: span,
//      textNode: 'Hello world! ',
//   }],
// }

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

const vNodeWithState = (state) => {
  const { count } = state

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

const state = { count: 5 }

let vApp = vNodeWithState(state)
let rootNode = render(vApp, $('#app'))

setInterval(() => {
  state.count++

  // new vitrual dome
  const nextVApp = vNodeWithState(state)

  // change real DOM
  rootNode = pathNode(rootNode, vApp, nextVApp)
  
  vApp = nextApp
}, 1000)

