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
          name: 'image',
          type: 'image',
          title: 'Bilde',
          options: {
            hotspot: false,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternativ tekst',
              description: 'Viktig for SEO og tilgjengelighet. Beskriv kort hva man ser i bildet for en person som er blind.',
              options: {
                isHighlighted: true
              }
            },
            {
              name: 'columns',
              type: 'string',
              title: 'Kolonner',
              description: 'Hvor stor del av bredden skal bildet oppta?',
              options: {
                list: [
                  { title: 'Fullbredde', value: 'full' },
                  { title: '1/2', value: 'half' },
                  { title: '1/3', value: 'third' },
                ],
                layout: 'radio', // <-- defaults to 'dropdown'
                isHighlighted: true
              },
            },
            {
              name: 'caption',
              type: 'text',
              title: 'Bildetekst',
              description: 'Valgfritt',
              options: {
                isHighlighted: true
              }
            },
          ],
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
        media: image,
      };
    },
  },
};