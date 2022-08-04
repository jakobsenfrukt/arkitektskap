export default {
  name: 'project',
  type: 'document',
  title: 'Prosjekt',
  fields: [
    {
      name: 'title',
      title: 'Tittel',
      type: 'string',
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
      description: 'Slutten på URLen til prosjektsiden, eks. "arkitektskap.no/prosjekter/slug-kommer-her". Må skrives med små bokstaver, og uten mellomrom eller ÆØÅ. Skriv inn tittel i feltet over og klikk på Generate for å få en perfekt slug.',
      validation: Rule => Rule.required()
    },
    {
      name: 'intro',
      title: 'Introtekst',
      type: 'string',
      description: 'En setning om prosjektet som dukker opp på forsiden + som overskrift på prosjektsiden.'
    },
    {
      title: 'Rangering', 
      name: 'rating',
      type: 'string',
      options: {
        list: [
          {value: '3', title: '***'},
          {value: '2', title: '**'},
          {value: '1', title: '*'},
        ],
        layout: 'radio',
        //direction: 'horizontal'
      },
      validation: Rule => Rule.required()
    },
    {
      title: 'Prosjektinfo',
      name: 'projectInfo',
      type: 'projectInfo',
      validation: Rule => Rule.required()
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
      name: 'credits',
      title: 'Fotokreditering',
      description: 'Skriv kun navn, "Foto:" kommer foran på nettsiden automatisk.',
      type: 'string'
    },
    {
      title: 'Kontaktperson(er)',
      name: 'contactperson',
      type: 'array',
      of: [
        {
          title: 'Person',
          type: 'reference',
          to: [
            {
              type: 'person'
            }
          ]
        }
      ]
    },
    {
      title: 'Bildegalleri',
      name: 'gallery',
      type: 'gallery'
    },
    {
      title: 'Andre involverte',
      name: 'peopleInvolved',
      type: 'array',
      of: [
        {
          title: 'Person',
          type: 'reference',
          to: [
            {
              type: 'person'
            }
          ]
        }
      ]
    },
    {
      title: 'Relaterte prosjekter',
      name: 'relatedProjects',
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
      title: 'title',
      subtitle: 'year',
      media: 'mainImage',
    },
  },
}
