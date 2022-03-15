<template>
  <Layout>
    <h1>Prosjekter</h1>
    <ProjectGrid :projects="$page.projects" />
  </Layout>
</template>

<page-query>
query {
  projects: allSanityProject(sortBy: "year") {
    edges {
      node {
        id
        title
        slug {
          current
        }
        mainImage {
          asset {
            url
          }
          alt
        }
      }
    }
  }
}
</page-query>

<script>
import ProjectGrid from "~/components/ProjectGrid";

export default {
  components: {
    ProjectGrid,
  },
  metaInfo: {
    title: "Prosjekter",
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
