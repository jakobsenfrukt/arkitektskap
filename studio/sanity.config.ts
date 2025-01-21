import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {structure} from './structure/deskStructure.js'
import {schemaTypes} from './schemas/schema.js'
import {media} from 'sanity-plugin-media'
import {visionTool} from '@sanity/vision'

const singleDocuments = ['general', 'frontpage', 'about', 'contact']

export default defineConfig({
  name: 'default',
  title: 'Arkitektskap',

  projectId: 'xsh179ux',
  dataset: 'production',

  plugins: [
    structureTool({structure}),
    visionTool(),
    media()
  ],

  schema: {
    types: schemaTypes,
  },

  document: {
    newDocumentOptions: (prev, {creationContext}) => {
      if (creationContext.type === 'global') {
        return prev.filter((templateItem) => !singleDocuments.includes(templateItem.templateId))
      }
      return prev
    },
    actions: (prev, {schemaType}) => {
      if (singleDocuments.includes(schemaType)) {
        return prev.filter(({action}) => {
          if (!action) {
            return
          }
          return !['unpublish', 'delete', 'duplicate'].includes(action)
        })
      }
      return prev
    },
    comments: {
      enabled: false, // paid feature
    },
  },
  tasks: {enabled: false}, // paid feature
  scheduledPublishing: {
    enabled: false, // paid feature
  },
})
