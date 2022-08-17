<template>
  <div class="projects">
    <ul class="project-list">
      <ProjectItem
        v-for="(project, index) in projects"
        :key="index"
        :project="project.node"
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
};
</script>

<style lang="scss" scoped>
.projects {
  grid-column: 1 / span 12;
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
</style>
