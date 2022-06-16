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


//----------------------------------------------------------------
const virtualTree = { ... initialTree }

render(virtualTree, $('#app'))

