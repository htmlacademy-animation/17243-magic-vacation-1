export const ColorPalette = {
  PRIMARY: [263, 66, 70],
  SLIDE_1: [262, 31, 35],
  SLIDE_2: [236, 61, 43],
  SLIDE_3: [214, 49, 54],
  SLIDE_4: [252, 22, 21],
};

export const getRandomNumber = (threshold) =>
  Math.floor(Math.random() * threshold + 1);

export class AccentTypographyBuild {
  constructor(elementSelector, timer, classForActivate, property) {
    this._DELAY = 20;

    this._elementSelector = elementSelector;
    this._timer = timer;
    this._classForActivate = classForActivate;
    this._property = property;
    this._element = document.querySelector(this._elementSelector);
    this._timeOffset = 0;

    this.prePareText();
  }

  createElement(text) {
    const span = document.createElement(`span`);
    span.classList.add(`letter`, `word-wrapper__item`);
    span.textContent = text;
    span.style.transition = `${this._property} ${this._timer}ms ease ${this._timeOffset}ms`;
    this._timeOffset = getRandomNumber(10) * this._DELAY;
    return span;
  }

  prePareText() {
    if (!this._element) {
      return;
    }
    const text = this._element.textContent
      .trim()
      .split(` `)
      .filter((letter) => letter !== ``);

    const content = text.reduce((fragmentParent, word) => {
      const wordElement = Array.from(word).reduce((fragment, letter) => {
        fragment.appendChild(this.createElement(letter));
        return fragment;
      }, document.createDocumentFragment());
      const wordContainer = document.createElement(`span`);
      wordContainer.classList.add(`word-wrapper`);
      wordContainer.appendChild(wordElement);
      fragmentParent.appendChild(wordContainer);
      return fragmentParent;
    }, document.createDocumentFragment());

    this._element.innerHTML = ``;
    this._element.appendChild(content);
  }

  runAnimation() {
    if (!this._element) {
      return;
    }
    this._element.classList.add(this._classForActivate);
  }

  destroyAnimation() {
    this._element.classList.remove(this._classForActivate);
  }
}

export const setActiveColor = (colorName, hue, saturation, lightness) => {
  const rootElement = document.documentElement;

  rootElement.style.setProperty(
      `--${colorName}`,
      `hsl(${hue}, ${saturation}%, ${lightness}%)`
  );
  rootElement.style.setProperty(`--${colorName}-h`, hue);
  rootElement.style.setProperty(`--${colorName}-s`, `${saturation}%`);
  rootElement.style.setProperty(`--${colorName}-l`, `${lightness}%`);
};
