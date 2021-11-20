import {AccentTypographyBuild} from "../utils";

export default () => {
  const animationIntroTitle = new AccentTypographyBuild(
      `.intro__title`,
      750,
      `active`,
      `transform`
  );

  const animationIntroDate = new AccentTypographyBuild(
      `.intro__date`,
      750,
      `active`,
      `transform`
  );

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
