const veryAngry = require('../assets/ic_slider_very_bad.png');

const sad = require('../assets/ic_slider_sad.png');

const neutral = require('../assets/ic_slider_neutral.png');

const happy = require('../assets/ic_slider_happy.png');

const veryHappy = require('../assets/ic_slider_very_happy.png');
/**
 * @type {ImageSourcePropType[]}
 */


export const faceList = [veryAngry, sad, neutral, happy, veryHappy];
/**
 * @param {number} min
 * @param {number} number
 * @param {number} max
 * @returns {ImageSourcePropType}
 */

export const sliderRatingAboveThumbFace = (min, number, max) => {
  const definition2 = [0, 4];
  const definition3 = [1, 2, 3];
  const definition4 = [0, 1, 3, 4];
  const scale = max - min + 1;
  const tranNumber = number - min;

  switch (scale) {
    case 2:
      return faceList[definition2[tranNumber]];

    case 3:
      return faceList[definition3[tranNumber]];

    case 4:
      return faceList[definition4[tranNumber]];
  }

  const interval = scale / 5;
  const mapping = Math.floor(tranNumber / interval);
  return faceList[mapping];
};
/**
 * @typedef {import('react-native').ImageSourcePropType} ImageSourcePropType
 */
//# sourceMappingURL=SliderDragQuestionConstants.js.map