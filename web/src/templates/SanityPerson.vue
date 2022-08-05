<template>
  <Layout :palette="$page.person.image.asset.metadata.palette">
    <div class="person">
      <div class="person-image">
        <img
          v-if="$page.person.image"
          :src="
            $urlForImage($page.person.image, $page.metadata.sanityOptions)
              .width(1200)
              .auto('format')
              .url()
          "
          :alt="$page.person.image.alt"
        />
      </div>
      <div class="person-text">
        <h1 class="person-name">{{ $page.person.name }}</h1>
        <p class="person-title">{{ $page.person.title }}</p>

        <p class="person-contact">
          <a :href="$page.person.phone">{{ $page.person.phone }}</a>
          <a :href="$page.person.email">{{ $page.person.email }}</a>
        </p>

        <div class="person-content">
          <BlockContent
            :blocks="$page.person._rawBio"
            v-if="$page.person._rawBio"
          />
        </div>
      </div>
    </div>
    <h2
      class="section-heading"
      v-if="
        combinedProjects($page.person.featuredProjects, relatedProjects())
          .length
      "
    >
      {{ firstName($page.person.name) }} har blant annet jobbet med:
    </h2>
    <RelatedProjects
      :projects="
        combinedProjects($page.person.featuredProjects, relatedProjects())
      "
      :limit="4"
      :person="$page.person.name"
    />
  </Layout>
</template>

<script>
import BlockContent from "~/components/tools/BlockContent";
import RelatedProjects from "~/components/RelatedProjects";

export default {
  components: {
    BlockContent,
    RelatedProjects,
  },
  methods: {
    firstName() {
      return this.$page.person.name.split(" ")[0];
    },
    relatedProjects() {
      const allProjects = this.$page.projects.edges;
      return allProjects
        .filter((item) => {
          if (!item.node.contactperson) {
            return false;
          }
          return (
            item.node.contactperson.some((item) => {
              return item.name === this.$page.person.name;
            }) ||
            item.node.peopleInvolved.some((item) => {
              return item.name === this.$page.person.name;
            })
          );
        })
        .map((item) => item.node);
    },
    combinedProjects(array1, array2) {
      return array1.concat(array2);
    },
  },
  metaInfo() {
    return {
      title: this.$page.person.title,
      meta: [
        {
          name: "og:image",
          key: "og:image",
          content: this.$page.person.image
            ? this.$page.person.image.asset.url
            : " ",
        },
      ],
    };
  },
};
</script>

<page-query>
query person ($id: ID!) {
  metadata {
    sanityOptions {
      projectId
      dataset
    }
  }
  person: sanityPerson (id: $id) {
    name
    title
    _rawBio
    email
    phone
    image {
      asset {
        _id
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
    featuredProjects {
      title
      intro
      mainImage {
        asset {
          _id
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
      slug {
        current
      }
    }
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
        contactperson {
          name
        }
        peopleInvolved {
          name
        }
      }
    }
  }
}
</page-query>

<style lang="scss" scoped>
.person {
  margin-top: 3rem;
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--spacing-m);
  &-image {
    grid-column: span 6;
    order: 2;
  }
  &-text {
    grid-column: span 6;
    order: 1;
  }
  &-name {
    font-size: var(--font-size-xl);
  }
  &-title {
    font-style: italic;
    font-size: var(--font-size-m);
  }
  &-contact {
    font-family: var(--font-mono);
    margin: 4rem 0;
    a {
      display: block;
      margin-bottom: 0.6rem;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
