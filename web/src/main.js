// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import './assets/css/main.scss'

import DefaultLayout from '~/layouts/Default.vue'
import SuperImage from "@/components/tools/SuperImage";

// Import image url builder
import urlForImage from './utils/urlForImage'

// Import function that replaces logo
import replaceLogo from './utils/replaceLogo'

// Import function that prepares color palette
import prepareColors from './utils/palette'

export default function (Vue, { router, head, isClient }) {
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)

  Vue.component('SuperImage', SuperImage)

  // Inject global image URL builder
  Vue.prototype.$urlForImage = urlForImage

  // Replaces logo where arkitektskap is mentioned
  Vue.prototype.$replaceLogo = replaceLogo

  // Prepares WCAG compliant color palette
  Vue.prototype.$prepareColors = prepareColors

  head.htmlAttrs = { lang: 'no' }
}
