<template>
  <Layout>
    <div class="project">
      <img
        v-if="$page.project.mainImage"
        :src="
          $urlForImage($page.project.mainImage, $page.metadata.sanityOptions)
            .width(1200)
            .auto('format')
            .url()
        "
        :alt="$page.project.mainImage.alt"
        class="project-image"
      />
      <div class="project-heading">
        <h1 class="project-name">{{ $page.project.title }}</h1>
      </div>
      <div>
        <BlockContent :blocks="$page.project.body" v-if="$page.project.body" />
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
.project {
}
</style>
