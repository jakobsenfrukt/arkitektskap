<template>
  <div class="totop">
    <button @click="toTop()" class="totop-button" :class="{ inview: isInView }">
      <svg
        class="totop-icon"
        viewBox="0 0 82 77"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M48.91 76.64H32.41V31.58L11.67 52.32L0 40.65L40.66 0L81.32 40.66L69.65 52.32L48.91 31.58V76.64ZM37.91 71.14H43.41V18.3L69.65 44.54L73.54 40.65L40.66 7.77L7.78 40.65L11.67 44.54L37.91 18.3V71.14Z"
          fill="currentColor"
        />
      </svg>
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
    cursor: pointer;
    position: fixed;
    bottom: 1rem;
    right: 1rem;

    opacity: 0;
    transition: opacity 0.3s linear;

    &.inview {
      opacity: 1;
    }
  }

  &-icon {
    display: inline-block;
    width: 1.6rem;
    height: 1.6rem;
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
