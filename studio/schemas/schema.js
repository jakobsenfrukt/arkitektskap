import general from './documents/general'
import frontpage from './documents/frontpage'
import about from './documents/about'
import contact from './documents/contact'
import project from './documents/project'
import category from './documents/category'
import person from './documents/person'
import location from './documents/location'
import collaborator from './documents/collaborator'
import client from './documents/client'
import language from './documents/language'
import people from './documents/people'
import newsArticle from './documents/newsArticle'

import body from './objects/body'
import simpleBody from './objects/simpleBody'
import figure from './objects/figure'
import figureCaptioned from './objects/figureCaptioned'
import projectInfo from './objects/projectInfo'
import gallery from './objects/gallery'
import galleryImage from './objects/galleryImage'
import aboutNumbers from './objects/aboutNumbers'
import featuredNews from './objects/featuredNews'

export const schemaTypes = [
  //documents
  general,
  frontpage,
  about,
  contact,
  project,
  category,
  person,
  location,
  collaborator,
  client,
  language,
  people,
  newsArticle,

  // objects
  body,
  simpleBody,
  figure,
  figureCaptioned,
  projectInfo,
  gallery,
  galleryImage,
  aboutNumbers,
  featuredNews
]
