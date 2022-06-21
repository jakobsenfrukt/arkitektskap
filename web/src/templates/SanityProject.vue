<template>
  <Layout>
    <div class="project">
      <div class="intro project-heading">
        <h1 class="project-title">{{ $page.project.title }}</h1>
        <p class="project-intro">
          {{ $page.project.intro }}
        </p>
      </div>
      <div class="project-image">
        <img
          v-if="$page.project.mainImage"
          :src="
            $urlForImage($page.project.mainImage, $page.metadata.sanityOptions)
              .width(1200)
              .auto('format')
              .url()
          "
          :alt="$page.project.mainImage.alt"
        />
        <ul class="palette">
          <li
            v-for="(color, index) in $page.project.mainImage.asset.metadata
              .palette"
            :key="`color-${index}`"
          >
            <div
              class="palette-color"
              :style="
                `--palette-background: ${
                  color.background
                }; --palette-foreground: ${color.foreground}`
              "
            >
              {{ color.background }}
            </div>
          </li>
        </ul>
      </div>
      <ul class="project-info" v-if="$page.project.projectInfo">
        <li>Sted: {{ $page.project.projectInfo.location.title }}</li>
        <li>
          År: {{ $page.project.projectInfo.startYear
          }}<template v-if="$page.project.projectInfo.endYear"
            >&mdash;{{ $page.project.projectInfo.endYear }}</template
          >
        </li>
        <li>
          Oppdragsgiver:
          <span
            v-for="(client, index) in $page.project.projectInfo.client"
            :key="`client-${index}`"
            >{{ client.title }}</span
          >
        </li>
        <li>
          Samarbeidspartnere:
          <span
            v-for="(collaborator, index) in $page.project.projectInfo
              .collaborators"
            :key="`collaborator-${index}`"
            >{{ collaborator.title }}</span
          >
        </li>
      </ul>
      <div class="project-content">
        <BlockContent
          :blocks="$page.project._rawBody"
          v-if="$page.project._rawBody"
          class="block-content"
        />
        <p class="credits">{{ $page.project.credits }}</p>
      </div>
      <ul class="contactperson" v-if="$page.project.contactperson.length">
        <h2 v-if="$page.project.contactperson.length > 1">Kontaktpersoner</h2>
        <h2 v-else>Kontaktperson</h2>
        <li v-for="(person, index) in $page.project.contactperson" :key="index">
          <PersonItem :person="person" />
        </li>
      </ul>
    </div>
  </Layout>
</template>

<script>
import BlockContent from "~/components/tools/BlockContent";
import PersonItem from "~/components/PersonItemSmall";

export default {
  components: {
    BlockContent,
    PersonItem,
  },
  metaInfo() {
    return {
      title: this.$page.project.title,
      meta: [
        {
          name: "og:image",
          key: "og:image",
          content: this.$page.project.mainImage
            ? this.$page.project.mainImage.asset.url
            : " ",
        },
      ],
    };
  },
};
</script>

<page-query>
query project ($id: ID!) {
  metadata {
    sanityOptions {
      projectId
      dataset
    }
  }
  project: sanityProject (id: $id) {
    title
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
    projectInfo {
      location {
        title
      }
      startYear
      endYear
      size
      client {
        title
      }
      collaborators {
        title
      }
    }
    intro
    _rawBody
    credits
    contactperson {
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
    relatedProjects {
      title
      slug {
        current
      }
      intro
      mainImage {
        asset {
          url
        }
        alt
      }
    }
  }
}
</page-query>

<style lang="scss" scoped>
.project {
  grid-column: 1 / -1;
  &-title {
    font-size: var(--font-size-s);
    font-family: var(--font-mono);
    font-weight: 500;
    margin-bottom: var(--spacing-sitepadding);
  }
  &-intro {
    font-size: var(--font-size-xxl);
  }
  &-image {
    position: relative;
  }
  &-info {
    list-style: none;
    margin: calc(var(--spacing-sitepadding) * 1) 0
      calc(var(--spacing-sitepadding) * 4);
    padding: 0;
    font-family: var(--font-mono);
    font-weight: 500;
    font-size: var(--font-size-s);
  }
  &-content {
    margin: calc(var(--spacing-sitepadding) * 2) 0
      calc(var(--spacing-sitepadding) * 4);
    display: grid;
    grid-template-columns: 1;
    align-items: center;
    justify-content: center;
  }
}
.credits {
  font-style: italic;
  margin-top: 1rem;
  font-size: var(--font-size-xs);
}
.contactperson {
  list-style: none;
  padding: 0;
  margin: calc(var(--spacing-sitepadding) * 2) 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-sitepadding);
  h2 {
    grid-column: 1 / -1;
    font-family: var(--font-mono);
    font-weight: 500;
    font-size: var(--font-size-s);
  }
}
</style>
