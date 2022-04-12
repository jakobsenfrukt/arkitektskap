<template>
  <header class="site-header">
    <!--<g-link class="logo" to="/"><Logo /></g-link>-->
    <nav class="site-nav">
      <ul>
        <li><g-link class="nav-link" to="/om">Arkitektskap</g-link></li>
        <li><g-link class="nav-link" to="/folk">Folk</g-link></li>
        <li><g-link class="nav-link" to="/">Prosjekter</g-link></li>
        <li>
          <span class="nav-link" @click="toAnchor('#kontakt')">Kontakt</span>
        </li>
        <li class="theme"><ToggleTheme /></li>
      </ul>
    </nav>
  </header>
</template>

<script>
import Logo from "~/components/Logo.vue";
import ToggleTheme from "~/components/tools/ToggleTheme.vue";

export default {
  components: {
    Logo,
    ToggleTheme,
  },
  data() {
    return {
      menuOpen: false,
    };
  },
  methods: {
    toAnchor(anchor) {
      document.querySelector(anchor).scrollIntoView({
        behavior: "smooth",
      });
      // close menu if on mobile
      this.menuOpen = false;
    },
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
  },
};
</script>

<style lang="scss" scoped>
.site-header {
  padding: var(--spacing-sitepadding);
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.site-nav {
  width: 100%;
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: space-between;
    font-family: var(--font-mono);
    text-transform: lowercase;
    font-size: 1.4rem;
  }
}
.nav-link {
  color: var(--color-text);
  margin-right: 1rem;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
    text-underline-position: below;
    text-underline-offset: 0.04em;
    text-decoration-thickness: var(--border-width);
  }
}
.theme {
  position: absolute;
}
</style>
