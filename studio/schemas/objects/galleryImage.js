export default {
  name: 'galleryImage',
  type: 'image',
  title: 'Bilde',
  options: {
    hotspot: true,
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
          { title: '2/3', value: 'twothird' },
        ],
        layout: 'radio', // <-- defaults to 'dropdown'
        isHighlighted: true
      },
    },
    {
      name: 'nocrop',
      title: 'Unngå beskjæring av bildet',
      description: 'Bildet vil vises i sin opprinnelige høyde, istedenfor å strekkes til samme høyde som andre bilder på samme rad.',
      type: 'boolean',
      options: {
        isHighlighted: true
      }
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
  preview: {
    select: {
      imageUrl: 'asset.url',
      title: 'alt'
    }
  }
}
