export default {
  name: 'frontpage',
  type: 'document',
  title: 'Forside',
  fields: [
    {
      title: 'Intro',
      description: 'En av disse tekstene vil velges ut tilfeldig og vises øverst hver gang man besøker forsiden.',
      name: 'intro',
      type: 'array',
      of: [
        {
          title: 'Tekst',
          type: 'text'
        }
      ]
    },
    {
      title: 'Fremhevet nyhet',
      name: 'featuredNews',
      type: 'featuredNews'
    }
  ]
}
