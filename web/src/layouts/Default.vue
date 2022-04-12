<template>
  <div class="layout">
    <Header />
    <transition name="fade" appear>
      <main class="site-main">
        <slot />
      </main>
    </transition>
    <Footer />
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

export default {
  components: {
    Header,
    Footer,
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
}

.fade-enter-active {
  transition: opacity 0.8s;
}

.fade-enter {
  opacity: 0;
}
</style>
