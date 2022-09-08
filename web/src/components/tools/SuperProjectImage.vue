<template>
  <figure
    :class="cssClasses"
    :style="{
      'background-image': `url(${lqip})`,
      'padding-top': paddingTop,
      '--padding-top-percent': paddingTopPercent,
      'max-height': `${maxHeight}px`,
    }"
  >
    <img
      v-if="height"
      :src="
        $urlForImage(image, $static.metadata.sanityOptions)
          .width(width)
          .height(height)
          .url()
      "
      :alt="alt"
      loading="lazy"
    />
    <img
      v-else
      :src="
        $urlForImage(image, $static.metadata.sanityOptions)
          .width(width)
          .url()
      "
      :alt="alt"
      loading="lazy"
    />
  </figure>
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
export default {
  props: {
    image: Object,
    alt: String,
    width: Number,
    height: Number,
    lqip: String,
    aspectRatio: Number,
  },
  data() {
    return {
      maxHeight: 800,
    };
  },
  computed: {
    paddingTop() {
      if (this.aspectRatio > 1) {
        return 100 / this.aspectRatio + "%";
      } else {
        return this.maxHeight + "px";
      }
    },
    paddingTopPercent() {
      return 100 / this.aspectRatio + "%";
    },
    cssClasses() {
      if (this.aspectRatio > 1) {
        return "landscape";
      } else {
        return "portrait";
      }
    },
  },
  mounted() {
    this.maxHeight = window.innerHeight * 0.9;
  },
};
</script>

<style lang="scss" scoped>
figure {
  position: relative;
  background-size: auto 100%;
  background-repeat: no-repeat;
  height: 0;

  img {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    object-fit: cover;
  }

  &.landscape {
    background-size: 100%;
    img {
      width: 100%;
    }
  }
}

@media (max-width: 1000px) {
  figure {
    &.portrait {
      background-size: 100%;
      padding-top: var(--padding-top-percent) !important;
      img {
        width: 100%;
      }
    }
  }
}
</style>
