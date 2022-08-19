<template>
  <div class="project-gallery">
    <figure
      v-for="(image, index) in images"
      :key="index"
      :class="`column-${image.columns}`"
      @click="openLightbox(index)"
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
    </figure>

    <!--<div class="lightbox" v-if="lightboxOpen">
      <figure class="lightbox-image">
        <img
          :src="
            $urlForImage(images[currentImage], $page.metadata.sanityOptions)
              .width(1200)
              .auto('format')
              .url()
          "
          :alt="images[currentImage].alt ? images[currentImage].alt : ''"
        />
      </figure>
      <div
        class="lightbox-nav next"
        v-if="currentImage < images.length - 1"
        @click="lightboxNav('next')"
      ></div>
      <div
        class="lightbox-nav prev"
        v-if="currentImage > 0"
        @click="lightboxNav('prev')"
      ></div>
    </div>-->
  </div>
</template>

<script>
export default {
  props: {
    images: Array,
  },
  data() {
    return {
      lightboxOpen: false,
      currentImage: undefined,
    };
  },
  methods: {
    openLightbox(index) {
      this.lightboxOpen = true;
      this.currentImage = index;
    },
    lightboxNav(direction) {
      if (direction === "next") {
        this.currentImage++;
      }
      if (direction === "prev") {
        this.currentImage--;
      }
    },
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
  margin: 0 calc(var(--spacing-sitepadding) * -0.5) var(--spacing-l);

  figure {
    margin: 0;
    cursor: var(--cursor-zoom);

    img {
      display: block;
    }

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
.lightbox {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 999;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-sitepadding) calc(var(--spacing-sitepadding) * 0.5) 0;

  figure {
    width: 100%;
    max-height: 90%;
    cursor: var(--cursor-default);

    img {
      display: block;
      width: 100%;
      height: 80vh;
      object-fit: contain;
    }
  }

  &-nav {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;

    &.prev {
      right: 50%;
      cursor: var(--cursor-arrow-left);
    }
    &.next {
      left: 50%;
      cursor: var(--cursor-arrow-right);
    }
  }
}
</style>
