/* eslint-disable camelcase */
import { v2 as cloudinary } from 'cloudinary';
import createDebug from 'debug';
import { ImgData } from '../types/img.data';
import { HttpError } from '../types/http.error.js';

const debug = createDebug('W7E:media:files');

export class MediaFiles {
  constructor() {
    /* Cloudinary.config({
      cloud_name: 'dzvjhusmj',
      api_key: '298145357486513',
      api_secret: process.env.CLOUDINARY_SECRET,
    }); */

    cloudinary.config({
      secure: true, // Setting return "https" URLs
    });

    debug('instanciated');
  }

  async uploadImage(imagePath: string) {
    try {
      const uploadApiResponse = await cloudinary.uploader.upload(imagePath, {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
      });

      const avatar: ImgData = {
        url: uploadApiResponse.url,
        publicId: uploadApiResponse.publicId,
        size: uploadApiResponse.size,
        height: uploadApiResponse.height,
        width: uploadApiResponse.width,
        format: uploadApiResponse.format,
      };
      return avatar;
    } catch (err) {
      const error = (err as { error: Error }).error as Error;
      throw new HttpError(406, 'Not acceptable', error.message);
    }
  }
}
