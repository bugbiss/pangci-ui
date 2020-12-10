import { unref } from 'vue'

let rootFontSize

function getRootFontSize () {
  if (!rootFontSize) {
    const doc = document.documentElement
    const fontSize = doc.style.fontSize || window.getComputedStyle(doc).fontSize

    rootFontSize = parseFloat(fontSize)
  }

  return rootFontSize
}

function convertRem (value) {
  value = value.replace(/rem/g, '')
  return +value * getRootFontSize()
}

function convertVw (value) {
  value = value.replace(/vw/g, '')
  return (+value * window.innerWidth) / 100
}

function convertVh (value) {
  value = value.replace(/vh/g, '')
  return (+value * window.innerHeight) / 100
}

export function unitToPx (value) {
  if (typeof value === 'number') {
    return value
  }

  if (value.includes('rem')) {
    return convertRem(value)
  }
  if (value.includes('vw')) {
    return convertVw(value)
  }
  if (value.includes('vh')) {
    return convertVh(value)
  }

  return parseFloat(value)
}

export function getRootScrollTop () {
  return (
    window.pageYOffset ||
    document.documentElement.scrollTop ||
    document.body.scrollTop ||
    0
  )
}

export function getOffsetTop (el, scroller) {
  const element = unref(el)
  if (element === window) {
    return 0
  }

  const scrollTop = scroller ? getScrollTop(scroller) : getRootScrollTop()
  return element.getBoundingClientRect().top + scrollTop
}

export function getScrollTop (el) {
  const top = 'scrollTop' in el ? el.scrollTop : el.pageYOffset

  return Math.max(top, 0)
}
