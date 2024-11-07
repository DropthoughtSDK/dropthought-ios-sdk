import React from 'react';
import { Image } from 'react-native';
import type { ImageStyle } from 'react-native';
import { FileIconPath } from '../constants/FileQuestionConstants';

type FileIconProps = {
  style?: ImageStyle;
  fileName: string | null;
};
type FileIconPathKey = keyof typeof FileIconPath;

const FileIcon = ({ style, fileName }: FileIconProps) => {
  if (fileName && fileName.length > 0) {
    const extension = fileName.split('.').pop()?.toLowerCase();
    let fileIconPathKey: FileIconPathKey = 'document';
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
    return <Image style={style} source={FileIconPath[fileIconPathKey]} />;
  } else {
    return <Image style={style} source={FileIconPath.document} />;
  }
};

export default FileIcon;
