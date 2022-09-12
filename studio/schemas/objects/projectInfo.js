export default {
  name: 'projectInfo',
  type: 'object',
  title: 'Prosjektinfo',
  fields: [
    {
      title: 'Sted',
      name: 'location',
      type: 'reference',
      to: [
        {type: 'location'}
      ],
      validation: Rule => Rule.required()
    },
    {
      name: 'startYear',
      type: 'number',
      title: 'Startet (årstall)',
      validation: Rule => Rule.required()
    },
    {
      name: 'endYear',
      type: 'number',
      title: 'Ferdigstilt (årstall)',
      description: 'La feltet stå tomt hvis prosjektet fortsatt pågår.'
    },
    {
      name: 'size',
      type: 'number',
      title: 'Størrelse (i m2)',
      description: 'Skriv inn kun tall. La feltet stå tomt hvis det ikke er relevant for prosjektet.'
    },
    {
      name: 'sizeDetails',
      type: 'string',
      title: 'Størrelse (fritekst; enheter el.l.)',
      description: 'Hvis annen størrelsesinfo enn kvadratmeter er relevant for prosjektet. La feltet stå tomt hvis ikke.'
    },
    {
      title: 'Oppdragsgiver(e)',
      name: 'client',
      type: 'array',
      of: [
        {
          title: 'Oppdragsgiver',
          type: 'reference',
          to: [
            {
              type: 'client'
            }
          ]
        }
      ]
    },
    {
      title: 'Samarbeidspartner(e)',
      name: 'collaborators',
      type: 'array',
      of: [
        {
          title: 'Samarbeidspartner',
          type: 'reference',
          to: [
            {
              type: 'collaborator'
            }
          ]
        }
      ]
    },
    {
      title: 'Kategori',
      name: 'category',
      type: 'array',
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
