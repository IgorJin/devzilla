const $ = (selector) => document.querySelector(selector || '')
const initialTree = {
  tag: 'div', 
  props: {
    class: 'wrapper',
    counter: 5
  },
  childrens: [{
      tag: 'span',
      childrens: ['Hello world! '],
    }],
}

// functions
function createVNode(tag = 'div', props , childrens = []) {
  // validate
  return {
    tag,
    props,
    childrens,
  }
}

const createDefaultRoot = () => {
  const defaultRoot = document.createElement('div')
  defaultRoot.setAttribute("id", "root")
  document.body.append(defaultRoot)
} 

function render(tree = {}, rootElement = createDefaultRoot()) {
  function getNode(treeNode) {
    const { tag, childrens, props } = treeNode

    if (!tag) {
      return typeof treeNode === 'string' ? treeNode : JSON.stringify(treeNode)
    }

    const nodeEl = document.createElement(tag)

    if (props) {
        Object.entries(props).forEach(([k, v]) => nodeEl.setAttribute(k, v))
    }

    if (childrens && childrens.length) {
      for (children of childrens) {
        nodeEl.append(getNode(children))
      }
    }

    return nodeEl
  }

  const node = getNode(tree)

  rootElement.append(node)
}

// const newNode = createVNode('div', )

// appendVNode(virtualTree, newNode, )
