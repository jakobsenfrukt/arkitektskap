<template>
  <ul class="person-list">
    <PersonItem
      v-for="(person, index) in people.edges"
      :key="`person-${index}`"
      :person="person.node"
    />
  </ul>
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
  grid-column: 1 / -1;
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-m);
  row-gap: var(--spacing-l);
}
@media (max-width: 1000px) {
  .person-list {
    grid-template-columns: 1fr;
  }
}
</style>
