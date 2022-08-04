<template>
  <div class="project-gallery">
    <figure
      v-for="(image, index) in images"
      :key="index"
      :class="`column-${image.columns}`"
    >
      <img
        :src="
          $urlForImage(image, $page.metadata.sanityOptions)
            .width(1200)
            .auto('format')
            .url()
        "
        :alt="image.alt ? image.alt : ''"
      />
      <caption v-if="image.caption">
        {{
          image.caption
        }}
      </caption>
    </figure>
  </div>
</template>

<script>
export default {
  props: {
    images: Array,
  },
};
</script>

<style lang="scss" scoped>
.project-gallery {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--spacing-sitepadding);
  justify-items: center;

  figure {
    margin: 0;

    &.column {
      &-full {
        grid-column: span 12;
      }
      &-half {
        grid-column: span 6;
      }
      &-third {
        grid-column: span 4;
      }
      &-twothird {
        grid-column: span 8;
      }
    }
  }
}
</style>
