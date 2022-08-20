<template>
  <Layout>
    <p class="intro" v-html="$replaceLogo($page.frontpage.intro)"></p>

    <div class="filter">
      <div class="filter-wrapper" :class="{ inview: isInView }">
        <ul class="filter-menu">
          <li>
            Filter <Dingbats icon="filter" />
            <ul>
              <li>
                Hva
                <select v-model="filter.category">
                  <option value="all">Vis alle</option>
                  <option
                    v-for="category in $page.categories.edges"
                    :key="category.node.title"
                    :value="category.node.title"
                    >{{ category.node.title }}</option
                  >
                </select>
              </li>
              <li>
                Hvor
                <select v-model="filter.location">
                  <option value="all">Vis alle</option>
                  <option
                    v-for="location in $page.locations.edges"
                    :key="location.node.title"
                    :value="location.node.title"
                    >{{ location.node.title }}</option
                  >
                </select>
              </li>
              <li>
                Når
                <label>Fra</label>
                <input
                  type="number"
                  placeholder="Årstall"
                  v-model="filter.minYear"
                />
                <label>Til</label>
                <input
                  type="number"
                  placeholder="Årstall"
                  v-model="filter.maxYear"
                />
              </li>
            </ul>
          </li>
          <li>
            Sortering <Dingbats icon="sort" />
            <select v-model="sorting">
              <option value="standard">Standard</option>
              <option value="titleAsc">A-Å</option>
              <option value="titleDesc">Å-A</option>
              <option value="yearAsc">Eldst-Nyest</option>
              <option value="yearDesc">Nyest-Eldst</option>
            </select>
          </li>
          <li @click="reset()">Nullstill <Dingbats icon="close-small" /></li>
        </ul>
      </div>

      <IntersectionObserver
        id="observer"
        class="observer"
        @on-enter-viewport="onEnterViewport"
      ></IntersectionObserver>
    </div>

    <ProjectGrid :projects="sortedProjects" />
  </Layout>
</template>

<page-query>
query {
  metadata {
    sanityOptions {
      projectId
      dataset
    }
  }
  frontpage: sanityFrontpage(id: "frontpage") {
    intro
  }
  projects: allSanityProject(sortBy: "year") {
    edges {
      node {
        id
        title
        slug {
          current
        }
        rating
        intro
        projectInfo {
          location {
            title
          }
          startYear
          endYear
          size
          category {
            title
          }
        }
        mainImage {
          asset {
            url
            metadata {
              palette {
                darkMuted {
                  background
                  foreground
                }
                darkVibrant {
                  background
                  foreground
                }
                dominant {
                  background
                  foreground
                }
                lightMuted {
                  background
                  foreground
                }
                lightVibrant {
                  background
                  foreground
                }
                muted {
                  background
                  foreground
                }
                vibrant {
                  background
                  foreground
                }
              }
            }
          }
          alt
        }
      }
    }
  }
  locations: allSanityLocation(sortBy: "title") {
    edges {
      node {
        id
        title
      }
    }
  }
  categories: allSanityCategory(sortBy: "title") {
    edges {
      node {
        id
        title
      }
    }
  }
}
</page-query>

<script>
import ProjectGrid from "~/components/ProjectGrid";
import IntersectionObserver from "~/components/tools/IntersectionObserver";
import Dingbats from "~/components/tools/Dingbats";
import Filtering from "~/components/Filter";

export default {
  components: {
    ProjectGrid,
    IntersectionObserver,
    Dingbats,
    Filtering,
  },
  data() {
    return {
      menuOpen: false,
      isInView: false,
      sorting: "standard",
      filter: {
        category: "all",
        location: "all",
        minYear: undefined,
        maxYear: undefined,
      },
    };
  },
  computed: {
    sortedProjects() {
      const projects = this.filteredProjects;
      if (this.sorting === "standard") {
        return projects
          .slice()
          .sort(
            (a, b) =>
              b.node.projectInfo.startYear - a.node.projectInfo.startYear
          )
          .sort((a, b) => b.node.rating - a.node.rating);
      }
      if (this.sorting === "titleAsc") {
        return projects
          .slice()
          .sort((a, b) => a.node.title.localeCompare(b.node.title));
      }
      if (this.sorting === "titleDesc") {
        return projects
          .slice()
          .sort((a, b) => b.node.title.localeCompare(a.node.title));
      }
      if (this.sorting === "yearAsc") {
        return projects
          .slice()
          .sort(
            (a, b) =>
              a.node.projectInfo.startYear - b.node.projectInfo.startYear
          );
      }
      if (this.sorting === "yearDesc") {
        return projects
          .slice()
          .sort(
            (a, b) =>
              b.node.projectInfo.startYear - a.node.projectInfo.startYear
          );
      }
    },
    filteredProjects() {
      const projects = this.$page.projects.edges;
      const filters = this.filter;
      let filtered = projects;
      if (filters.category !== "all") {
        filtered = filtered.filter((item) => {
          const categories = item.node.projectInfo.category.map(
            (category) => category.title
          );
          return categories.some((category) => category === filters.category);
        });
      }
      if (filters.location !== "all") {
        filtered = filtered.filter((item) => {
          if (!item.node.projectInfo.location) {
            return false;
          }
          return item.node.projectInfo.location.title === filters.location;
        });
      }
      if (filters.minYear !== undefined) {
        const minYear = Number(filters.minYear);
        filtered = filtered.filter((item) => {
          if (!item.node.projectInfo.startYear) {
            return false;
          }
          return item.node.projectInfo.startYear >= minYear;
        });
      }
      if (filters.maxYear !== undefined) {
        const maxYear = Number(filters.maxYear);
        filtered = filtered.filter((item) => {
          if (!item.node.projectInfo.startYear) {
            return false;
          }
          return item.node.projectInfo.startYear <= maxYear;
        });
      }
      return filtered;
    },
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    onEnterViewport(value) {
      this.isInView = value;
    },
    reset() {
      this.sorting = "standard";
      this.filter = {
        category: "all",
        location: "all",
        minYear: undefined,
        maxYear: undefined,
      };
    },
  },
  metaInfo: {
    title: "Forside",
    meta: [
      {
        name: "og:image",
        key: "og:image",
        content: "https://arkitektskap.no/images/og-img.jpg",
      },
    ],
  },
};
</script>

<style lang="scss" scoped>
.filter-wrapper {
  width: 100%;
  padding: var(--spacing-xs) var(--spacing-sitepadding);
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1001;
  background: var(--color-text);
  color: var(--color-background);
  font-family: var(--font-mono);
  font-size: var(--font-size-s);

  transform: translateY(100%);
  animation: slideDown 0.3s linear forwards;

  display: none;

  &.inview {
    animation: slideUp 0.3s linear forwards;
  }
}
.filter-menu {
  width: 100%;
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
  text-transform: lowercase;
}
button,
.heading {
  width: 100%;
  font-family: inherit;
  font-size: inherit;
  text-transform: inherit;
  text-align: inherit;
  color: inherit;
  background: var(--color-background);
  border: 1px solid var(--color-text);
}
.observer {
  position: absolute;
  top: 110vh;
  height: calc(100% - 280vh);
  left: 50%;
}

@keyframes slideUp {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}
@keyframes slideDown {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(100%);
  }
}
</style>
