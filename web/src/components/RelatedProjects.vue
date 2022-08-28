<template>
  <div class="projects">
    <ul class="project-list">
      <ProjectItem
        v-for="(project, index) in projects.slice(0, currentLimit)"
        :key="index"
        :project="project"
      />
    </ul>
    <!--<button
      class="button"
      @click="showMore()"
      v-if="projects.length > currentLimit"
    >
      <span v-if="currentLimit > limit"
        >Se enda flere av {{ person }} sine prosjekter</span
      >
      <span v-else>Se flere av {{ person }} sine prosjekter</span>
      <Dingbats icon="arrow-down" />
    </button>-->
  </div>
</template>

<script>
import ProjectItem from "@/components/RelatedProjectItem";
import Dingbats from "@/components/tools/Dingbats";

export default {
  components: {
    ProjectItem,
    Dingbats,
  },
  data() {
    return {
      currentLimit: this.limit,
    };
  },
  props: {
    projects: Array,
    limit: Number,
    person: String,
  },
  methods: {
    showMore() {
      this.currentLimit += this.limit;
    },
  },
};
</script>

<style lang="scss" scoped>
.projects {
  grid-column: 1 / span 12;
}
.project-list {
  list-style: none;
  margin: 0 0 var(--spacing-l);
  padding: 0;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--spacing-m);
  align-items: flex-start;
}
@media (max-width: 1200px) {
  .project-list {
    grid-template-columns: repeat(6, 1fr);
  }
}
</style>
