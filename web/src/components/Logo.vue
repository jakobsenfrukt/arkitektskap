<template>
  <h1 class="logo">
    <span
      v-for="(block, index) in getLogoBlocks('arkitektskap')"
      :key="`logospan-${index}`"
      class="logo-block"
      :style="`animation-delay: ${10 / index}s`"
      >{{ block }}</span
    >
  </h1>
</template>

<script>
import IntersectionObserver from "~/components/tools/IntersectionObserver";

export default {
  components: {
    IntersectionObserver,
  },
  data() {
    return {
      isInView: false,
    };
  },
  methods: {
    onEnterViewport(value) {
      this.isInView = value;
    },
    getLogoBlocks(string) {
      let arr = string.split("");
      return arr;
    },
  },
};
</script>

<style lang="scss" scoped>
.logo {
  display: inline-block;
  color: currentColor;
  width: 100%;
  font-family: var(--font-mono);
  font-size: 1rem;
  font-weight: 500;
  text-transform: lowercase;
}
</style>
