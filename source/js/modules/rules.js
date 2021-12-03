import {AccentTypographyBuild} from "../utils";

export default () => {
  const animationRulesTitle = new AccentTypographyBuild({
    elementSelector: `.rules__title`,
    timer: 750,
    classForActivate: `active`,
    propertiesList: [`transform`],
  });

  setTimeout(() => {
    animationRulesTitle.runAnimation();
  }, 100);
};
