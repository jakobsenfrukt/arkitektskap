export default {
  name: 'gallery',
  type: 'object',
  title: 'Bildegalleri',
  fields: [
    {
      name: 'images',
      type: 'array',
      title: 'Bilder',
      of: [
        {
          name: 'galleryImage',
          type: 'galleryImage',
          title: 'Bilde'
        },
      ],
      options: {
        layout: 'grid',
      },
    },
  ],
  preview: {
    select: {
      images: 'images',
      image: 'images.0',
    },
    prepare(selection) {
      const { images, image } = selection;

      return {
        title: `Gallery block of ${Object.keys(images).length} images`,
        subtitle: `Alt text: ${image.alt}`,
        media: galleryImage,
      };
    },
  },
};