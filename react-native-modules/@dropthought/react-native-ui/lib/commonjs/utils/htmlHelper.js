"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toWhite = exports.toHtml = exports.htmlTrim = exports.htmlMandatory = void 0;
const htmlTrim = html => {
  // Remove <p>&nbsp;</p> at the beginning
  let htmlString = html.replace(/^(<p>\s*&nbsp;\s*<\/p>\s*)+/, '');

  // Remove <p>&nbsp;</p> at the end
  htmlString = htmlString.replace(/(\s*<p>\s*&nbsp;\s*<\/p>)+$/, '');
  return htmlString;
};
exports.htmlTrim = htmlTrim;
const htmlMandatory = html => {
  let htmlString = html.replace('</p>', '<span style="color:#a30000;"> *</span></p>');
  return htmlString;
};
exports.htmlMandatory = htmlMandatory;
const toHtml = html => {
  if (!html.startsWith('<p>') && !html.endsWith('</p>')) {
    const htmlString = `<p>${html}</p>`;
    return htmlString;
  }
  return html;
};
exports.toHtml = toHtml;
const toWhite = html => {
  return `<span style="color: white;">${html}</span>`;
};
exports.toWhite = toWhite;
//# sourceMappingURL=htmlHelper.js.map