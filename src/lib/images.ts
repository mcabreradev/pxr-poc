import {
  BREAKPOINTS,
  DEFAULT_HEIGHT,
  DEFAULT_WIDTH,
  LANDSCAPE,
  PORTRAIT,
  SQUARE,
} from '@/constants';
import { SITE_IMAGE_URL } from '@/constants/env';

import { PhotoType } from '@/types';

export const processImages = (data) => {
  const photos = data.photos.map((photo) => ({
    ...photo,
    url: paxerImage(photo.url),
    srcSet: generateSrcSet(photo),
  }));

  return {
    ...data,
    photos,
  };
};

export function paxerImage(url: string, options?: string) {
  if (options) `${SITE_IMAGE_URL}${url}?${options}`;
  return `${SITE_IMAGE_URL}${url}`;
}

export const generateSrcSet = ({ url, width, height }) => {
  const custom_width = (width ?? DEFAULT_WIDTH) * 4;
  const custom_height = (height ?? DEFAULT_HEIGHT) * 4;

  return BREAKPOINTS.map((breakpoint) => {
    const breakpointHeight = Math.round(
      (custom_height / custom_width) * breakpoint,
    );
    return {
      url: paxerImage(url as string),
      width: breakpoint,
      height: breakpointHeight,
    };
  });
};

export const getSlides = (photos: PhotoType[]) => {
  return photos.map(({ width, height, url }) => {
    const custom_width =
      (typeof width === 'number' ? width : DEFAULT_WIDTH) * 4;
    const custom_height =
      (typeof height === 'number' ? height : DEFAULT_HEIGHT) * 4;

    return {
      src: url as string,
      width: custom_width,
      height: custom_height,
      // srcSet:generateSrcSet({ width, height, url }),
    };
  });
};

export const processImagesWip = async (photos) => {
  const promises = photos.map((photo) => {
    const photoData = {
      url: paxerImage(photo.url),
      srcSet: generateSrcSet(photo),
      orientation: SQUARE as string,
    };

    return getImageInformation(paxerImage(photo.url)).then((orientation) => {
      photoData.orientation = orientation as string;
      return photoData;
    });
  });

  return await Promise.all(promises).then((photos) => {
    return {
      ...photos,
    };
  });
};

export function getImageOrientation(url, callback) {
  const img = new Image();
  img.onload = function () {
    if (img.naturalWidth > img.naturalHeight) {
      callback('landscape');
    } else if (img.naturalWidth < img.naturalHeight) {
      callback('portrait');
    } else {
      callback('square');
    }
  };
  img.src = url;
}

export function getImageInformation(url: string) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = function () {
      let orientation: string;
      if (img.naturalWidth > img.naturalHeight) {
        orientation = LANDSCAPE;
      } else if (img.naturalWidth < img.naturalHeight) {
        orientation = PORTRAIT;
      } else {
        orientation = SQUARE;
      }
      resolve({
        width: img.naturalWidth,
        height: img.naturalHeight,
        orientation,
      });
    };
    img.onerror = function () {
      reject(new Error(`Failed to load image's URL: ${url}`));
    };
    img.src = url;
  });
}
