<template>
  <div class="totop">
    <button @click="toTop()" class="totop-button" :class="{inview: isInView}">
      <svg class="totop-icon" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M482.441 232.441L434.065 280.817L284.207 130.961L284.207 500L215.793 500L215.793 130.959L65.9348 280.817L17.5587 232.441L201.624 48.3765L201.624 48.376L250 -0.000101713L482.441 232.441Z" fill="black"/>
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
import IntersectionObserver from '@/components/tools/IntersectionObserver.vue'

export default {
  components: {
    IntersectionObserver
  },
  data() {
    return {
      isInView: false
    }
  },
  methods: {
    toTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    },
    onEnterViewport(value) {
      this.isInView = value;
      if (value === false) {
        return
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.totop {
  width: 100%;
  padding: .5rem .5rem 0;
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
    transition: opacity .3s linear;

    &.inview {
      opacity: 1;
    }
  }

  &-icon {
    display: inline-block;
    width: 1rem;
    height: 1rem;
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