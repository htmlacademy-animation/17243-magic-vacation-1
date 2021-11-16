import {AccentTypographyBuild} from "../utils/helpers/animation";

export default () => {
  const animationRulesTitle = new AccentTypographyBuild(
      `.rules__title`,
      750,
      `active`,
      `transform`
  );

  setTimeout(() => {
    animationRulesTitle.runAnimation();
  }, 100);
};