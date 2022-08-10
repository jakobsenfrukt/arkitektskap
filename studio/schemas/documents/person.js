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
      description: 'Slutten på URLen til personsiden, eks. "arkitektskap.no/folk/slug-kommer-her". Må skrives med små bokstaver, og uten mellomrom eller ÆØÅ. Skriv inn navn i feltet over og klikk på Generate for å få en perfekt slug.',
      validation: Rule => Rule.required()
    },
    {
      name: 'title',
      title: 'Tittel',
      type: 'string',
    },
    {
      name: 'phone',
      title: 'Telefon',
      type: 'string',
    },
    {
      name: 'email',
      title: 'E-post',
      type: 'string',
    },
    {
      name: 'bio',
      title: 'Bio',
      type: 'simpleBody',
    },
    {
      title: 'Språk',
      name: 'languages',
      type: 'array',
      of: [
        {
          title: 'Språk',
          type: 'reference',
          to: [
            {
              type: 'language'
            }
          ]
        }
      ]
    },
    {
      name: 'image',
      title: 'Portrett',
      type: 'figure'
    },
    {
      title: 'Fremhevede prosjekter',
      description: 'Havner først i listen over hvilke prosjekter personen har vært involvert i. De øvrige prosjektene personen er markert i via prosjektsidene hentes ut automatisk.',
      name: 'featuredProjects',
      type: 'array',
      of: [
        {
          title: 'Prosjekt',
          type: 'reference',
          to: [
            {
              type: 'project'
            }
          ]
        }
      ]
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
