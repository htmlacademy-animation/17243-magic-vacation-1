import {AccentTypographyBuild} from "../utils/helpers/animation.helpers";

export default () => {
  const animationRulesTitle = new AccentTypographyBuild(
      `.game__title`,
      750,
      `active`,
      `transform`
  );

  setTimeout(() => {
    animationRulesTitle.runAnimation();
  }, 100);
};
