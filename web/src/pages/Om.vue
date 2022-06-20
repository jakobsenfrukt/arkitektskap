<template>
  <Layout>
    <p class="intro about-intro">{{ $page.about.intro }}</p>
  </Layout>
</template>

<page-query>
query {
  about: sanityAbout(id: "about") {
    intro
  }
}
</page-query>

<script>
export default {
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
</style>
