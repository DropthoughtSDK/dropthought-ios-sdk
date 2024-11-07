"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _FileQuestionConstants = require("../constants/FileQuestionConstants");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const FileIcon = ({
  style,
  fileName
}) => {
  if (fileName && fileName.length > 0) {
    var _fileName$split$pop;
    const extension = (_fileName$split$pop = fileName.split('.').pop()) === null || _fileName$split$pop === void 0 ? void 0 : _fileName$split$pop.toLowerCase();
    let fileIconPathKey = 'document';
    switch (extension) {
      case 'csv':
        fileIconPathKey = 'csv';
        break;
      case 'pdf':
        fileIconPathKey = 'pdf';
        break;
      case 'doc':
      case 'docx':
        fileIconPathKey = 'doc';
        break;
      case 'ppt':
      case 'pptx':
        fileIconPathKey = 'ppt';
        break;
      case 'xls':
      case 'xlsx':
        fileIconPathKey = 'xls';
        break;
      case 'mp3':
      case 'wav':
      case 'aac':
      case 'amr':
      case 'm4a':
        fileIconPathKey = 'audio';
        break;
      case 'png':
      case 'jpeg':
      case 'jpg':
      case 'svg':
        fileIconPathKey = 'image';
        break;
      case 'mp4':
      case '3gp':
      case 'flv':
      case 'wmv':
        fileIconPathKey = 'video';
        break;
    }
    return /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
      style: style,
      source: _FileQuestionConstants.FileIconPath[fileIconPathKey]
    });
  } else {
    return /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
      style: style,
      source: _FileQuestionConstants.FileIconPath.document
    });
  }
};
var _default = exports.default = FileIcon;
//# sourceMappingURL=FileIcon.js.map