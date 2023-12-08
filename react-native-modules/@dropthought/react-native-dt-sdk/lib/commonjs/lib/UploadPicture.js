"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadPicture = void 0;
var _API = require("./API");
/**
 * @param {ImageFormData} file
 */
const uploadPicture = async file => {
  return (0, _API.apiUploadFileEvent)(file, {
    // use shorter timeout here, because the server is unstable, so we need to get the timer longer
    timeout: 100000
  }).catch(error => {
    // save result when there's error
    throw error;
  });
};

/** @typedef {import('../lib/UploadFileAPI').ImageFormData} ImageFormData */
exports.uploadPicture = uploadPicture;
//# sourceMappingURL=UploadPicture.js.map