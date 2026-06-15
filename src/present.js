export function createPresenter(slideCount) {
  let index = 0;
  return {
    next() {
      if (index < slideCount - 1) index += 1;
    },
    prev() {
      if (index > 0) index -= 1;
    },
    current() {
      return index;
    },
  };
}
