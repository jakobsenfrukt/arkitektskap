<template>
  <Layout :palette="$page.project.mainImage.asset.metadata.palette">
    <div
      class="project"
      :class="{ fullwidth: $page.project.fullwidth }"
      :key="$page.project.id"
    >
      <div class="intro project-heading">
        <h1 class="project-title" v-if="$page.project.intro">
          {{ $page.project.title }}
        </h1>
        <h1 class="project-intro" v-else>
          {{ $page.project.title }}
        </h1>
        <div class="project-intro" v-if="$page.project.intro">
          {{ $page.project.intro }}
        </div>
      </div>

      <ul class="project-info" v-if="$page.project.projectInfo">
        <li>
          <strong>Hvor:</strong><br />{{
            $page.project.projectInfo.location.title
          }}
        </li>
        <li>
          <strong>Når:</strong><br /><template
            v-if="
              $page.project.projectInfo.endYear &&
                $page.project.projectInfo.endYear ===
                  $page.project.projectInfo.startYear
            "
            >{{ $page.project.projectInfo.startYear }}</template
          ><template v-else-if="$page.project.projectInfo.endYear"
            >{{ $page.project.projectInfo.startYear }}&mdash;{{
              $page.project.projectInfo.endYear
            }}</template
          ><template v-else>
            Startet
            {{ $page.project.projectInfo.startYear }} (pågående)</template
          >
        </li>
        <li v-if="$page.project.projectInfo.category.length">
          <strong>Hva:</strong>
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
            ><strong>Oppdragsgivere:</strong></template
          >
          <template v-else
            ><strong>Oppdragsgiver:</strong></template
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
            ><strong>Samarbeidspartnere:</strong></template
          >
          <template v-else
            ><strong>Samarbeidspartner:</strong></template
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
        <li v-if="$page.project.projectInfo.size">
          <strong>Størrelse:</strong><br />{{
            $page.project.projectInfo.size
          }}
          m<sup>2</sup>
        </li>
      </ul>
      <SuperProjectImage
        v-if="$page.project.mainImage"
        class="project-image"
        :image="$page.project.mainImage"
        :alt="
          $page.project.mainImage.alt
            ? $page.project.mainImage.alt
            : 'Bilde fra prosjekt'
        "
        :width="1200"
        :lqip="$page.project.mainImage.asset.metadata.lqip"
        :aspectRatio="
          $page.project.mainImage.asset.metadata.dimensions.aspectRatio
        "
      />

      <div class="project-content">
        <BlockContent
          :blocks="$page.project._rawBody"
          v-if="$page.project._rawBody"
          class="block-content"
        />
        <div v-if="$page.project.credits" class="credits">
          Foto: {{ $page.project.credits }}
        </div>
      </div>

      <ProjectGallery
        v-if="$page.project.gallery && $page.project.gallery.images.length"
        :images="$page.project.gallery.images"
      />

      <ul class="contactperson" v-if="$page.project.contactperson.length">
        <h2
          v-if="$page.project.contactperson.length > 1"
          class="section-heading"
        >
          Kontaktpersoner
        </h2>
        <h2 v-else class="section-heading">Kontaktperson</h2>
        <PersonItem
          v-for="(person, index) in $page.project.contactperson"
          :key="`person-${index}`"
          :person="person"
        />
      </ul>
    </div>
    <h2 class="section-heading" v-if="combinedRelatedProjects.length">
      Relaterte prosjekter
    </h2>
    <RelatedProjects :projects="combinedRelatedProjects" />
  </Layout>
</template>

<script>
import BlockContent from "~/components/tools/BlockContent";
import SuperProjectImage from "~/components/tools/SuperProjectImage";
import PersonItem from "~/components/PersonItemSmall";
import RelatedProjects from "~/components/RelatedProjects";
import ProjectGallery from "@/components/ProjectGallery";

