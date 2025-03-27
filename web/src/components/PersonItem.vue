<template>
  <li class="person">
    <SuperImage
      v-if="person.image"
      class="person-image"
      :image="person.image"
      :alt="person.image.alt ? person.image.alt : 'Portrett av ansatt'"
      :width="400"
      :height="400"
      :lqip="person.image.asset.metadata.lqip"
      :aspectRatio="0.8"
    />
    <div class="person-text">
      <div>
        <h2 class="person-name">{{ person.name }}</h2>
        <p class="person-title">{{ person.title }}</p>
      </div>

      <p class="person-contact">
        <a :href="`tel:${person.phone}`">{{ person.phone }}</a>
        <a :href="`mailto:${person.email}`" target="_blank">{{ person.email }}</a>
      </p>
    </div>
    <g-link class="person-link" :to="`/folk/${person.slug.current}`"
      >Link</g-link
    >
  </li>
</template>

<static-query>
query {
  metadata {
    sanityOptions {
      projectId
      dataset
    }
  }
}
</static-query>

<script>
import BlockContent from "@/components/tools/BlockContent";

export default {
  components: {
    BlockContent,
  },
  props: {
    person: Object,
  },
};
</script>

<style lang="scss" scoped>
.person {
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-m);
  &-image {
    grid-column: 1 / span 1;
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 120%;
    img {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      object-fit: cover;
    }
  }
  &-text {
    grid-column: 2 / span 2;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0.3rem 0;
  }
  &-title {
    font-style: italic;
  }
  &-contact {
    font-family: var(--font-mono);
    margin-bottom: 0;
    position: relative;
    z-index: 100;
    a {
      display: block;
      text-decoration: none;
      margin-top: 0.3rem;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  &-link {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
    overflow: hidden;
    text-indent: -9999px;
    z-index: 0;
  }
}
@media (max-width: 1000px) {
  .person {
    grid-template-columns: repeat(4, 1fr);
  }
}
@media (max-width: 600px) {
  .person {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
