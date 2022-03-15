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
  color: var(--color-black);
  width: 100%;

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
