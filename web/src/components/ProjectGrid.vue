<template>
  <div class="projects">
    <ul class="project-list">
      <ProjectItem
        v-for="(project, index) in projects.edges"
        :key="index"
        :project="project.node"
        priority="top"
      />
      <ProjectItem
        v-for="(project, index) in projects.edges"
        :key="index"
        :project="project.node"
        priority="top"
      />
      <ProjectItem
        v-for="(project, index) in projects.edges"
        :key="index"
        :project="project.node"
        priority="medium"
      />
      <ProjectItem
        v-for="(project, index) in projects.edges"
        :key="index"
        :project="project.node"
        priority="low"
      />
      <ProjectItem
        v-for="(project, index) in projects.edges"
        :key="index"
        :project="project.node"
        priority="low"
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
    projects: Object,
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
}
</style>
