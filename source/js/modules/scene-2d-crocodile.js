import {Easing, Animation, Scene2D} from "../utils";

const IMAGES_URLS = Object.freeze({
  key: `img/module-4/lose-images/key.png`,
  snowflake: `img/module-4/lose-images/snowflake.png`,
  leaf: `img/module-4/lose-images/leaf.png`,
  saturn: `img/module-4/lose-images/saturn.png`,
  watermelon: `img/module-4/lose-images/watermelon.png`,
  flamingo: `img/module-4/lose-images/flamingo.png`,
  crocodile: `img/module-4/lose-images/crocodile.png`,
  drop: `img/module-4/lose-images/drop.png`,
});

const OBJECTS = Object.freeze({
  key: {
    imageId: `key`,
    x: 50,
    y: 50,
    size: 12,
    opacity: 0,
    transforms: {},
  },
  snowflake: {
    imageId: `snowflake`,
    x: 50,
    y: 50,
    size: 8.5,
    opacity: 0,
    transforms: {},
  },
  leaf: {
    imageId: `leaf`,
    x: 50,
    y: 50,
    size: 12,
    opacity: 0,
    transforms: {},
  },
  saturn: {
    imageId: `saturn`,
    x: 50,
    y: 50,
    size: 10,
    opacity: 0,
    transforms: {},
  },
  watermelon: {
    imageId: `watermelon`,
    x: 50,
    y: 50,
    size: 10,
    opacity: 0,
    transforms: {},
  },
  flamingo: {
    imageId: `flamingo`,
    x: 50,
    y: 50,
    size: 12,
    opacity: 0,
    transforms: {},
  },
  crocodile: {
    imageId: `crocodile`,
    x: 50,
    y: 50,
    size: 55,
    opacity: 0,
    transforms: {
      translateX: 15,
      translateY: 3.8,
    },
  },
  drop: {
    imageId: `drop`,
    x: 47.8,
    y: 56,
    size: 2.8,
    opacity: 0,
    transforms: {},
  },
});

const LOCALS = Object.freeze({
  mask: {
    startingPoint: [56.6, 64.2],
    segments: [
      [52, 40],
      [24, 38],
      [26, 65],
    ],
  },
});

export default class Scene2DCrocodile extends Scene2D {
  constructor() {
    const canvas = document.getElementById(`crocodile-scene`);

    super({
      canvas,
      objects: OBJECTS,
      locals: LOCALS,
      imagesUrls: IMAGES_URLS,
    });

    this.initLocals();

    this.drawMask = () => {
      const s = this.size;

      const {
        mask: {startingPoint, segments},
      } = this.locals;
      const [startingPointX, startingPointY] = startingPoint;

      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.moveTo((startingPointX * s) / 100, (startingPointY * s) / 100);
      segments.forEach((segment) => {
        const [segmentX, segmentY] = segment;
        this.ctx.lineTo((segmentX * s) / 100, (segmentY * s) / 100);
      });
      this.ctx.closePath();
      this.ctx.clip();
    };

    this.afterInit = () => {
      this.objects.crocodile.before = this.drawMask;
      this.objects.crocodile.after = () => this.ctx.restore();
    };

    this.initEventListeners();
    this.initObjects(OBJECTS);
    this.start();
    this.updateSize();
  }

  initLocals() {
    const {startingPoint, segments} = LOCALS.mask;

    this.locals = {
      mask: {
        startingPoint,
        segments,
      },
    };
  }

  initEventListeners() {
    window.addEventListener(`resize`, this.updateSize.bind(this));
  }

  initAnimations() {
    this.animations.push(
        new Animation({
          func: () => {
            this.drawScene();
          },
          duration: `infinite`,
          fps: 60,
        })
    );

    this.initKeyAnimations();
    this.initSnowflakeAnimations();
    this.initLeafAnimations();
    this.initSaturnAnimations();
    this.initWatermelonAnimations();
    this.initFlamingoAnimations();
    this.initCrocodileAnimations();
    this.initDropAnimations();
  }

  initKeyAnimations() {
    this.animations.push(
        new Animation({
          func: (progress) => {
            this.objects.key.opacity = progress;
            this.objects.key.transforms.scaleX = progress;
            this.objects.key.transforms.scaleY = progress;
          },
          duration: 350,
          easing: Easing.EASE_OUT_CUBIC,
        })
    );
  }

  initSnowflakeAnimations() {
    this.animations.push(
        new Animation({
          func: (progress) => {
            this.objects.snowflake.opacity = progress;
            this.objects.snowflake.transforms.translateX = 14 * progress;
            this.objects.snowflake.transforms.translateY = 1 * progress;
            this.objects.snowflake.transforms.rotate =
            Math.sin(Math.PI * progress) + -25 * progress;
          },
          duration: 1000,
          easing: Easing.EASE_OUT_CUBIC,
        })
    );
    this.animations.push(
        new Animation({
          func: (progress) => {
            this.objects.snowflake.transforms.translateY = progress * 100;
            this.objects.snowflake.transforms.rotate =
            Math.sin(Math.PI * progress) + 25 * progress;
          },
          duration: 1500,
          delay: 750,
          easing: Easing.EASE_OUT_QUAD,
        })
    );
  }

