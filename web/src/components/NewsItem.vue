<template>
  <li class="article">
    <SuperImage
      v-if="article.mainImage"
      class="article-image"
      :image="article.mainImage"
      :alt="article.mainImage.alt ? article.mainImage.alt : 'Nyhetsbilde'"
      :width="600"
      :height="400"
      :lqip="article.mainImage.asset.metadata.lqip"
      :aspectRatio="1.5"
    />
    <div class="article-text">
      <span class="date">
        {{ 
          new Date(article.publishDate).toLocaleDateString("no-NB", {
            month: "long",
            year: "numeric",
          })
        }}</span>
      <h2 class="title">{{ article.title }}</h2>
    </div>
    <g-link class="article-link" :to="`/folk/${article.slug.current}`"
      >Link</g-link
    >
  </li>
</template>

<static-query>
query {
  metadata {
    sanityOptions {
      projectId
      dataset
    }
  }
}
</static-query>

<script>
import BlockContent from "@/components/tools/BlockContent";

export default {
  components: {
    BlockContent,
  },
  props: {
    article: Object,
  },
};
</script>

<style lang="scss" scoped>
.article {
  position: relative;
  &-image {
    width: 100%;
    height: 0;
    padding-top: 100%;
    img {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      object-fit: cover;
    }
  }
  &-link {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
    overflow: hidden;
    text-indent: -9999px;
    z-index: 0;
  }
}

.title {
  font-size: var(--font-size-m);
}

.date {
  grid-column: 1 / -1;
  font-family: var(--font-mono);
  text-transform: lowercase;
  color: var(--color-text);
  margin: .4rem 0 var(--spacing-s);
  display: block;
}
</style>
