<template>
  <div class="filter">
    <div class="filter-wrapper" :class="{ inview: isInView }">
      <ul class="filter-menu">
        <li>Filter <Dingbats icon="filter" /></li>
        <li>Sortering <Dingbats icon="sort" /></li>
        <li>Nullstill <Dingbats icon="close-small" /></li>
      </ul>
    </div>

    <IntersectionObserver
      id="observer"
      class="observer"
      @on-enter-viewport="onEnterViewport"
    ></IntersectionObserver>
  </div>
</template>

<script>
import IntersectionObserver from "~/components/tools/IntersectionObserver";
import Dingbats from "~/components/tools/Dingbats";

export default {
  components: {
    IntersectionObserver,
    Dingbats,
  },
  data() {
    return {
      menuOpen: false,
      isInView: false,
    };
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    onEnterViewport(value) {
      this.isInView = value;
    },
  },
};
</script>

<style lang="scss" scoped>
.filter-wrapper {
  width: 100%;
  padding: var(--spacing-xs) var(--spacing-sitepadding);
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1001;
  background: var(--color-text);
  color: var(--color-background);
  font-family: var(--font-mono);
  font-size: var(--font-size-s);

  transform: translateY(100%);
  animation: slideDown 0.3s linear forwards;

  &.inview {
    animation: slideUp 0.3s linear forwards;
  }
}
.filter-menu {
  width: 100%;
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
  text-transform: lowercase;
}
button,
.heading {
  width: 100%;
  font-family: inherit;
  font-size: inherit;
  text-transform: inherit;
  text-align: inherit;
  color: inherit;
  background: var(--color-background);
  border: 1px solid var(--color-text);
}
.observer {
  position: absolute;
  top: 110vh;
  height: calc(100% - 280vh);
  left: 50%;
}

@keyframes slideUp {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}
@keyframes slideDown {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(100%);
  }
}
</style>