  initLeafAnimations() {
    this.animations.push(
        new Animation({
          func: (progress) => {
            this.objects.leaf.opacity = progress;
            this.objects.leaf.transforms.translateX = 25 * progress;
            this.objects.leaf.transforms.translateY = -10 * progress;
            this.objects.leaf.transforms.rotate =
            5 + Math.sin(Math.PI * progress) - 15 * progress;
          },
          duration: 1000,
          easing: Easing.EASE_OUT_CUBIC,
        })
    );
    this.animations.push(
        new Animation({
          func: (progress) => {
            this.objects.leaf.transforms.translateY = progress * 100;

            this.objects.leaf.transforms.rotate =
            Math.sin(Math.PI * progress) + 15 * progress;
          },
          duration: 1250,
          delay: 750,
          easing: Easing.EASE_OUT_QUAD,
        })
    );
  }

  initSaturnAnimations() {
    this.animations.push(
        new Animation({
          func: (progress) => {
            this.objects.saturn.opacity = progress;
            this.objects.saturn.transforms.translateX = Math.sin(progress) * 35;
            this.objects.saturn.transforms.translateY = Math.sin(progress) * 25;
            this.objects.saturn.transforms.rotate =
            -45 + Math.sin(progress) + 45 * progress;
          },
          duration: 1000,
          easing: Easing.EASE_OUT_CUBIC,
        })
    );
    this.animations.push(
        new Animation({
          func: (progress) => {
            this.objects.saturn.transforms.translateY =
            20 + Math.sin(progress) * 100;
          },
          duration: 2000,
          delay: 750,
          easing: Easing.EASE_OUT_QUAD,
        })
    );
  }

  initWatermelonAnimations() {
    this.animations.push(
        new Animation({
          func: (progress) => {
            this.objects.watermelon.opacity = progress;
            this.objects.watermelon.transforms.translateX =
            Math.sin(progress) * -36;
            this.objects.watermelon.transforms.translateY =
            Math.sin(progress) * 9;
            this.objects.watermelon.transforms.rotate =
            -45 + Math.sin(progress) + 45 * progress;
          },
          duration: 1000,
          easing: Easing.EASE_OUT_CUBIC,
        })
    );
    this.animations.push(
        new Animation({
          func: (progress) => {
            this.objects.watermelon.transforms.translateY =
            20 + Math.sin(progress) * 100;
          },
          duration: 2000,
          delay: 750,
          easing: Easing.EASE_OUT_QUAD,
        })
    );
  }

  initFlamingoAnimations() {
    this.animations.push(
        new Animation({
          func: (progress) => {
            this.objects.flamingo.opacity = progress;
            this.objects.flamingo.transforms.translateX =
            Math.sin(progress) * -18;
            this.objects.flamingo.transforms.translateY = Math.sin(progress) * -6;
            this.objects.flamingo.transforms.rotate =
            45 + Math.sin(progress) - 35 * progress;
          },
          duration: 1000,
          easing: Easing.EASE_OUT_CUBIC,
        })
    );
    this.animations.push(
        new Animation({
          func: (progress) => {
            this.objects.flamingo.transforms.translateY =
            20 + Math.sin(progress) * 100;
          },
          duration: 2000,
          delay: 750,
          easing: Easing.EASE_OUT_QUAD,
        })
    );
  }

  initCrocodileAnimations() {
    this.animations.push(
        new Animation({
          func: (progress) => {
            this.objects.crocodile.opacity = progress * 3;
            this.objects.crocodile.transforms.translateX = progress * -1;
          },
          duration: 1000,
          delay: 750,
          easing: Easing.EASE_OUT_EXPO,
        })
    );
  }

  initDropAnimations() {
    this.animations.push(
        new Animation({
          func: (progress, details) => {
            const timePassed = (details.currentTime - details.startTime) / 1000;
            const FACTOR = 3;

            this.objects.drop.transforms.scaleX = Math.min(
                progress,
                timePassed % FACTOR
            );
            this.objects.drop.transforms.scaleY = Math.min(
                progress,
                timePassed % FACTOR
            );

            this.objects.drop.opacity = timePassed % FACTOR;
            this.objects.drop.transforms.translateX =
            this.objects.drop.transforms.scaleX < progress
              ? progress - (timePassed % FACTOR)
              : 0;
            this.objects.drop.transforms.translateY = timePassed % FACTOR;
          },
          duration: `infinite`,
          delay: 1000,
          easing: Easing.EASE_IN_EXPO,
        })
    );
    this.animations.push(
        new Animation({
          func: () => {
            this.objects.drop.opacity = 1;
          },
          duration: 0,
          delay: 1000,
        })
    );
  }
}
