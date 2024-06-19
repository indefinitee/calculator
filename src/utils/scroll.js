export const scrollToDown = (elem) => {
  if (elem) {
    elem.scrollIntoView({
      behavior: 'smooth',
      block: 'end'
    })
  }
}

export const scrollToUp = (elem) => {
  if (elem) {
    elem.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }
}
