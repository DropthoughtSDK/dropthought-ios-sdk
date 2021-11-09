/**
 * parse api date string to JS
 * @param {string} dateStr 'yyyy-MM-dd HH:mm:ss' ex. "2019-11-06 07:24:05"
 * @returns {Date}
 */
export const fromAPIDateStrToJS = dateStr => {
  const [yyyy_MM_dd, HH_mm_ss] = dateStr.split(' ');
  const [yyyy, MM, dd] = yyyy_MM_dd.split('-').map(Number);
  const [HH, mm, ss] = HH_mm_ss.split(':').map(Number);
  return new Date(yyyy, MM - 1, dd, HH, mm, ss);
};
/**
 * parse api date number to JS Date
 * @param {number|undefined} timestamp
 * @returns {string|undefined} 'yyyy-MM-dd HH:mm:ss' ex. "2019-11-06 07:24:05"
 */

export const fromJSToAPIDateStr = timestamp => {
  if (typeof timestamp !== 'number') {
    return undefined;
  }

  const date = new Date(timestamp);
  const yyyy = padStartWithZero(date.getFullYear().toString(), 4);
  const MM = padStartWithZero((date.getMonth() + 1).toString(), 2);
  const dd = padStartWithZero(date.getDate().toString(), 2);
  const HH = padStartWithZero(date.getHours().toString(), 2);
  const mm = padStartWithZero(date.getMinutes().toString(), 2);
  const ss = padStartWithZero(date.getSeconds().toString(), 2);
  return `${[yyyy, MM, dd].join('-')} ${[HH, mm, ss].join(':')}`;
};
/**
 * padStart string with 0
 * @param {string} targetString
 * @param {number} maxLength
 * @returns {string}
 */

const padStartWithZero = (targetString, maxLength) => {
  if (targetString.length >= maxLength) {
    return targetString;
  }

  return `${[...Array(maxLength - targetString.length)].map(_ => '0').join('')}${targetString}`;
};
//# sourceMappingURL=DateTimerParser.js.map