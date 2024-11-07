export const htmlTrim = (html: string) => {
  // Remove <p>&nbsp;</p> at the beginning
  let htmlString = html.replace(/^(<p>\s*&nbsp;\s*<\/p>\s*)+/, '');

  // Remove <p>&nbsp;</p> at the end
  htmlString = htmlString.replace(/(\s*<p>\s*&nbsp;\s*<\/p>)+$/, '');

  return htmlString;
};

export const htmlMandatory = (html: string) => {
  let htmlString = html.replace(
    '</p>',
    '<span style="color:#a30000;"> *</span></p>'
  );

  return htmlString;
};

export const toHtml = (html: string) => {
  if (!html.startsWith('<p>') && !html.endsWith('</p>')) {
    const htmlString = `<p>${html}</p>`;
    return htmlString;
  }

  return html;
};

export const toWhite = (html: string) => {
  return `<span style="color: white;">${html}</span>`;
};
