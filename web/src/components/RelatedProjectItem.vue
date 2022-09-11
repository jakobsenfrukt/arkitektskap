<template>
  <li class="project" :class="`size-${project.rating}`">
    <SuperImage
      v-if="project.mainImage"
      class="project-image"
      :image="project.mainImage"
      :alt="
        project.mainImage.alt ? project.mainImage.alt : 'Bilde fra prosjekt'
      "
      :width="400"
      :lqip="project.mainImage.asset.metadata.lqip"
      :aspectRatio="1"
    />
    <div class="project-text">
      <h2 class="project-title">{{ project.title }}</h2>
      <div class="project-intro">
        {{ project.intro }}
      </div>
    </div>
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
import BlockContent from "@/components/tools/BlockContent";

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
  grid-column: span 3;
  position: relative;
  &-text {
    transition: color 0.6s ease;
  }
  &-image {
    margin-bottom: var(--spacing-m);
    position: relative;
    width: 100%;
    padding-top: 100%;
    overflow: hidden;

    img {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 1s ease;
    }
  }
  &-title {
    font-size: var(--font-size-s);
    font-family: var(--font-mono);
    font-weight: 500;
    margin-bottom: 0.6rem;
  }
  &-intro {
    font-size: var(--font-size-m);
    font-family: var(--font-serif);
    line-height: 1.2;
    overflow-wrap: break-word;
    hyphens: auto;
  }
  &-meta {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    font-family: var(--font-mono);
    font-size: var(--font-size-s);
    font-weight: 500;
    list-style: none;
    margin: 0 0 1rem;
    padding: 0;
    align-self: flex-end;
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
