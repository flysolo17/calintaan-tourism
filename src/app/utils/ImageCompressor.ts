/**
 *
 * @param image - Input image (e.g., JPG, PNG, etc.)
 * @returns - A Promise that resolves to a compressed .webp File
 */
export const convertToWebp = (image: File): Promise<File> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event: any) => {
      const img = new Image();
      img.src = event.target.result;

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return reject('Failed to get 2D context');

        const MAX_WIDTH = 1280;
        const scale = Math.min(1, MAX_WIDTH / img.width);
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Compress to WebP (quality = 0.75 = 75%)
        canvas.toBlob(
          (blob) => {
            if (!blob) return reject('Image compression failed');
            const webpFile = new File(
              [blob],
              `${image.name.split('.')[0]}.webp`,
              {
                type: 'image/webp',
                lastModified: Date.now(),
              }
            );
            resolve(webpFile);
          },
          'image/webp',
          0.75
        );
      };

      img.onerror = (err) => reject(err);
    };

    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(image);
  });
};
