export default () => {
  window.addEventListener(`load`, () => {
    setTimeout(() => document.body.classList.add(`is-loaded`), 0);
  });
};
