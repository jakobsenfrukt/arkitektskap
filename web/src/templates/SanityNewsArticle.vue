<template>
  <Layout>
    <h1 class="newsArticle-title">
      {{ $page.newsArticle.title }}
    </h1>
    <div class="meta">
        <span class="date">
          {{ 
            new Date($page.newsArticle.publishDate).toLocaleDateString("no-NB", {
              month: "long",
              year: "numeric",
            })
          }}</span>
        <g-link class="link" to="/nyheter">Flere nyheter &rarr;</g-link>
      </div>
    <SuperProjectImage
      v-if="$page.newsArticle.mainImage"
      class="main-image"
      :image="$page.newsArticle.mainImage"
      :alt="
        $page.newsArticle.mainImage.alt
          ? $page.newsArticle.mainImage.alt
          : 'Bilde fra prosjekt'
      "
      :width="1920"
      :lqip="$page.newsArticle.mainImage.asset.metadata.lqip"
      :aspectRatio="
        $page.newsArticle.mainImage.asset.metadata.dimensions.aspectRatio
      "
    />
    <p
      v-if="$page.newsArticle.intro"
      class="intro newsArticle-intro"
      v-html="$replaceLogo($page.newsArticle.intro)"
    ></p>
    <div class="newsArticle-content">
      <BlockContent
        :blocks="$page.newsArticle._rawBody"
        v-if="$page.newsArticle._rawBody"
        class="block-content"
      />
    </div>
    <h2 class="section-heading" v-if="$page.newsArticle.relatedProjects.length">
      Relaterte prosjekter
    </h2>
    <RelatedProjects :projects="$page.newsArticle.relatedProjects" />
    <h2 class="section-heading" v-if="$page.newsArticle.relatedPeople.length">
      Relaterte folk
    </h2>
    <div class="relatedPeople">
      <PersonItem
        v-for="person in $page.newsArticle.relatedPeople"
        :key="person.id"
        :person="person"
      />
    </div>
  </Layout>
</template>

<script>
import BlockContent from "~/components/tools/BlockContent";
import RelatedProjects from "~/components/RelatedProjects";
import Dingbats from "@/components/tools/Dingbats.vue";
import PersonItem from "@/components/PersonItem.vue";
import SuperProjectImage from "@/components/tools/SuperProjectImage.vue";

export default {
  components: {
    BlockContent,
    RelatedProjects,
    Dingbats,
    PersonItem,
    SuperProjectImage,
  },
  metaInfo() {
    return {
      title: this.$page.newsArticle.title,
      meta: [
        {
          name: "og:image",
          key: "og:image",
          content: this.$page.newsArticle.mainImage
            ? this.$page.newsArticle.mainImage.asset.url
            : " ",
        },
      ],
    };
  },
};
</script>

<page-query>
query newsArticle ($id: ID!) {
  metadata {
    sanityOptions {
      projectId
      dataset
    }
  }
  newsArticle: sanityNewsArticle (id: $id) {
    title
    publishDate
    intro
    _rawBody
    mainImage {
      asset {
        _id
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
    relatedProjects {
      title
      intro
      mainImage {
        asset {
          _id
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
      slug {
        current
      }
    }
    relatedPeople {
      id
      name
      title
      email
      phone
      slug {
        current
      }
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
    }
  }
}
</page-query>

<style lang="scss">
.newsArticle-title {
  grid-column: 1 / -1;
  font-family: var(--font-serif);
  font-size: var(--font-size-xxl);
  max-width: 20em;
  margin: calc(var(--spacing-m) * 1.6) 0 var(--spacing-l);
  line-height: 1.2;
  color: var(--color-text);
}

.meta {
  grid-column: 1 / -1;
  font-family: var(--font-mono);
  text-transform: lowercase;
  color: var(--color-text);
  margin: var(--spacing-s) 0;
  display: flex;
  gap: 1rem;
  justify-content: space-between;
}

.link {
  display: inline-flex;
}

.newsArticle-intro {
  grid-column: 1 / -1;
  font-size: var(--font-size-l);
  max-width: 24em;
}
.main-image {
  grid-column: 1 / -1;
  margin-bottom: calc(var(--spacing-m) * 2);
}
.newsArticle-content {
  grid-column: 5 / span 7;
  margin-bottom: calc(var(--spacing-m) * 5);

  blockquote {
    width: 150%;
    transform: translateX(-25%);
    margin: 5rem 0;
  }
}

.relatedPeople {
  grid-column: 1 / -1;
  list-style: none;
  padding: 0;
  margin: 0 0 var(--spacing-l);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-m);

  .section-heading {
    margin-bottom: 0;
  }
}

@media (max-width: 1000px) {
  .relatedPeople {
    grid-template-columns: 1fr;

    li {
      margin-bottom: var(--spacing-m);
    }
  }
  .newsArticle-content {
    blockquote {
      transform: none;
      width: 100%;
      margin: var(--spacing-l) 0;
    }
  }
}

@media (max-width: 800px) {
  .newsArticle-content {
    grid-column: 1 / -1;
  }
}
</style>
