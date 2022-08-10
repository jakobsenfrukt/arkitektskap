export default {
  name: 'contact',
  type: 'document',
  title: 'Contact',
  __experimental_actions: [/*'create',*/ 'update', /*'delete',*/ 'publish'], 
  fields: [
    {
      title: 'Intro',
      description: 'Teksten under "Kontakt" nederst på nettsiden vil velge tilfeldig blant disse tekstene hver gang man oppdaterer eller navigerer til en ny side.',
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
      name: 'address',
      type: 'simpleBody',
      title: 'Adresse'
    },
    {
      name: 'email',
      type: 'string',
      title: 'E-postadresse'
    },
    {
      name: 'phone',
      type: 'string',
      title: 'Telefon'
    },
    {
      name: 'facebook',
      type: 'string',
      title: 'Facebook URL'
    },
    {
      name: 'instagram',
      type: 'string',
      title: 'Instagram URL'
    },
    {
      name: 'linkedin',
      type: 'string',
      title: 'Linkedin URL'
    }
  ]
}
