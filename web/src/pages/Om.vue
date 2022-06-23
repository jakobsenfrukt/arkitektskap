<template>
  <Layout>
    <p class="intro about-intro" v-html="$replaceLogo($page.about.intro)"></p>
    <div class="about-content">
      <BlockContent
        :blocks="$page.about._rawBody"
        v-if="$page.about._rawBody"
        class="block-content"
      />
    </div>
  </Layout>
</template>

<page-query>
query {
  about: sanityAbout(id: "about") {
    intro
    _rawBody
  }
}
</page-query>

<script>
import BlockContent from "~/components/tools/BlockContent";

export default {
  components: {
    BlockContent,
  },
  metaInfo: {
    title: "Om",
    meta: [
      {
        name: "og:image",
        key: "og:image",
        content: "https://arkitektskap.no/images/og-img.jpg",
      },
    ],
  },
};
</script>

<style lang="scss" scoped>
.about-intro {
  grid-column: 1 / -1;
}
.about-content {
  grid-column: 1 / -1;
}
</style>
