<template>
  <Layout>
    <h1>Folka</h1>
    <PersonGrid :people="$page.people" />
  </Layout>
</template>

<page-query>
query {
  people: allSanityPerson(sortBy: "name") {
    edges {
      node {
        id
        name
        title
        _rawBio
        image {
          asset {
            url
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
