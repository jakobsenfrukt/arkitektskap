<template>
  <figure
    :style="{
      'background-image': `url(${lqip})`,
      'padding-top': `calc(100% / ${aspectRatio})`,
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
};
</script>

<style lang="scss" scoped>
figure {
  position: relative;
  background-size: 100%;

  img {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
