import {setActiveColor} from "../utils/helpers/color";

export default () => {
  let setVH = function () {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty(`--vh`, `${vh}px`);
  };

  setVH();
  setActiveColor(`active-color`, 263, 66, 70);

  window.addEventListener(`resize`, setVH);
};
