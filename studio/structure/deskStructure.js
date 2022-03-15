import S from '@sanity/desk-tool/structure-builder'

import { MdSettings, MdHomeFilled, MdArticle, MdPeople, MdArchitecture, MdEmail, MdInfo } from 'react-icons/md'

const hiddenDocTypes = listItem =>
  !['general', 'frontpage', 'project', 'person', 'contact', 'about'].includes(listItem.getId())

export default () =>
  S.list()
    .title('Innhold')
    .items([
      S.listItem()
        .title('Generelt')
        .icon(MdSettings)
        .child(
          S.editor()
            .title('Generelt')
            .id('general')
            .schemaType('general')
            .documentId('general')
        ),
      S.listItem()
        .title('Forside')
        .icon(MdHomeFilled)
        .child(
          S.editor()
            .title('Forside')
            .id('frontpage')
            .schemaType('frontpage')
            .documentId('frontpage')
        ),
      S.listItem()
        .title('Prosjekter')
        .icon(MdArchitecture)
        .schemaType('project')
        .child(S.documentTypeList('project').title('Prosjekter')),
      S.listItem()
        .title('Personer')
        .icon(MdPeople)
        .schemaType('person')
        .child(S.documentTypeList('person').title('Personer')),
      S.listItem()
        .title('Om')
        .icon(MdInfo)
        .child(
          S.editor()
            .title('Om')
            .id('about')
            .schemaType('about')
            .documentId('about')
        ),
      S.listItem()
        .title('Kontakt')
        .icon(MdEmail)
        .child(
          S.editor()
            .title('Kontakt')
            .id('contact')
            .schemaType('contact')
            .documentId('contact')
        ),
      // This returns an array of all the document types
      // defined in schema.js. We filter out those that we have
      // defined the structure above
      ...S.documentTypeListItems().filter(hiddenDocTypes)
    ])
