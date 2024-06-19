export const scrollToDown = (elem) => {
  if (elem) {
    elem.scrollIntoView({
      behavior: 'smooth',
      block: 'end'
    })
  }
}
