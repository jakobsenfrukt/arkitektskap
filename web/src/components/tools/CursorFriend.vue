<template>
  <svg
    width="48"
    height="78"
    viewBox="0 0 48 78"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class="cursorfriend"
    :style="`--cursor-color: ${color}`"
  >
    <path
      d="M5.5 14.16L34.62 45.99H20.85L31.19 67.74L26.02 70.16L15.34 48.04L5.49 56.8V14.16H5.5ZM0 0V14.16V56.8V69.06L9.16 60.91L13.56 56.99L21.07 72.55L23.43 77.44L28.35 75.14L33.52 72.72L38.53 70.37L36.15 65.37L29.55 51.49H34.61H47.1L38.67 42.28L9.55 10.45L0 0Z"
      fill="black"
    />
  </svg>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: "black",
    },
  },
  data() {
    return {
      isInView: false,
    };
  },
  methods: {
    moveCursor(e) {
      const cursorFriend = document.querySelector(".cursorfriend");
      const mouseY = e.clientY;
      const mouseX = e.clientX;

      cursorFriend.style.display = `block`;
      cursorFriend.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    },
  },
  mounted() {
    window.addEventListener("mousemove", this.moveCursor);
  },
};
</script>

<style lang="scss" scoped>
.cursorfriend {
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
  fill: var(--cursor-color);

  display: none;
}
</style>
