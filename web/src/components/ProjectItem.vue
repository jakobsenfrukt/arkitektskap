<template>
  <li class="project">
    <img
      v-if="project.mainImage"
      :src="
        $urlForImage(project.mainImage, $static.metadata.sanityOptions)
          .width(1200)
          .auto('format')
          .url()
      "
      :alt="project.mainImage.alt"
      class="project-image"
    />
    <h2 class="project-title">{{ project.title }}</h2>
    <p class="project-meta">Prosjekttype &amp; detaljer</p>
    <!--<BlockContent :blocks="project._rawBio" v-if="project._rawBio" />-->
    <g-link class="project-link" :to="`/prosjekter/${project.slug.current}`"
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
import BlockContent from "@/components/BlockContent";

export default {
  components: {
    BlockContent,
  },
  props: {
    project: Object,
  },
};
</script>

<style lang="scss" scoped>
.project {
  position: relative;
  &-title {
    font-size: 2rem;
  }
  &-meta {
    font-family: var(--font-mono);
    font-weight: 500;
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
</style>
