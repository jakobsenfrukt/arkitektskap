export default {
  name: 'about',
  type: 'document',
  title: 'Om',
  //__experimental_actions: [/*'create',*/ 'update', /*'delete',*/ 'publish'], 
  fields: [
    {
      name: 'intro',
      type: 'text',
      title: 'Intro'
    },
    {
      name: 'body',
      title: 'Brødtekst',
      type: 'body',
    },
  ]
}
