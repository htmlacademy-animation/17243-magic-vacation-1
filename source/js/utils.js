export const ColorPalette = {
  PRIMARY: [263, 66, 70],
  SLIDE_1: [262, 31, 35],
  SLIDE_2: [236, 61, 43],
  SLIDE_3: [214, 49, 54],
  SLIDE_4: [252, 22, 21],
};

export const Category = {
  PRIMARY: `PRIMARY`,
  SECONDARY: `SECONDARY`,
};

export const getRandomNumber = (threshold) =>
  Math.floor(Math.random() * threshold + 1);

const calcTimeOffsetByCategory = (category, delay, offset) => {
  switch (category) {
    case Category.PRIMARY:
      return getRandomNumber(10) * delay;

    case Category.SECONDARY:
      return (offset += delay);

    default:
      throw new Error(`Unknown category: ${category}`);
  }
};

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

export const pad = (value) => (`0` + Math.floor(value)).slice(-2);

export class AccentTypographyBuild {
  constructor(props) {
    const {
      elementSelector,
      timer,
      classForActivate,
      propertiesList,
      category = Category.PRIMARY,
      delay = 20,
    } = props;

    this._DELAY = delay;

    this._elementSelector = elementSelector;
    this._timer = timer;
    this._classForActivate = classForActivate;
    this._propertiesList = propertiesList;
    this._element = document.querySelector(this._elementSelector);
    this._timeOffset = 0;
    this._category = category;

    this.prePareText();
  }

  createElement(text) {
    const span = document.createElement(`span`);
    span.classList.add(`letter`, `word-wrapper__item`);
    span.textContent = text;
    span.style.transition = `all ${this._timer}ms ease ${this._timeOffset}ms`;
    span.style.transitionProperty = `${this._propertiesList.join()}`;
    this._timeOffset = calcTimeOffsetByCategory(
      this._category,
      this._DELAY,
      this._timeOffset
    );
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

export class Countdown {
  constructor() {
    this.TIME_SCALE = 60;
    this._SECOND = 1000;
    this._FPS = 60;
    this.fpsInterval = this._SECOND / this._FPS;
    this.duration = 0;
    this.elapsed = 0;
    this.isActive = false;
    this.lastFrameTime = Date.now();
    this.tick = () => {
      const currentFrameTime = Date.now();
      const deltaTime = currentFrameTime - this.lastFrameTime;
      this.lastFrameTime = currentFrameTime;

      if (this.isActive) {
        this.elapsed += deltaTime;

        if (deltaTime > this.fpsInterval) {
          this.onTick(this.getTimeLeft());
        }

        if (this.getTimeLeft() <= 0) {
          this.pause();
          this.onCompleted();
        }
      }

      window.requestAnimationFrame(this.tick);
    };

    this.onTick = () => {};
    this.onCompleted = () => {};

    this.tick();
  }

  getTimeLeft() {
    const t = this.duration - this.elapsed;

    return Math.max(0, t);
  }

  pause() {
    this.isActive = false;

    return this;
  }

  reset() {
    this.elapsed = 0;
  }

  start() {
    this.isActive = true;

    return this;
  }

  setDuration(minutes) {
    this.lastFrameTime = Date.now();
    this.duration = minutes * this.TIME_SCALE * this._SECOND + this._SECOND;

    return this;
  }

  format(milliseconds) {
    const seconds = Math.floor((milliseconds / this._SECOND) % this.TIME_SCALE);
    const minutes = Math.floor(milliseconds / this._SECOND / this.TIME_SCALE);

    return { seconds, minutes };
  }
}
