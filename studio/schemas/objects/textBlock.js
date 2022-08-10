export default {
  name: 'textBlock',
  type: 'object',
  title: 'Tekstblokk',
  fields: [
    {
      title: 'Kategori',
      name: 'category',
      type: 'text',
      of: [
        {
          title: 'Kategori',
          type: 'reference',
          to: [
            {
              type: 'category',
            }
          ],
          options: {
            disableNew: true,
          }
        }
      ]
    },
  ]
}
