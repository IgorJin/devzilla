const $ = (selector) => document.querySelector(selector || '')

// functions
function createVNode(tag = 'div', props , childrens = []) {
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

function createRealDOMNode(treeNode) {
  const { tag, props, childrens } = treeNode

  if (typeof treeNode === 'string') {
    return document.createTextNode(treeNode);
  }

  if (typeof treeNode === 'function') {
    return document.createTextNode(treeNode())
  }

  const nodeEl = document.createElement(tag)

  if (props) {
      Object.entries(props).forEach(([k, v]) => nodeEl.setAttribute(k, v))
  }

  if (childrens && childrens.length) {
    for (children of childrens) {
      nodeEl.appendChild(createRealDOMNode(children, props))
    }
  }

  return nodeEl
}

function render(tree = {}, rootElement = createDefaultRoot()) {
  const node = createRealDOMNode(tree)

  rootElement.innerHTML = ''
  rootElement.append(node)

  return rootElement
}

function pathNode(node, vNode, nextVNode) {
  console.log(node, vApp, nextApp)

  if (!nextVNode) {
    node.remove()
    return
  }

  if (typeof vNode === "string" || typeof nextVNode === "string") {
    if (vNode !== nextVNode) {
      const nextNode = createRealDOMNode(nextVNode)
      node.replaceWith(nextNode)
      return nextNode
    }

    return node
  }

  if (vNode.tag !== nextVNode.tag) {
    const nextNode = createRealDOMNode(nextVNode)
    node.replaceWith(nextNode)
    return nextNode
  }

  patchProps(node, vNode.props, nextVNode.props);

  patchChildren(node, vNode.children, nextVNode.children);

  return node
}