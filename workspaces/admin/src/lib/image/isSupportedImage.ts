const SUPPORTED_IMAGE_EXTENSIONS = ['bmp', 'jpeg', 'png', 'webp', 'avif', 'jxl'];
const SUPPORTED_MIME_TYPE_LIST = ['image/bmp', 'image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/jxl'];

export async function isSupportedImage(image: File): Promise<boolean> {
  // Checking file extension
  const extension = image.name.split('.').pop()?.toLowerCase();
  if (extension && SUPPORTED_IMAGE_EXTENSIONS.includes(extension)) {
    return true;
  }

  // Checking MIME type using File API
  const mimeType = image.type;
  if (SUPPORTED_MIME_TYPE_LIST.includes(mimeType)) {
    return true;
  }

  return false;
}
