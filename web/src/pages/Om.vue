<template>
  <Layout>
    <h1>Om oss</h1>
    <p>{{ $page.about.intro }}</p>
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

<style lang="scss" scoped></style>
