import {AccentTypographyBuild} from "../utils/helpers/animation.helpers";

export default () => {
  const animationPrizesTitle = new AccentTypographyBuild(
      `.prizes__title`,
      750,
      `active`,
      `transform`
  );

  setTimeout(() => {
    animationPrizesTitle.runAnimation();
  }, 100);
};
