<template>
  <Layout>
    <p class="intro">
      <!--{{ $page.frontpage.intro }}-->Gjennom våre prosjekter skal
      <strong>arkitektskap</strong> bidra til å skape varige verdier for både
      mennesker og natur.
    </p>
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
        rating
        intro
        mainImage {
          asset {
            url
            metadata {
              palette {
                darkMuted {
                  background
                  foreground
                }
                darkVibrant {
                  background
                  foreground
                }
                dominant {
                  background
                  foreground
                }
                lightMuted {
                  background
                  foreground
                }
                lightVibrant {
                  background
                  foreground
                }
                muted {
                  background
                  foreground
                }
                vibrant {
                  background
                  foreground
                }
              }
            }
          }
          alt
        }
        _rawBody
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
