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
      title: 'Arkitektskap i tall',
      name: 'numbers',
      type: 'aboutNumbers',
      description: 'Disse tallene oppdateres manuelt, mens de andre tallene som listes ut på "Om oss"-siden hentes ut automatisk.'
    },
    {
      name: 'body',
      title: 'Brødtekst',
      type: 'body',
    },
  ]
}
