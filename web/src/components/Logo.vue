<template>
  <div class="logo">
    <h1>Arkitektskap</h1>
  </div>
</template>

<script>
export default {
  props: {
    noise: Boolean,
  },
};
</script>

<style lang="scss" scoped>
.logo {
  color: currentColor;
  width: 100%;

  font-family: var(--font-mono);
  font-weight: 500;
  text-transform: lowercase;

  img {
    display: block;
    height: 100%;
    width: 90%;
    margin: 0 auto;
    object-fit: contain;
  }

  svg {
    display: block;
    width: 100%;
    height: 100%;
  }
}
</style>
