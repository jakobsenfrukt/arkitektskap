<template>
  <div class="projects">
    <ul class="project-list">
      <ProjectItem
        v-for="(project, index) in projects"
        :key="`project-${index}`"
        :project="project.node"
        :usePalette="usePalette(index)"
      />
    </ul>
  </div>
</template>

<script>
import ProjectItem from "@/components/ProjectItem";

export default {
  components: {
    ProjectItem,
  },
  props: {
    projects: Array,
  },
  methods: {
    usePalette(index) {
      if (index % 5 === 0) {
        return true;
      }
      return false;
    },
  },
};
</script>

<style lang="scss" scoped>
.projects {
  grid-column: 1 / span 12;
  color: var(--color-text);
}
.project-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  column-gap: var(--spacing-m);
  row-gap: var(--spacing-l);
  align-items: center;
}

@media (min-width: 1600px) {
  .project-list {
    column-gap: calc(var(--spacing-m) * 2);
  }
}
</style>
