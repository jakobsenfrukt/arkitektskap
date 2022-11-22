export default {
  name: 'people',
  type: 'document',
  title: 'Folk',
  __experimental_actions: [/*'create',*/ 'update', /*'delete',*/ 'publish'], 
  fields: [
    {
      name: 'intro',
      type: 'text',
      title: 'Intro'
    }
  ]
}
