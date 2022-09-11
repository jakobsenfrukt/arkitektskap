<template>
  <div class="project-gallery">
    <SuperImage
      v-for="(image, index) in images"
      :key="`simplegalleryimage-${index}`"
      :class="`column-${image.columns} ${image.nocrop ? 'nocrop' : ''}`"
      :image="image"
      :alt="image.alt ? image.alt : 'Bilde fra prosjekt'"
      :width="1200"
      :lqip="image.asset.metadata.lqip"
      :aspectRatio="image.asset.metadata.dimensions.aspectRatio"
    />
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
  gap: var(--spacing-s);
  justify-items: center;
  margin: 0 0 var(--spacing-l);

  figure {
    margin: 0;
    width: 100%;
    height: 100%;

    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    &.nocrop {
      height: auto;

      img {
        height: auto;
      }
    }

    &.column {
      &-full,
      &-null {
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
