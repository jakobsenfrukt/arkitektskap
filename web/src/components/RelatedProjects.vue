<template>
  <div class="projects">
    <ul class="project-list">
      <ProjectItem
        v-for="(project, index) in projects"
        :key="index"
        :project="project"
      />
    </ul>
  </div>
</template>

<script>
import ProjectItem from "@/components/RelatedProjectItem";

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
  gap: var(--spacing-sitepadding);
  align-items: flex-start;
}
</style>
