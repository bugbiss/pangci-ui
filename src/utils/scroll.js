const overflowScrollReg = /scroll|auto/i
export function getScrollContanier (el) {
  const root = window
  let node = el

  while (
    node &&
    node.tagName !== 'HTML' &&
    node.tagName !== 'BODY' &&
    node.nodeType === 1 &&
    node !== root
  ) {
    const { overflowY } = window.getComputedStyle(node)
    if (overflowScrollReg.test(overflowY)) {
      return node
    }
    node = node.parentNode
  }

  return root
}
