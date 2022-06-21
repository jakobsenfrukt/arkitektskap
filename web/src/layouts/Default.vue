<template>
  <div class="layout">
    <Header />
    <transition name="fade" appear>
      <main class="site-main">
        <slot />
      </main>
    </transition>
    <Footer />
    <!--<CursorFriend />-->
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<script>
import Header from "~/components/Header.vue";
import Footer from "~/components/Footer.vue";
import CursorFriend from "~/components/tools/CursorFriend";

export default {
  components: {
    Header,
    Footer,
    CursorFriend,
  },
  props: {
    palette: Object,
    overlay: Boolean,
  },
  computed: {
    cssVars() {
      if (this.palette) {
        return {
          "--color-background-light": this.palette.lightMuted
            ? this.palette.lightMuted.background
            : "var(--color-white)",
          "--color-text-light": this.palette.darkMuted
            ? this.palette.darkMuted.background
            : "var(--color-white)",
          "--color-detail-light": this.palette.darkVibrant
            ? this.palette.darkVibrant.background
            : "var(--color-black)",

          "--color-background-dark": this.palette.darkMuted
            ? this.palette.darkMuted.background
            : "var(--color-white)",
          "--color-text-dark": this.palette.lightMuted
            ? this.palette.lightMuted.background
            : "var(--color-white)",
          "--color-detail-dark": this.palette.lightVibrant
            ? this.palette.lightVibrant.background
            : "var(--color-white)",
        };
      } else if (this.$static.settings.themePalette) {
        const palette = this.$static.settings.themePalette;
        return {
          "--color-background-light": palette.lightMuted
            ? palette.lightMuted.background
            : "var(--color-white)",
          "--color-text-light": palette.light.textColor
            ? palette.light.textColor.background
            : "var(--color-white)",
          "--color-detail-light": palette.light.detailColor
            ? palette.light.detailColor.background
            : "var(--color-black)",

          "--color-background-dark": palette.dark.bgColor
            ? palette.dark.bgColor.background
            : "var(--color-white)",
          "--color-text-dark": palette.dark.textColor
            ? palette.dark.textColor.background
            : "var(--color-white)",
          "--color-detail-dark": palette.dark.detailColor
            ? palette.dark.detailColor.background
            : "var(--color-white)",
        };
      }
    },
  },
  methods: {
    changeColor() {
      Object.entries(this.cssVars).forEach((entry) => {
        const [key, value] = entry;
        document.body.style.setProperty(key, value);
      });
    },
  },
  mounted() {
    this.changeColor();
  },
  updated() {
    this.changeColor();
  },
};
</script>

<style lang="scss" scoped>
.layout {
  padding: var(--spacing-m);
}

.site-main {
  min-height: 100vh;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--spacing-sitepadding);
  padding: var(--spacing-sitepadding);
}

.fade-enter-active {
  transition: opacity 1.2s;
}

.fade-enter {
  opacity: 0;
}
</style>
