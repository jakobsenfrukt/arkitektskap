export default {
  name: 'aboutPage',
  type: 'document',
  title: 'Om',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Tittel'
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      description: 'Slutten på URLen til siden, eks. "arkitektskap.no/om/slug-kommer-her". Må skrives med små bokstaver, og uten mellomrom eller ÆØÅ. Skriv inn navn i feltet over og klikk på Generate for å få en perfekt slug.',
      validation: Rule => Rule.required()
    },
    {
      name: 'intro',
      type: 'text',
      title: 'Intro'
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
      name: 'featuredProjects',
      title: 'Fremhevede prosjekter',
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
      name: 'featuredPeople',
      title: 'Fremhevede folk',
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
  ]
}
