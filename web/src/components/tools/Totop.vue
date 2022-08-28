<template>
  <div class="totop">
    <button @click="toTop()" class="totop-button" :class="{ inview: isInView }">
      <strong>Til toppen</strong> <Dingbats icon="arrow-up" class="icon" />
    </button>
    <IntersectionObserver
      id="totop"
      class="observer"
      @on-enter-viewport="onEnterViewport"
    ></IntersectionObserver>
  </div>
</template>

<script>
import IntersectionObserver from "@/components/tools/IntersectionObserver.vue";
import Dingbats from "@/components/tools/Dingbats.vue";

export default {
  components: {
    IntersectionObserver,
    Dingbats,
  },
  data() {
    return {
      isInView: false,
    };
  },
  methods: {
    toTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
    onEnterViewport(value) {
      this.isInView = value;
      if (value === false) {
        return;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.totop {
  width: 100%;
  padding: 0.5rem 0.5rem 0;
  text-align: right;

  &-button {
    font-size: var(--font-l);
    font-family: inherit;
    border: none;
    outline: none;
    margin: 0;
    padding: 0;
    background: transparent;
    cursor: var(--cursor-pointer);
    position: fixed;
    bottom: 1rem;
    right: var(--spacing-sitepadding);
    color: var(--color-text);

    opacity: 0;
    transition: opacity 0.3s linear;

    &.inview {
      opacity: 1;
    }
  }

  .icon {
    margin: 0;
  }
  strong {
    margin-right: 1em;
    vertical-align: middle;
  }
}
.observer {
  position: absolute;
  bottom: 0;
  right: 0;
  height: 2rem;
}
</style>
