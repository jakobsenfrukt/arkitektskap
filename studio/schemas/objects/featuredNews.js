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
      title: 'Nyhetsartikkel',
      name: 'newsArticle',
      type: 'reference',
      to: [
        {
          type: 'newsArticle'
        }
      ]
    }
  ]
}
