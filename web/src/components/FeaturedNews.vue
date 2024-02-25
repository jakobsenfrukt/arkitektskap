<template>
  <article class="news">
    <SuperImage
      v-if="content.image"
      class="image"
      :image="content.image"
      :alt="content.image.alt ? content.image.alt : 'Nyhetsbilde'"
      :width="800"
      :lqip="content.image.asset.metadata.lqip"
      :aspectRatio="content.image.asset.metadata.dimensions.aspectRatio"
    />
    <p class="text">{{ content.text }}</p>
    <Dingbats icon="arrow-right" />
    <g-link class="link" to="/om/interior">Link</g-link>
  </article>
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
import SuperImage from "@/components/tools/SuperImage.vue";
import Dingbats from "@/components/tools/Dingbats.vue";
export default {
  components: {
    SuperImage,
    Dingbats,
  },
  props: {
    content: Object,
  },
};
</script>

<style lang="scss" scoped>
.news {
  grid-column: 1 / span 8;
  display: grid;
  grid-template-columns: 6rem 1fr 4rem;
  align-items: center;
  gap: var(--spacing-m);
  margin: 0 0 var(--spacing-m);
  position: relative;

  &:before {
    content: "";
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: currentColor;
    z-index: 0;
    opacity: 0.1;
  }
}
.image,
.text {
  position: relative;
  z-index: 1;
}
.image {
  width: 100%;
  padding-top: 100% !important;
}
.text {
  font-family: var(--font-mono);
  font-weight: 500;
  white-space: pre-wrap;
  text-align: left;
  margin-bottom: 0;
}
.link {
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

@media (max-width: 900px) {
  .news {
    grid-column: 1 / -1;
  }
}
</style>
