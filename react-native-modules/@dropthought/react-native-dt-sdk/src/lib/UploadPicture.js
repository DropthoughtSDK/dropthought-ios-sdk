import { apiUploadFileEvent } from './API';

/**
 * @param {ImageFormData} file
 */
export const uploadPicture = async (file) => {
  return apiUploadFileEvent(file, {
    // use shorter timeout here,
    timeout: 10000,
  }).catch((error) => {
    // save result when there's error
    throw error;
  });
};

/** @typedef {import('../lib/UploadFileAPI').ImageFormData} ImageFormData */
