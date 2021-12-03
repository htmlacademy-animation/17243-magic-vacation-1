import {AccentTypographyBuild} from "../utils";

export default () => {
  const animationIntroTitle = new AccentTypographyBuild({
    elementSelector: `.intro__title`,
    timer: 750,
    classForActivate: `active`,
    propertiesList: [`transform`],
  });

  const animationIntroDate = new AccentTypographyBuild({
    elementSelector: `.intro__date`,
    timer: 750,
    classForActivate: `active`,
    propertiesList: [`transform`],
  });

  const handleMenuClick = () => {
    setTimeout(() => {
      animationIntroTitle.runAnimation();
      animationIntroDate.destroyAnimation();

      setTimeout(() => {
        animationIntroDate.runAnimation();
      }, 1200);
    }, 150);
  };

  handleMenuClick();
  document.querySelector(`.js-menu`).addEventListener(`click`, handleMenuClick);
};
