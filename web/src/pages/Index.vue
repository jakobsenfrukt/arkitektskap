<template>
  <Layout>
    <p class="intro">{{ $page.frontpage.intro }}</p>
    <Filtering />
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
import Filtering from "~/components/Filter";

export default {
  components: {
    ProjectGrid,
    Filtering,
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

<style lang="scss" scoped></style>
