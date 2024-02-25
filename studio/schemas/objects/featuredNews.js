export default {
  title: 'Fremhevet nyhet',
  name: 'featuredNews',
  type: 'object',
  fields: [
    {
      title: 'Vis fremhevet nyhet',
      type: 'boolean',
      name: 'show'
    },
    {
      title: 'Bilde',
      type: 'figure',
      name: 'image'
    },
    {
      title: 'Tekst',
      type: 'text',
      name: 'text',
      rows: 3
    }
  ]
}
