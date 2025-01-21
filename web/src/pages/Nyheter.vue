<template>
  <Layout>
    <p class="intro">Nyheter</p>
    <NewsGrid :articles="$page.articles.edges" />
  </Layout>
</template>

<page-query>
query {
  articles: allSanityNewsArticle(sortBy: "publishDate", order: DESC) {
    edges {
      node {
        id
        title
        slug {
          current
        }
        publishDate
        mainImage {
          asset {
            url
            metadata {
              lqip
              dimensions {
                aspectRatio
              }
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
      }
    }
  }
}
</page-query>

<script>
import NewsGrid from "~/components/NewsGrid";

export default {
  components: {
    NewsGrid,
  },
  metaInfo: {
    title: "Nyheter",
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
