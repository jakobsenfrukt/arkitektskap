export default {
  name: 'person',
  type: 'document',
  title: 'Person',
  fields: [
    {
      name: 'name',
      title: 'Navn',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
    },
    {
      name: 'title',
      title: 'Tittel',
      type: 'string',
    },
    {
      name: 'bio',
      title: 'Bio',
      type: 'simpleBody',
    },
    {
      name: 'image',
      title: 'Portrett',
      type: 'figure'
    },
  ],

  preview: {
    select: {
      title: 'name',
      subtitle: 'title',
      media: 'image',
    },
  },
}
