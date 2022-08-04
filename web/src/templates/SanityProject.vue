<template>
  <Layout :palette="$page.project.mainImage.asset.metadata.palette">
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
        <!--<ul class="palette">
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
        </ul>-->
      </div>
      <ul class="project-info" v-if="$page.project.projectInfo">
        <li>Hvor:<br />{{ $page.project.projectInfo.location.title }}</li>
        <li>
          Når:<br /><template v-if="$page.project.projectInfo.endYear"
            >{{ $page.project.projectInfo.startYear }}&mdash;{{
              $page.project.projectInfo.endYear
            }}</template
          ><template v-else>
            Startet
            {{ $page.project.projectInfo.startYear }} (pågående)</template
          >
        </li>
        <li v-if="$page.project.projectInfo.category.length">
          Hva:
          <ul>
            <li
              v-for="(category, index) in $page.project.projectInfo.category"
              :key="`category-${index}`"
            >
              {{ category.title }}
            </li>
          </ul>
        </li>
        <li v-if="$page.project.projectInfo.client.length">
          <template v-if="$page.project.projectInfo.client.length > 1"
            >Oppdragsgivere:</template
          >
          <template v-else
            >Oppdragsgiver:</template
          >
          <ul>
            <li
              v-for="(client, index) in $page.project.projectInfo.client"
              :key="`client-${index}`"
            >
              {{ client.title }}
            </li>
          </ul>
        </li>
        <li v-if="$page.project.projectInfo.collaborators.length">
          <template v-if="$page.project.projectInfo.collaborators.length > 1"
            >Samarbeidspartnere:</template
          >
          <template v-else
            >Samarbeidspartner:</template
          >
          <ul>
            <li
              v-for="(collaborator, index) in $page.project.projectInfo
                .collaborators"
              :key="`collaborator-${index}`"
            >
              {{ collaborator.title }}
            </li>
          </ul>
        </li>
      </ul>

      <div class="project-content">
        <BlockContent
          :blocks="$page.project._rawBody"
          v-if="$page.project._rawBody"
          class="block-content"
        />
        <p v-if="$page.project.credits" class="credits">
          Foto: {{ $page.project.credits }}
        </p>
      </div>

      <ProjectGallery
        v-if="$page.project.gallery && $page.project.gallery.images.length"
        :images="$page.project.gallery.images"
      />

      <ul class="contactperson" v-if="$page.project.contactperson.length">
        <h2 v-if="$page.project.contactperson.length > 1">Kontaktpersoner</h2>
        <h2 v-else>Kontaktperson</h2>
        <li v-for="(person, index) in $page.project.contactperson" :key="index">
          <PersonItem :person="person" />
        </li>
      </ul>
    </div>
    <h2 class="related-heading" v-if="$page.project.relatedProjects.length">
      Relaterte prosjekter
    </h2>
    <RelatedProjects :projects="$page.project.relatedProjects" />
  </Layout>
</template>

<script>
import BlockContent from "~/components/tools/BlockContent";
import PersonItem from "~/components/PersonItemSmall";
import RelatedProjects from "~/components/RelatedProjects";
import ProjectGallery from "@/components/ProjectGallery";

export default {
  components: {
    BlockContent,
    RelatedProjects,
    PersonItem,
    ProjectGallery,
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
      category {
        title
      }
    }
    intro
    _rawBody
    credits
    gallery {
      images {
        ... on SanityGalleryImage {
          asset {
            _id
            url
          }
          alt
          caption
          columns
        }
      }
    }
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
    }
  }
}
</page-query>

<style lang="scss" scoped>
.project {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--spacing-sitepadding);
  &-title {
    grid-column: 1 / -1;
    font-size: var(--font-size-s);
    font-family: var(--font-mono);
    font-weight: 500;
    margin-bottom: var(--spacing-sitepadding);
  }
  &-intro {
    grid-column: 1 / -1;
    font-size: var(--font-size-xxl);
    margin-bottom: 0;
  }
  &-image {
    grid-column: 1 / -1;
    position: relative;
  }
  &-info {
    grid-column: 1 / 5;
    list-style: none;
    margin: calc(var(--spacing-sitepadding) * 1) 0
      calc(var(--spacing-sitepadding) * 4);
    padding: 0;
    font-family: var(--font-mono);
    font-weight: 500;
    font-size: var(--font-size-s);

    li {
      margin-bottom: 1rem;
    }

    ul {
      list-style: none;
      margin: 0;
      padding: 0;
      li {
        display: block;
        margin-bottom: 0;
      }
    }
  }
  &-content {
    grid-column: 5 / span 7;
    margin: calc(var(--spacing-sitepadding) * 1) 0
      calc(var(--spacing-sitepadding) * 4);
  }
}
.credits {
  font-style: italic;
  margin-top: 1rem;
  font-size: var(--font-size-xs);
}
.contactperson {
  grid-column: 1 / -1;
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
