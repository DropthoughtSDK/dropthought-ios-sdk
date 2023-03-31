const smileyPoor = require('../assets/btn_very_dislike.png');

const smileyFair = require('../assets/btn_dislike.png');

const smileyNeutral = require('../assets/btn_not_sure.png');

const smileyGood = require('../assets/btn_like.png');

const smileyExcellent = require('../assets/btn_very_like.png');

const smileyPoorSelected = require('../assets/btn_very_dislike_selected.png');

const smileyFairSelected = require('../assets/btn_dislike_selected.png');

const smileyNeutralSelected = require('../assets/btn_not_sure_selected.png');

const smileyGoodSelected = require('../assets/btn_like_selected.png');

const smileyExcellentSelected = require('../assets/btn_very_like_selected.png');

const defaultStar = require('../assets/icDefaultStar.png');

const starPoor = require('../assets/icStarPoor.png');

const starFair = require('../assets/icStarFair.png');

const starNeutral = require('../assets/icStarNeutral.png');

const starGood = require('../assets/icStarGood.png');

const starExcellent = require('../assets/icStarExcellent.png');

const defaultHeart = require('../assets/icDefaultHeart.png');

const heartPoor = require('../assets/icHeartPoor.png');

const heartFair = require('../assets/icHeartFair.png');

const heartNeutral = require('../assets/icHeartNeutral.png');

const heartGood = require('../assets/icHeartGood.png');

const heartExcellent = require('../assets/icHeartExcellent.png');

const thumbPoor = require('../assets/icThumbPoor.png');

const thumbFair = require('../assets/icThumbFair.png');

const thumbNeutral = require('../assets/icThumbNeutral.png');

const thumbGood = require('../assets/icThumbGood.png');

const thumbExcellent = require('../assets/icThumbExcellent.png');

const thumbPoorSelected = require('../assets/icThumbPoorSelected.png');

const thumbFairSelected = require('../assets/icThumbFairSelected.png');

const thumbNeutralSelected = require('../assets/icThumbNeutralSelected.png');

const thumbGoodSelected = require('../assets/icThumbGoodSelected.png');

const thumbExcellentSelected = require('../assets/icThumbExcellentSelected.png');
/** @enum {'smiley'|'star'|'heart'|'thumb'} */


export const RatingIconType = {
  smiley: 'smiley',
  star: 'star',
  heart: 'heart',
  thumb: 'thumb'
};
/**
 * @param {QuestionSubType} type
 * @param {string} colorScheme
 */

export const defaultIcon = (type, colorScheme) => {
  switch (type) {
    case RatingIconType.star:
      return defaultStar;

    case RatingIconType.heart:
      return defaultHeart;
  }
};
const smileyIcons = [smileyPoor, smileyFair, smileyNeutral, smileyGood, smileyExcellent];
const smileyIconsSelected = [smileyPoorSelected, smileyFairSelected, smileyNeutralSelected, smileyGoodSelected, smileyExcellentSelected];
const starIcons = [starPoor, starFair, starNeutral, starGood, starExcellent];
const heartIcons = [heartPoor, heartFair, heartNeutral, heartGood, heartExcellent];
const thumbIcons = [thumbPoor, thumbFair, thumbNeutral, thumbGood, thumbExcellent];
const thumbIconsSelected = [thumbPoorSelected, thumbFairSelected, thumbNeutralSelected, thumbGoodSelected, thumbExcellentSelected];
/**
 * @param {QuestionSubType} type
 * @param {number} optionLength
 * @returns {string[]}
 */

export const getIcons = (type, optionLength) => {
  let icons;

  switch (type) {
    case RatingIconType.smiley:
      icons = smileyIcons;
      break;

    case RatingIconType.star:
      icons = starIcons;
      break;

    case RatingIconType.heart:
      icons = heartIcons;
      break;

    case RatingIconType.thumb:
      icons = thumbIcons;
      break;
  }

  switch (optionLength) {
    case 2:
      return [icons[0], icons[4]];

    case 3:
      return [icons[1], icons[2], icons[4]];

    case 4:
      return [icons[0], icons[1], icons[3], icons[4]];

    default:
      return icons;
  }
};
/**
 * @param {QuestionSubType} type
 * @param {number} optionLength
 * @returns {string[]}
 */

export const getSelectedIcons = (type, optionLength) => {
  let icons;

  switch (type) {
    case RatingIconType.smiley:
      icons = smileyIconsSelected;
      break;

    case RatingIconType.star:
      icons = starIcons; // do not have selected icon

      break;

    case RatingIconType.heart:
      icons = heartIcons; // do not have selected icon

      break;

    case RatingIconType.thumb:
      icons = thumbIconsSelected;
      break;
  }

  switch (optionLength) {
    case 2:
      return [icons[0], icons[4]];

    case 3:
      return [icons[1], icons[2], icons[4]];

    case 4:
      return [icons[0], icons[1], icons[3], icons[4]];

    default:
      return icons;
  }
};
/**
 * @typedef {import('../data').QuestionSubType} QuestionSubType
 */
//# sourceMappingURL=RatingQuestionConstants.js.map