export default {
  name: 'contact',
  type: 'document',
  title: 'Contact',
  __experimental_actions: [/*'create',*/ 'update', /*'delete',*/ 'publish'], 
  fields: [
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