export default {
  components: {
    BlockContent,
    SuperProjectImage,
    RelatedProjects,
    PersonItem,
    ProjectGallery,
  },
  computed: {
    otherRelatedProjects() {
      const mappedNodes = this.$page.projects.edges.map(
        (project) => project.node
      );
      const otherRelated = mappedNodes.filter((item) => {
        return item.relatedProjects.some(
          (project) => project.id === this.$page.project.id
        );
      });
      return otherRelated
        .slice()
        .sort((a, b) => b.projectInfo.startYear - a.projectInfo.startYear)
        .sort((a, b) => b.rating - a.rating);
    },
    relatedProjectsByCategory() {
      const mappedNodes = this.$page.projects.edges
        .map((project) => project.node)
        .filter((project) => project.id != this.$page.project.id);
      const relatedByCategory = mappedNodes.filter((item) => {
        return item.projectInfo.category
          .map((x) => x.id)
          .some((category) => {
            return this.$page.project.projectInfo.category
              .map((x) => x.id)
              .includes(category);
          });
      });
      return relatedByCategory
        .slice()
        .sort((a, b) => b.projectInfo.startYear - a.projectInfo.startYear)
        .sort((a, b) => b.rating - a.rating);
    },
    combinedRelatedProjects() {
      const related = this.$page.project.relatedProjects;
      let allRelated = related.concat(
        this.otherRelatedProjects,
        this.relatedProjectsByCategory
      );
      allRelated = [
        ...new Set([
          ...this.otherRelatedProjects,
          ...this.relatedProjectsByCategory,
        ]),
      ];
      return allRelated.slice(0, 4);
    },
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
    id
    title
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
    fullwidth
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
        id
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
            metadata {
              lqip
              dimensions {
                aspectRatio
              }
            }
          }
          alt
          caption
          columns
          nocrop
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
  projects: allSanityProject(sortBy: "title") {
    edges {
      node {
        id
        title
        slug {
          current
        }
        rating
        intro
        projectInfo {
          location {
            title
          }
          startYear
          endYear
          size
          category {
            id
            title
          }
        }
        mainImage {
          asset {
            url
            metadata {
              lqip
            }
          }
          alt
        }
        relatedProjects {
          id
          title
        }
      }
    }
  },
}
</page-query>

<style lang="scss" scoped>
.project {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--spacing-m);
  color: var(--color-text);
  &-heading {
    margin-bottom: var(--spacing-m);
  }
  &-title {
    grid-column: 1 / -1;
    font-size: var(--font-size-m);
    font-style: italic;
    margin-bottom: 0.6rem;
  }
  &-intro {
    grid-column: 1 / -1;
    font-family: var(--font-serif);
    font-size: var(--font-size-xxl);
    max-width: 20em;
    margin: 0;
    line-height: 1.2;
  }
  &-image {
    grid-column: 4 / span 9;
  }
  &-info {
    grid-column: 1 / span 3;
    grid-row: span 2;
    list-style: none;
    margin: 0 0 var(--spacing-m);
    padding: 0 var(--spacing-m) 0 0;
    font-size: var(--font-size-s);

    strong {
      margin: 0;
    }

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
    grid-column: 4 / span 9;
    margin: var(--spacing-s) 0 var(--spacing-l);
  }
  &.fullwidth {
    > * {
      order: 4;
    }
    .project-heading {
      order: 1;
    }
    .project-image {
      grid-column: 1 / -1;
      margin: 0 calc(var(--spacing-sitepadding) * -1);
      order: 2;
      max-height: 120vh;
    }
    .project-info {
      order: 3;
      margin: var(--spacing-s) 0 var(--spacing-l);
      grid-row: span 1;
    }
    .project-content {
      margin: var(--spacing-s) 0 var(--spacing-l);
    }
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
  margin: 0 0 var(--spacing-l);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-m);

  .section-heading {
    margin-bottom: 0;
  }
}
@media (max-width: 1000px) {
  .project {
    > * {
      order: 4;
    }
    &-heading {
      order: 1;
    }
    &-image {
      grid-column: 1 / -1;
      margin: 0 calc(var(--spacing-sitepadding) * -1);
      order: 2;

      img {
        max-height: 120vh;
        min-width: none;
        width: 100%;
      }
    }
    &-info {
      order: 3;
      margin: var(--spacing-s) 0 var(--spacing-m);
      grid-column: 1 / -1;
      grid-row: span 2;
      display: grid;
      grid-template-columns: 1fr 1fr;
      column-gap: var(--spacing-m);
    }
    &-content {
      margin: var(--spacing-s) 0 var(--spacing-l);
      grid-column: 1 / -1;
    }
  }
  .contactperson {
    grid-template-columns: 1fr;

    li {
      margin-bottom: var(--spacing-m);
    }
  }
}
</style>
