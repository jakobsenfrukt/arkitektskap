export default {
  name: 'figureCaptioned',
  type: 'image',
  title: 'Image with caption',
  options: {
    hotspot: true
  },
  fields: [
    {
      name: 'caption',
      type: 'string',
      title: 'Bildetekst'
    },
    {
      name: 'alt',
      type: 'string',
      title: 'Alternativ tekst',
      description: 'Viktig for SEO og tilgjengelighet. Beskriv kort hva man ser i bildet for en person som er blind.'
    }
  ],
  preview: {
    select: {
      imageUrl: 'asset.url',
      title: 'caption'
    }
  }
}
