import {AccentTypographyBuild, Countdown, pad} from "../utils";

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
  const MINUTES_COUNT = 5;
  const countdown = new Countdown().setDuration(MINUTES_COUNT);

  countdown.onTick = (time) => {
    const {minutes, seconds} = countdown.format(time);

    label.firstChild.textContent = pad(minutes);
    label.lastChild.textContent = pad(seconds);
  };
  countdown.onCompleted = () => {
    console.log(`Game finished!`); // eslint-disable-line no-console
  };
  const label = document.querySelector(`.game__counter`);

  document.addEventListener(`screenChanged`, ({detail: {screenName}}) => {
    switch (screenName) {
      case `game`:
        countdown.start();
        break;

      default:
        countdown.onCompleted();
        countdown.reset();
        countdown.pause();

        const {minutes, seconds} = countdown.format(
            Math.ceil(countdown.getTimeLeft())
        );
        label.firstChild.textContent = pad(minutes);
        label.lastChild.textContent = pad(seconds);
    }
  });
};
