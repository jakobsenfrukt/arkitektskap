<template>
  <header class="site-header">
    <g-link class="logo" to="/"><Logo /></g-link>
    <nav class="site-nav">
      <ul>
        <li><g-link class="nav-link" to="/om">Om oss</g-link></li>
        <li><g-link class="nav-link" to="/prosjekter">Prosjekter</g-link></li>
        <li><g-link class="nav-link" to="/folk">Folka</g-link></li>
        <li>
          <span class="nav-link" @click="toAnchor('#kontakt')">Kontakt</span>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import Logo from "~/components/Logo.vue";

export default {
  components: {
    Logo,
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
  width: 50%;
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
.nav-link {
  margin-right: 1rem;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
    text-underline-position: below;
    text-underline-offset: 0.04em;
    text-decoration-thickness: var(--border-width);
  }
}
</style>
