<template>
  <button
    role="button"
    aria-label="Toggle dark/light"
    @click.prevent="toggleTheme"
    class="toggle-theme"
  >
    <template v-if="darkTheme">
      <Dingbats icon="moon" />
    </template>
    <template v-else>
      <Dingbats icon="sun" />
    </template>
  </button>
</template>

<script>
import Dingbats from "@/components/tools/Dingbats.vue";

export default {
  components: {
    Dingbats,
  },
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
  font-size: inherit;

  &:hover {
    opacity: 0.8;
  }
  &:focus {
    outline: none;
  }

  .dingbat {
    margin: 0;
  }
}
</style>
