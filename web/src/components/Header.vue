<template>
  <header class="site-header">
    <!--<g-link class="logo" to="/"><Logo /></g-link>-->
    <div class="site-header-wrapper" :class="{ inview: isInView }">
      <nav class="site-nav">
        <ul>
          <li>
            <g-link class="nav-link logo" to="/om"
              ><span
                v-for="(block, index) in getLogoBlocks('arkitektskap')"
                :key="index"
                class="logo-block"
                :style="`animation-delay: ${10 / index}s`"
                >{{ block }}</span
              ></g-link
            >
          </li>
          <li><g-link class="nav-link" to="/folk">Folk</g-link></li>
          <li><g-link class="nav-link" to="/">Prosjekter</g-link></li>
          <li>
            <span class="nav-link anchor" @click="toAnchor('#kontakt')"
              >Kontakt</span
            >
          </li>
          <li class="theme"><ToggleTheme /></li>
        </ul>
      </nav>
    </div>

    <IntersectionObserver
      id="observer"
      class="observer"
      @on-enter-viewport="onEnterViewport"
    ></IntersectionObserver>
  </header>
</template>

<script>
import Logo from "~/components/Logo.vue";
import ToggleTheme from "~/components/tools/ToggleTheme.vue";
import IntersectionObserver from "~/components/tools/IntersectionObserver";

export default {
  components: {
    Logo,
    ToggleTheme,
    IntersectionObserver,
  },
  data() {
    return {
      menuOpen: false,
      isInView: false,
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
    onEnterViewport(value) {
      this.isInView = value;
    },
    getLogoBlocks(string) {
      let arr = string.split("");
      return arr;
    },
  },
};
</script>

<style lang="scss" scoped>
.site-header-wrapper {
  padding: calc(var(--spacing-sitepadding) * 0.5) var(--spacing-sitepadding);
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1001;
  font-family: var(--font-mono);
  font-size: var(--font-size-s);

  &.inview {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: var(--color-background);
    animation: slideDown 0.3s linear forwards;

    .logo {
      &-block {
        //animation: fadeOut 0.3s linear forwards;
        &:first-of-type {
          animation: none;
        }
      }
    }
  }
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
    text-transform: lowercase;
  }
}
.nav-link {
  color: currentColor;
  margin-right: 1rem;
  &:hover {
    cursor: var(--cursor-pointer);
    text-decoration: none;
  }
  &.logo {
    font-family: var(--font-mono);
  }
}
.theme {
  width: 1.6em;
}
.observer {
  position: absolute;
  top: 110vh;
  height: 100%;
  left: 50%;
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

@keyframes slideDown {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
}
</style>
