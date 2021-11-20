import {setActiveColor, ColorPalette} from "../utils";

export default () => {
  let setVH = function () {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty(`--vh`, `${vh}px`);
  };

  setVH();
  setActiveColor(`active-color`, ...ColorPalette.PRIMARY);

  window.addEventListener(`resize`, setVH);
};
