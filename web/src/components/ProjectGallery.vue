<template>
  <div class="project-gallery">
    <SuperImage
      v-for="(image, index) in images"
      :key="index"
      :class="`column-${image.columns} ${image.nocrop ? 'nocrop' : ''}`"
      @click.native="openLightbox(index)"
      :image="image"
      :alt="image.alt ? image.alt : 'Bilde fra prosjekt'"
      :width="1200"
      :lqip="image.asset.metadata.lqip"
      :aspectRatio="image.asset.metadata.dimensions.aspectRatio"
    />

    <div class="lightbox" v-if="lightboxOpen">
      <!--<SuperImage
        class="lightbox-image"
        :image="images[currentImage]"
        :alt="
          images[currentImage].alt
            ? images[currentImage].alt
            : 'Bilde fra prosjekt'
        "
        :width="1200"
        :lqip="images[currentImage].asset.metadata.lqip"
        :aspectRatio="
          images[currentImage].asset.metadata.dimensions.aspectRatio
        "
      />-->
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
      >
        <Dingbats icon="arrow-right" />
      </div>
      <div
        class="lightbox-nav prev"
        v-if="currentImage > 0"
        @click="lightboxNav('prev')"
      >
        <Dingbats icon="arrow-left" />
      </div>
      <div class="lightbox-close" @click="lightboxOpen = false">
        <strong>Lukk bildegalleri</strong> &nbsp; <Dingbats icon="close" />
      </div>
      <div class="lightbox-number">
        <strong>{{ currentImage + 1 }}/{{ images.length }}</strong>
      </div>
    </div>
  </div>
</template>

<script>
import Dingbats from "@/components/tools/Dingbats";

export default {
  components: {
    Dingbats,
  },
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
  margin: 0 0 var(--spacing-l);

  figure {
    margin: 0;
    cursor: var(--cursor-zoom);
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
.lightbox {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 1002;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 calc(var(--spacing-sitepadding) * 0.5) 0;
  color: var(--color-white);

  figure {
    padding: 3.8rem 0;
    cursor: var(--cursor-default);

    img {
      display: block;
      max-width: 100%;
      max-height: 100%;
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
  &-close {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 1002;
    background: #000;
    text-align: right;
    padding: var(--spacing-s) var(--spacing-sitepadding);
    &:hover {
      cursor: var(--cursor-pointer);
    }
  }
  &-number {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    padding: var(--spacing-s) var(--spacing-sitepadding);
  }
}

@media (max-width: 1200px) {
  .project-gallery {
    .lightbox {
      &-nav {
        position: absolute;
        top: 3rem;
        right: 0;
        left: 0;
        bottom: 0;
        padding: 1rem;
        display: flex;
        align-items: flex-end;

        .dingbat {
          margin: 0;
        }

        &.prev {
          right: 50%;
          cursor: var(--cursor-arrow-left);
        }
        &.next {
          left: 50%;
          cursor: var(--cursor-arrow-right);
          justify-content: flex-end;
        }
      }
      &-close {
        padding-right: 0;
      }
      &-number {
        padding-bottom: 1rem;
      }
    }
  }
}
</style>
