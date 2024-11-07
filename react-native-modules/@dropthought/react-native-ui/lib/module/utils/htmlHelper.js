export const htmlTrim = html => {
  // Remove <p>&nbsp;</p> at the beginning
  let htmlString = html.replace(/^(<p>\s*&nbsp;\s*<\/p>\s*)+/, '');

  // Remove <p>&nbsp;</p> at the end
  htmlString = htmlString.replace(/(\s*<p>\s*&nbsp;\s*<\/p>)+$/, '');
  return htmlString;
};
export const htmlMandatory = html => {
  let htmlString = html.replace('</p>', '<span style="color:#a30000;"> *</span></p>');
  return htmlString;
};
export const toHtml = html => {
  if (!html.startsWith('<p>') && !html.endsWith('</p>')) {
    const htmlString = `<p>${html}</p>`;
    return htmlString;
  }
  return html;
};
export const toWhite = html => {
  return `<span style="color: white;">${html}</span>`;
};
//# sourceMappingURL=htmlHelper.js.map