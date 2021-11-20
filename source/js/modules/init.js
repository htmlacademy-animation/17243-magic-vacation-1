export default () => {
  window.addEventListener(`load`, () => {
    setTimeout(
        () => document.body.classList.add(`is-loaded`, `show-footnote`),
        0
    );
    setTimeout(() => document.body.classList.remove(`show-footnote`), 100);
  });
};
