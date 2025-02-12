export const board2 = {
  dimension: 2,
  image: 'airplane.jpg',
  blankImage: 'image.png',
  table: {
    0: {
      positionImage: '0% 0%',
      focus: false,
      isBlank: false,
      active: false,
      valueExpected: 0,
    },
    1: {
      positionImage: '100% 0%',
      focus: false,
      isBlank: false,
      active: false,
      valueExpected: 1,
    },
    2: {
      positionImage: '0% 100%',
      focus: false,
      isBlank: false,
      active: false,
      valueExpected: 2,
    },
    3: {
      positionImage: '100% 100%',
      focus: false,
      isBlank: true,
      active: false,
      valueExpected: 3,
    },
  },
};
