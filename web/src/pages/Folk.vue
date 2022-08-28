<template>
  <Layout>
    <p class="intro" v-html="$replaceLogo($page.peoplePage.intro)"></p>
    <PersonGrid :people="$page.people" />
  </Layout>
</template>

<page-query>
query {
  peoplePage: sanityPeople(id: "people") {
    intro
  }
  people: allSanityPerson(sortBy: "name", order: ASC) {
    edges {
      node {
        id
        name
        title
        _rawBio
        email
        phone
        image {
          asset {
            url
            metadata {
              lqip
              dimensions {
                aspectRatio
              }
            }
          }
          hotspot {
            x
            y
            height
            width
          }
          crop {
            top
            bottom
            left
            right
          }
          alt
        }
        slug {
          current
        }
      }
    }
  }
}
</page-query>

<script>
import PersonGrid from "~/components/PersonGrid";

export default {
  components: {
    PersonGrid,
  },
  metaInfo: {
    title: "Folka",
    meta: [
      {
        name: "og:image",
        key: "og:image",
        content: "https://arkitektskap.no/images/og-img.jpg",
      },
    ],
  },
};
</script>

<style lang="scss" scoped></style>
