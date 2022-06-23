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
  </Layout>
</template>

<script>
import BlockContent from "~/components/tools/BlockContent";

export default {
  components: {
    BlockContent,
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
    slug {
      current
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
  gap: var(--spacing-sitepadding);
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
