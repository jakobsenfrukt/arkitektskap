<template>
  <Layout>
    <div class="person">
      <img
        v-if="$page.person.image"
        :src="
          $urlForImage($page.person.image, $page.metadata.sanityOptions)
            .width(1200)
            .auto('format')
            .url()
        "
        :alt="$page.person.image.alt"
        class="person-image"
      />
      <div class="person-heading">
        <h1 class="person-name">{{ $page.person.name }}</h1>
        <p>{{ $page.person.title }}</p>
      </div>
      <div>
        <BlockContent
          :blocks="$page.person._rawBio"
          v-if="$page.person._rawBio"
        />
      </div>
    </div>
  </Layout>
</template>

<script>
import BlockContent from "~/components/BlockContent";

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
    image {
      asset {
        _id
        url
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
  &-image {
    max-width: 400px;
  }
}
</style>
