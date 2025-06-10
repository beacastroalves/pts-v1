import Splide from '@splidejs/splide';

const main = new Splide('#main-slider', {
  type: 'fade',
  pagination: false,
  arrows: false,
});

const thumbnails = new Splide('#thumbnail-slider', {
  rewind: true,
  fixedWidth: 104,
  fixedHeight: 104,
  isNavigation: true,
  gap: 10,
  focus: 'center',
  pagination: false,
  cover: true,
  dragMinThreshold: {
    mouse: 4,
    touch: 10,
  },
});

main.sync(thumbnails);
main.mount();
thumbnails.mount();