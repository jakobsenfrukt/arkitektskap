<template>
  <li class="project" :class="priority">
    <img
      v-if="project.mainImage"
      :src="
        $urlForImage(project.mainImage, $static.metadata.sanityOptions)
          .width(1200)
          .height(800)
          .auto('format')
          .url()
      "
      :alt="project.mainImage.alt"
      class="project-image"
    />
    <ul class="palette">
      <li
        v-for="(color, index) in project.mainImage.asset.metadata.palette"
        :key="`color-${index}`"
      >
        <div
          class="palette-color"
          :style="
            `--palette-background: ${color.background}; --palette-foreground: ${
              color.foreground
            }`
          "
        >
          {{ color.background }}
        </div>
      </li>
    </ul>
    <h2 class="project-title">{{ project.title }}</h2>
    <p class="project-intro">{{ project.intro }}</p>
    <!--<ul class="project-meta">
      <li>Årstall</li>
      <li>Prosjekttype</li>
      <li>Status</li>
      <li>Sted</li>
      <li>Størrelse</li>
      <li>Verdi</li>
    </ul>-->
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
    priority: String,
  },
};
</script>

<style lang="scss" scoped>
.palette {
  position: absolute;
  top: 10px;
  left: 10px;
  list-style: none;
  margin: 0;
  padding: 0;
  font-size: 13px;
  grid-column: span 6;
  li {
    display: inline-block;
  }
  &-color {
    padding: 1em;
    margin: 0 0.2rem 0.2rem 0;
    background: var(--palette-background);
    color: var(--palette-foreground);
  }
}
.project {
  grid-column: span 6;
  position: relative;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: var(--spacing-sitepadding);
  &-image {
    grid-column: 1 / -1;
  }
  &-title {
    grid-column: 1 / -1;
    font-size: var(--font-size-s);
    font-family: var(--font-mono);
    font-weight: 500;
  }
  &-intro {
    grid-column: 1 / -1;
    font-size: var(--font-size-l);
    font-family: var(--font-serif);
  }
  &-meta {
    grid-column: span 3;
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

  /*&.top {
    .project-image {
      grid-column: span 3;
    }
    .project-title {
      grid-column: span 2;
    }
  }

  &.medium {
    .project-image {
      grid-column: span 2;
    }
    .project-title {
      grid-column: span 3;
    }
  }*/

  &.low {
    .project-image {
      grid-column: span 1;
    }
    .project-title {
      grid-column: span 4;
    }
  }
}
</style>
