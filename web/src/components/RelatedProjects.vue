<template>
  <div class="projects" :class="!limit ? 'limitless' : 'limited'">
    <ul class="project-list">
      <ProjectItem
        v-for="(project, index) in projects.slice(0, currentLimit)"
        :key="`relatedproject-${index}`"
        :project="project"
        class="project-item"
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
  color: var(--color-text);
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
@media (max-width: 1500px) {
  .project-list {
    grid-template-columns: repeat(9, 1fr);
  }
  .limited .project-item:last-child {
    display: none;
  }
}
@media (max-width: 1100px) {
  .project-list {
    grid-template-columns: repeat(6, 1fr);
  }
  .project-item:last-child {
    display: block;
  }
}
</style>
