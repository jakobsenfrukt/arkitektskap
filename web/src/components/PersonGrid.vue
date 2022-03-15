<template>
  <div class="people">
    <ul class="person-list">
      <PersonItem
        v-for="(person, index) in people.edges"
        :key="index"
        :person="person.node"
      />
    </ul>
  </div>
</template>

<script>
import PersonItem from "@/components/PersonItem";

export default {
  components: {
    PersonItem,
  },
  props: {
    people: Object,
  },
};
</script>

<style lang="scss" scoped>
.person-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-sitepadding);
}
@media (min-width: 800px) {
  .person-list {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
