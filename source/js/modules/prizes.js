import {AccentTypographyBuild} from "../utils";

export default () => {
  const animationPrizesTitle = new AccentTypographyBuild({
    elementSelector: `.prizes__title`,
    timer: 750,
    classForActivate: `active`,
    propertiesList: [`transform`],
  });

  setTimeout(() => {
    animationPrizesTitle.runAnimation();
  }, 100);
};
