<template>
  <li class="person">
    <img
      v-if="person.image"
      :src="
        $urlForImage(person.image, $static.metadata.sanityOptions)
          .width(1200)
          .auto('format')
          .url()
      "
      :alt="person.image.alt"
      class="person-image"
    />
    <h2>{{ person.name }}</h2>
    <p>{{ person.title }}</p>
    <!--<BlockContent :blocks="person._rawBio" v-if="person._rawBio" />-->
    <g-link class="person-link" :to="`/folk/${person.slug.current}`"
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
    person: Object,
  },
};
</script>

<style lang="scss" scoped>
.person {
  position: relative;
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
