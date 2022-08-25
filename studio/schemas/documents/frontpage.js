export default {
  name: 'frontpage',
  type: 'document',
  title: 'Forside',
  __experimental_actions: [/*'create',*/ 'update', /*'delete',*/ 'publish'], 
  fields: [
    {
      title: 'Intro',
      description: 'En av disse tekstene vil velges ut tilfeldig og vises øverst hver gang man besøker forsiden.',
      name: 'intro',
      type: 'array',
      of: [
        {
          title: 'Tekst',
          type: 'text'
        }
      ]
    },
  ]
}
