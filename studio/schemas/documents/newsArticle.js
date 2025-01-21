export default {
  name: 'newsArticle',
  type: 'document',
  title: 'Nyhetsartikkel',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Tittel',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      description: 'Slutten på URLen til siden, eks. "arkitektskap.no/nyheter/slug-kommer-her". Må skrives med små bokstaver, og uten mellomrom eller ÆØÅ. Skriv inn navn i feltet over og klikk på Generate for å få en perfekt slug.',
      validation: Rule => Rule.required()
    },
    {
      name: 'publishDate',
      title: 'Publish date',
      type: 'date',
      validation: Rule => Rule.required()
    },
    {
      name: 'intro',
      type: 'text',
      title: 'Intro',
      rows: 3
    },
    {
      name: 'mainImage',
      title: 'Hovedbilde',
      type: 'figure'
    },
    {
      name: 'body',
      title: 'Brødtekst',
      type: 'body',
    },
    {
      name: 'relatedProjects',
      title: 'Relaterte prosjekter',
      type: 'array',
      of: [
        {
          name: 'project',
          type: 'reference',
          to: {
            type: 'project'
          }
        }
      ]
    },
    {
      name: 'relatedPeople',
      title: 'Relaterte folk',
      type: 'array',
      of: [
        {
          name: 'person',
          type: 'reference',
          to: {
            type: 'person'
          }
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'title',
      image: 'mainImage',
      date: 'publishDate',
    },
    prepare(selection) {
      const {title, image, date} = selection
      return {
        title: title,
        subtitle: date,
        media: image,
      }
    },
  },
  orderings: [
    {
      title: 'Publish Date, New',
      name: 'publishDateDesc',
      by: [{field: 'publishDate', direction: 'desc'}],
    },
    {
      title: 'Publish Date, Old',
      name: 'publishDateAsc',
      by: [{field: 'publishDate', direction: 'asc'}],
    },
  ],
}
