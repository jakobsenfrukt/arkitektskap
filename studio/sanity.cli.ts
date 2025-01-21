import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  studioHost: 'arkitektskap',
  api: {
    projectId: 'xsh179ux',
    dataset: 'production',
  },
  /**
   * Enable auto-updates for studios.
   * Learn more at https://www.sanity.io/docs/cli#auto-updates
   */
  autoUpdates: true,
})
