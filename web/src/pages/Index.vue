<template>
  <Layout>
    <p>{{ $page.frontpage.intro }}</p>
    <ProjectGrid :projects="$page.projects" />
  </Layout>
</template>

<page-query>
query {
  metadata {
    sanityOptions {
      projectId
      dataset
    }
  }
  frontpage: sanityFrontpage(id: "frontpage") {
    intro
  }
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
    title: "Forside",
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

<style lang="scss" scoped>
h1 {
  color: var(--color-highlight);
}
</style>
