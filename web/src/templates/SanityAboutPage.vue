<template>
  <Layout>
    <h1 class="aboutPage-title">&mdash;<br />Interiør</h1>
    <p
      class="intro aboutPage-intro"
      v-html="$replaceLogo($page.aboutPage.intro)"
    ></p>
    <SuperProjectImage
      v-if="$page.aboutPage.mainImage"
      class="main-image"
      :image="$page.aboutPage.mainImage"
      :alt="
        $page.aboutPage.mainImage.alt
          ? $page.aboutPage.mainImage.alt
          : 'Bilde fra prosjekt'
      "
      :width="1200"
      :lqip="$page.aboutPage.mainImage.asset.metadata.lqip"
      :aspectRatio="
        $page.aboutPage.mainImage.asset.metadata.dimensions.aspectRatio
      "
    />
    <div class="aboutPage-content">
      <BlockContent
        :blocks="$page.aboutPage._rawBody"
        v-if="$page.aboutPage._rawBody"
        class="block-content"
      />
    </div>
    <h2 class="section-heading" v-if="$page.aboutPage.featuredProjects.length">
      Utforsk våre interiørprosjekter
    </h2>
    <RelatedProjects :projects="$page.aboutPage.featuredProjects" />
    <div class="featuredPeople">
      <PersonItem
        v-for="person in $page.aboutPage.featuredPeople"
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
      title: this.$page.aboutPage.title,
      meta: [
        {
          name: "og:image",
          key: "og:image",
          content: this.$page.aboutPage.image
            ? this.$page.aboutPage.image.asset.url
            : " ",
        },
      ],
    };
  },
};
</script>

<page-query>
query aboutPage ($id: ID!) {
  metadata {
    sanityOptions {
      projectId
      dataset
    }
  }
  aboutPage: sanityAboutPage (id: $id) {
    title
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
    featuredProjects {
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
    featuredPeople {
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
.aboutPage-title {
  font-size: 1rem;
  font-family: var(--font-mono);
  font-weight: 500;
  line-height: 1.6;
  text-transform: lowercase;
  margin-top: calc(var(--spacing-m) * -1.15);
  margin-bottom: var(--spacing-m);
  position: relative;
  z-index: 9000;
}
.aboutPage-intro {
  grid-column: 1 / -1;
}
.main-image {
  grid-column: 1 / -1;
  margin-bottom: calc(var(--spacing-m) * 2);
}
.aboutPage-content {
  grid-column: 5 / span 7;
  margin-bottom: calc(var(--spacing-m) * 5);

  blockquote {
    width: 150%;
    transform: translateX(-25%);
    margin: 5rem 0;
  }
}
.aboutPage-numbers {
  grid-column: 1 / span 4;
  list-style: none;
  margin: 0;
  padding: 0;

  li {
    margin-bottom: 2rem;
    position: relative;
    padding-left: 2.4em;
    .dingbat {
      position: absolute;
      top: 0.4rem;
      left: 0;
    }
    sup {
      line-height: 0;
    }
  }
  h2 {
    grid-column: 1 / -1;
  }
  .number {
    font-family: var(--font-mono);
    font-size: var(--font-size-l);
    margin: 0 0.1em 0.2em 0;
    display: block;
    line-height: 1;
  }
}

.featuredPeople {
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
  .aboutPage-title {
    margin-top: calc(var(--spacing-m) * -1.6);
  }
  .featuredPeople {
    grid-template-columns: 1fr;

    li {
      margin-bottom: var(--spacing-m);
    }
  }
  .aboutPage-content {
    blockquote {
      transform: none;
      width: 100%;
      margin: var(--spacing-l) 0;
    }
  }
}

@media (max-width: 800px) {
  .aboutPage-content,
  .aboutPage-numbers {
    grid-column: 1 / -1;
  }
  .aboutPage-numbers {
    margin-bottom: var(--spacing-l);
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin-bottom: var(--spacing-m);

    li {
      .dingbat {
        top: 0;
      }
    }
  }
}

@media (max-width: 500px) {
  .aboutPage-numbers {
    margin-bottom: var(--spacing-m);
    grid-template-columns: 1fr;

    li {
      .dingbat {
        top: 0;
      }
    }
  }
}
</style>
