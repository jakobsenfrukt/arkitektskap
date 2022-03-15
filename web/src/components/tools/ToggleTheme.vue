<template>
  <button
    role="button"
    aria-label="Toggle dark/light"
    @click.prevent="toggleTheme"
    class="toggle-theme"
  >
    <span v-if="darkTheme">🌞</span>
    <span v-else>🌛</span>
  </button>
</template>

<script>
export default {
  data() {
    return {
      darkTheme: false,
    };
  },
  methods: {
    toggleTheme() {
      this.darkTheme = !this.darkTheme;

      // This is using a script that is added in index.html
      window.__setPreferredTheme(this.darkTheme ? "dark" : "light");
    },
  },
  mounted() {
    if (window.__theme == "dark") this.darkTheme = true;
  },
};
</script>

<style lang="scss">
.toggle-theme {
  display: inline-block;
  background-color: transparent;
  border: 0;
  padding: 0;
  cursor: pointer;
  color: currentColor;

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }

  &:hover {
    opacity: 0.8;
  }
  &:focus {
    outline: none;
  }
}
</style>
