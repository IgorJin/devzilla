const $ = (selector) => document.querySelector(selector || '')

// functions
function createVNode(tag = 'div', props , children = []) {
  return {
    tag,
    props,
    children,
  }
}

const createDefaultRoot = () => {
  const defaultRoot = document.createElement('div')
  defaultRoot.setAttribute("id", "root")
  document.body.append(defaultRoot)
} 

function createRealDOMNode(treeNode) {
  const { tag, props, children } = treeNode

  if (typeof treeNode === 'string') {
    return document.createTextNode(treeNode);
  }

  if (typeof treeNode === 'function') {
    return document.createTextNode(treeNode())
  }

  const nodeEl = document.createElement(tag)

  if (props) {
      patchProps(nodeEl, {}, props)
  }

  children.forEach((child) => {
    nodeEl.appendChild(createRealDOMNode(child));
  });

  return nodeEl
}

function mount(node, target) {
  target.replaceWith(node);

  return node;
}

function patch(nextVNode, node) {
  const { vNode } = node
  node = patchNode(node, vNode, nextVNode)
  node.vNode = nextVNode

  return node
}

function patchNode(node, vNode, nextVNode) {
  console.log('patchNode ', node, vNode, nextVNode)

  if (nextVNode === undefined) {
    console.log('remove')
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

function patchProp(node, key, value, nextValue) {
  if (nextValue === null || nextValue === false || nextValue === undefined) {
    node.removeAttribute(key);
    return;
  }

  node.setAttribute(key, nextValue)
}

function patchProps(node, props, nextProps) {
  const mergedProps = { ...props, ...nextProps }

  Object.keys(mergedProps).forEach(key => {
    if (props[key] !== nextProps[key]) {
      patchProp(node, key, props[key], nextProps[key])
    }
  })

}

function patchChildren(parent, children, nextChildren) {
  console.log('~~~~~~~~~~~~~~~~ Childrens: ', parent.childNodes)
  parent.childNodes.forEach((childNode, i) => {
    console.log(childNode, i, {children: children[i],nextChildren: nextChildren[i]})
    patchNode(childNode, children[i], nextChildren[i])
  })

  nextChildren.slice(children.length).forEach(child => {
    parent.appendChild(createRealDOMNode(child))
  })
}