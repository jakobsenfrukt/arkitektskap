export default {
  name: 'general',
  type: 'document',
  title: 'General',
  fields: [
    {
      name: 'description',
      type: 'text',
      title: 'Beskrivelse',
      description: 'Beskriv nettsiden for søkemotorer og sosiale medier.'
    },
    {
      name: 'ogimg',
      type: 'image',
      title: 'Bilde til sosiale medier',
      description: 'Dukker opp når nettsiden deles i sosiale medier hvis ikke et annet bilde er tilgjengelig.',
      validation: Rule => Rule.error('Mangler bilde til sosiale medier!').required(),
    },
  ]
}
