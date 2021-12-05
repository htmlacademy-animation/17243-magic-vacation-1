import {AccentTypographyBuild, getTimer} from "../utils";

export default () => {
  // Typography animation
  const animationRulesTitle = new AccentTypographyBuild({
    elementSelector: `.game__title`,
    timer: 750,
    classForActivate: `active`,
    propertiesList: [`transform`],
  });

  setTimeout(() => {
    animationRulesTitle.runAnimation();
  }, 100);

  // Setting the Timer
  const gameCounterElement = document.querySelector(`.game__counter`);
  let timerId = null;
  const minutesCount = 5;

  document.addEventListener(`screenChanged`, ({detail: {screenName}}) => {
    switch (screenName) {
      case `game`:
        timerId = setInterval(getTimer(60 * minutesCount, gameCounterElement), 1000);
        break;

      default:
        clearInterval(timerId);
        gameCounterElement.firstChild.textContent = minutesCount < 10 ? `0` + minutesCount : minutesCount;
        gameCounterElement.lastChild.textContent = `00`;
    }
  });
};
