<template>
  <div class="cursorfriend" :class="`project-${id}`">
    <div class="label">
      <span>{{ text }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: "Les mer",
    },
    id: {
      type: String,
      default: "cursorfriend",
    },
  },
  methods: {
    moveCursor(e) {
      const cursorFriend = document.querySelector(".project-" + this.id);
      const mouseY = e.clientY;
      const mouseX = e.clientX;

      cursorFriend.style.transform = `translate(${mouseX + 30}px, ${mouseY -
        30}px)`;
    },
  },
  mounted() {
    window.addEventListener("mousemove", this.moveCursor);
  },
  beforeDestroy() {
    window.removeEventListener("mousemove", this.moveCursor);
  },
};
</script>

<style lang="scss" scoped>
.cursorfriend {
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;

  overflow: hidden;

  .label {
    background: #000;
    color: #fff;
    padding: 0 0.25rem;
  }

  span {
    font-family: var(--font-mono);
    font-size: var(--font-size-xs);
  }
}
</style>
