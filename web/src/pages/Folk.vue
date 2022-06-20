<template>
  <Layout>
    <p class="intro">
      <!--{{ $page.people.intro }}-->En introtekst til folka i
      <strong>arkitektskap</strong> kommer her.
    </p>
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
        email
        phone
        image {
          asset {
            url
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
