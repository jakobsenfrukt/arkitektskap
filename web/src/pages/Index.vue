<template>
  <Layout>
    <p
      class="intro"
      v-html="$replaceLogo(intro ? intro : $page.frontpage.intro[0])"
    ></p>
    <div class="filter">
      <div class="filter-wrapper" :class="{ inview: isInView }">
        <ul class="filter-menu">
          <li class="filter-menu-item filter-submenu">
            {{ filter.category }} <Dingbats icon="filter" />
            <select v-model="filter.category" @change="toAnchor('#projects')">
              <option disabled>Hva</option>
              <option value="hva">Vis alle</option>
              <option
                v-for="category in $page.categories.edges"
                :key="category.node.title"
                :value="category.node.title"
                :disabled="!categoryHasContent(category.node.title)"
                >{{ category.node.title }}</option
              >
            </select>
          </li>
          <li class="filter-menu-item filter-submenu">
            {{ filter.location }} <Dingbats icon="filter" />
            <select v-model="filter.location" @change="toAnchor('#projects')">
              <option disabled>Hvor</option>
              <option value="hvor">Vis alle</option>
              <option
                v-for="location in $page.locations.edges"
                :key="location.node.title"
                :value="location.node.title"
                :disabled="!locationHasContent(location.node.title)"
                >{{ location.node.title }}</option
              >
            </select>
          </li>
          <li class="filter-menu-item">
            {{ sorting }} <Dingbats icon="sort" />
            <select v-model="sorting" @change="toAnchor('#projects')">
              <option value="sortering">Standard</option>
              <option value="a-å">A-Å</option>
              <option value="å-a">Å-A</option>
              <option value="eldst-nyest">Eldst-Nyest</option>
              <option value="nyest-eldst">Nyest-Eldst</option>
            </select>
          </li>
          <li class="filter-menu-item" @click="reset()">
            Nullstill <Dingbats icon="close-small" />
          </li>
        </ul>

        <div class="filter-menu-mobile" :class="{ menuOpen: menuOpen }">
          <div class="filter-toggle" @click="toggleMenu()">
            <Dingbats icon="filter" /><Dingbats icon="sort" />
          </div>
          <ul class="filter-menu-mobile-list">
            <li class="filter-menu-heading">
              <div class="filter-toggle-inner" @click="toggleMenu()">
                <span>vis prosjekter</span><Dingbats icon="close-small" />
              </div>
            </li>
            <li class="filter-menu-item filter-submenu">
              {{ filter.category }} <Dingbats icon="filter" />
              <select v-model="filter.category" @change="toAnchor('#projects')">
                <option disabled>Hva</option>
                <option value="hva">Vis alle</option>
                <option
                  v-for="category in $page.categories.edges"
                  :key="category.node.title"
                  :value="category.node.title"
                  :disabled="!categoryHasContent(category.node.title)"
                  >{{ category.node.title }}</option
                >
              </select>
            </li>
            <li class="filter-menu-item filter-submenu">
              {{ filter.location }} <Dingbats icon="filter" />
              <select v-model="filter.location" @change="toAnchor('#projects')">
                <option disabled>Hvor</option>
                <option value="hvor">Vis alle</option>
                <option
                  v-for="location in $page.locations.edges"
                  :key="location.node.title"
                  :value="location.node.title"
                  :disabled="!locationHasContent(location.node.title)"
                  >{{ location.node.title }}</option
                >
              </select>
            </li>
            <li class="filter-menu-item">
              {{ sorting }} <Dingbats icon="sort" />
              <select v-model="sorting" @change="toAnchor('#projects')">
                <option value="sortering">Standard</option>
                <option value="a-å">A-Å</option>
                <option value="å-a">Å-A</option>
                <option value="eldst-nyest">Eldst-Nyest</option>
                <option value="nyest-eldst">Nyest-Eldst</option>
              </select>
            </li>
            <li class="filter-menu-item" @click="reset()">
              Nullstill <Dingbats icon="close-small" />
            </li>
          </ul>
        </div>
      </div>

      <IntersectionObserver
        id="observer"
        class="observer"
        @on-enter-viewport="onEnterViewport"
      ></IntersectionObserver>
    </div>

    <ProjectGrid :projects="sortedProjects" id="projects" />
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
              lqip
              dimensions {
                aspectRatio
              }
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
  },
  locations: allSanityLocation(sortBy: "title", order: ASC) {
    edges {
      node {
        id
        title
      }
    }
  }
  categories: allSanityCategory(sortBy: "title", order: ASC) {
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

export default {
  components: {
    ProjectGrid,
    IntersectionObserver,
    Dingbats,
  },
  data() {
    return {
      menuOpen: false,
      isInView: false,
      sorting: "sortering",
      filter: {
        category: "hva",
        location: "hvor",
        minYear: undefined,
        maxYear: undefined,
      },
    };
  },
  computed: {
    intro() {
      const intros = this.$page.frontpage.intro;
      return intros[Math.floor(Math.random() * intros.length)];
    },
    sortedProjects() {
      const projects = this.filteredProjects;
      if (this.sorting === "sortering") {
        return projects
          .slice()
          .sort(
            (a, b) =>
              b.node.projectInfo.startYear - a.node.projectInfo.startYear
          )
          .sort((a, b) => b.node.rating - a.node.rating);
      }
      if (this.sorting === "a-å") {
        return projects
          .slice()
          .sort((a, b) => a.node.title.localeCompare(b.node.title));
      }
      if (this.sorting === "å-a") {
        return projects
          .slice()
          .sort((a, b) => b.node.title.localeCompare(a.node.title));
      }
      if (this.sorting === "eldst-nyest") {
        return projects
          .slice()
          .sort(
            (a, b) =>
              a.node.projectInfo.startYear - b.node.projectInfo.startYear
          );
      }
      if (this.sorting === "nyest-eldst") {
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
      if (filters.category !== "hva") {
        filtered = filtered.filter((item) => {
          const categories = item.node.projectInfo.category.map(
            (category) => category.title
          );
          return categories.some((category) => category === filters.category);
        });
      }
      if (filters.location !== "hvor") {
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
    filteredProjectsByLocation() {
      const projects = this.$page.projects.edges;
      const filters = this.filter;
      let filtered = projects;
      if (filters.location !== "hvor") {
        filtered = filtered.filter((item) => {
          if (!item.node.projectInfo.location) {
            return false;
          }
          return item.node.projectInfo.location.title === filters.location;
        });
      }
      return filtered;
    },
    filteredProjectsByCategory() {
      const projects = this.$page.projects.edges;
      const filters = this.filter;
      let filtered = projects;
      if (filters.category !== "hva") {
        filtered = filtered.filter((item) => {
          const categories = item.node.projectInfo.category.map(
            (category) => category.title
          );
          return categories.some((category) => category === filters.category);
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
      this.sorting = "sortering";
      this.filter = {
        category: "hva",
        location: "hvor",
        minYear: undefined,
        maxYear: undefined,
      };
      this.toAnchor("#projects");
    },
    toAnchor(anchor) {
      document.querySelector(anchor).scrollIntoView({
        behavior: "smooth",
      });
    },
    categoryHasContent(category) {
      return this.filteredProjectsByLocation.some((project) => {
        const categories = project.node.projectInfo.category.map(
          (item) => item.title
        );
        return categories.some((item) => item === category);
      });
    },
    locationHasContent(location) {
      return this.filteredProjectsByCategory.some((element) => {
        return element.node.projectInfo.location.title === location;
      });
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
  transition: color 1s ease-in-out, background-color 1s ease-in-out;
  font-family: var(--font-mono);
  font-size: var(--font-size-s);

  transform: translateY(100%);
  animation: slideDown 0.3s linear forwards;

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

  &-item {
    position: relative;
    cursor: var(--cursor-pointer);

    .dingbat {
      margin-right: 0;
    }
  }
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
select {
  margin-bottom: 0px;
  padding: 0px;
  border: 0px solid transparent;
  background-color: transparent;
  color: inherit;
  font-family: inherit;
  font-size: inherit;
  font-weight: inherit;
  opacity: 0;
  height: 2rem;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  cursor: var(--cursor-pointer);
}
.filter-menu-mobile {
  display: none;
}
.observer {
  position: absolute;
  top: 110vh;
  height: calc(100% - 280vh);
  left: 50%;
}
// give anchor link a lil space for the header
#projects {
  padding-top: var(--spacing-l);
  margin-top: calc(var(--spacing-l) * -1);
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

@media (max-width: 870px) {
  .filter-menu {
    display: none;
  }
  .filter-wrapper {
    .filter-menu-mobile {
      display: none;
    }
    &.inview {
      .filter-menu-mobile {
        display: block;
      }
    }
  }
  .filter-menu-mobile {
    width: 100%;
    display: block;
    text-transform: lowercase;

    ul {
      list-style: none;
      margin: 0;
      padding: var(--spacing-xs) var(--spacing-sitepadding);
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      background: var(--color-text);
      transform: translateY(100%);
      transition: transform 0.3s linear;

      .filter-menu-item {
        background: rgba(255, 255, 255, 0.1);
        padding: 0.3rem 0.6rem;
        margin-bottom: 0.3rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .filter-menu-heading {
        padding: 0.3rem 0.6rem;
        margin-bottom: 0.3rem;
        text-align: center;
      }
    }
    &.menuOpen {
      ul {
        transform: translateY(0);
      }
    }
  }
  .filter-toggle {
    width: 100%;
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: var(--cursor-pointer);

    .dingbat {
      margin-right: 0;
    }
    &-inner {
      width: 100%;
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: var(--cursor-pointer);
      .dingbat {
        margin-right: 0;
      }
    }
  }
}
</style>
