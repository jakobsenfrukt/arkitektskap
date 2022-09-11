<template>
  <Layout :palette="$page.person.image.asset.metadata.palette">
    <div class="person">
      <SuperImage
        v-if="$page.person.image"
        class="person-image"
        :image="$page.person.image"
        :alt="
          $page.person.image.alt ? $page.person.image.alt : 'Portrett av ansatt'
        "
        :width="1000"
        :lqip="$page.person.image.asset.metadata.lqip"
        :aspectRatio="$page.person.image.asset.metadata.dimensions.aspectRatio"
      />
      <div class="person-text">
        <h1 class="person-name">{{ $page.person.name }}</h1>
        <div class="person-title">{{ $page.person.title }}</div>

        <div class="person-contact">
          <a :href="$page.person.phone" v-if="$page.person.phone"
            ><Dingbats icon="smiley" /><span>{{ $page.person.phone }}</span></a
          >
          <a :href="$page.person.email" v-if="$page.person.email"
            ><Dingbats icon="email" /><span>{{ $page.person.email }}</span></a
          >
        </div>

        <div class="person-content">
          <BlockContent
            :blocks="$page.person._rawBio"
            v-if="$page.person._rawBio"
          />
        </div>

        <div class="person-languages" v-if="$page.person.languages.length">
          <Dingbats icon="earth" /><strong>Språk:</strong>
          <ul>
            <li
              v-for="(language, index) in $page.person.languages"
              :key="`language-${index}`"
            >
              {{ index === 0 ? language.title : language.title.toLowerCase() }}
            </li>
          </ul>
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
      :person="firstName($page.person.name)"
    />
  </Layout>
</template>

<script>
import BlockContent from "~/components/tools/BlockContent";
import RelatedProjects from "~/components/RelatedProjects";
import Dingbats from "@/components/tools/Dingbats.vue";

export default {
  components: {
    BlockContent,
    RelatedProjects,
    Dingbats,
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
    languages {
      title
    }
    image {
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
    margin-bottom: var(--spacing-l);
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
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  &-languages {
    margin: 4rem 0 var(--spacing-l);
    ul {
      list-style: none;
      margin: 0 0 0 2.9em;
      padding: 0;

      li {
        display: inline;
        &:after {
          content: ", ";
        }
        &:last-of-type {
          &:after {
            display: none;
          }
        }
      }
    }
  }
}
@media (max-width: 800px) {
  .person {
    grid-template-columns: 1fr;
    margin-top: 0;
    &-image {
      order: 1;
      margin-bottom: var(--spacing-s);
    }
  }
}
</style>
