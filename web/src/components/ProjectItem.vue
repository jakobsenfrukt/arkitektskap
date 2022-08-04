<template>
  <li
    class="project"
    :class="`size-${project.rating}`"
    :style="
      `--color-hover-light: ${
        project.mainImage.asset.metadata.palette.darkMuted.background
      }; --color-hover-dark: ${
        project.mainImage.asset.metadata.palette.lightMuted.background
      }`
    "
  >
    <div class="project-image">
      <img
        v-if="project.mainImage"
        :src="
          $urlForImage(project.mainImage, $static.metadata.sanityOptions)
            .width(1200)
            .auto('format')
            .url()
        "
        :alt="project.mainImage.alt"
      />
    </div>
    <!--<ul class="palette">
      <li
        v-for="(color, index) in project.mainImage.asset.metadata.palette"
        :key="`color-${index}`"
      >
        <div
          class="palette-color"
          :style="
            `--palette-background: ${color.background}; --palette-foreground: ${
              color.foreground
            }`
          "
        >
          {{ color.background }}
        </div>
      </li>
    </ul>-->
    <div class="project-text">
      <h2 class="project-title">{{ project.title }}</h2>
      <p class="project-intro">
        {{ project.intro }}
      </p>
      <ul class="project-info">
        <li v-if="project.projectInfo.location.title">
          Hvor:<br />
          {{ project.projectInfo.location.title }}
        </li>
        <li>
          Når:<br />
          {{ project.projectInfo.startYear
          }}<template v-if="project.projectInfo.endYear"
            >&mdash;{{ project.projectInfo.endYear }}</template
          ><template v-else>
            (pågår)</template
          >
        </li>
        <li v-if="project.projectInfo.category.length">
          Hva:<br />
          <ul class="project-categories">
            <li
              v-for="(category, index) in project.projectInfo.category"
              :key="`category-${index}`"
            >
              {{ category.title }}
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <g-link class="project-link" :to="`/prosjekter/${project.slug.current}`"
      >Link</g-link
    >

    <!--<CursorFriend
      v-if="isInView"
      :text="`Les mer om ${project.title}`"
      :id="project.id"
      class="cursorfriend"
    />-->

    <IntersectionObserver
      :id="`observer-${project.id}`"
      class="observer"
      @on-enter-viewport="onEnterViewport"
    ></IntersectionObserver>
  </li>
</template>

<static-query>
query {
  metadata {
    sanityOptions {
      projectId
      dataset
    }
  }
}
</static-query>

<script>
import BlockContent from "@/components/tools/BlockContent";
import IntersectionObserver from "@/components/tools/IntersectionObserver";
import CursorFriend from "@/components/tools/CursorFriend.vue";

export default {
  components: {
    BlockContent,
    IntersectionObserver,
    CursorFriend,
  },
  props: {
    project: Object,
  },
  data() {
    return {
      isInView: false,
    };
  },
  methods: {
    onEnterViewport(value) {
      this.isInView = value;
      if (value === false) {
        return;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.project {
  grid-column: span 12;
  position: relative;
  &-text {
    transition: color 0.6s ease;
  }
  &-image {
    margin-bottom: var(--spacing-sitepadding);
    max-height: 80vh;
    overflow: hidden;

    img {
      object-fit: cover;
      transition: transform 1s ease;
    }
  }
  .cursorfriend {
    display: none;
  }
  &:hover {
    .cursorfriend {
      display: block;
    }
  }
  &-title {
    font-size: var(--font-size-s);
    font-family: var(--font-mono);
    font-weight: 500;
    margin-bottom: 0.6rem;
  }
  &-intro {
    font-size: var(--font-size-l);
    font-family: var(--font-serif);
    line-height: 1.2;
  }
  &-info {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    font-family: var(--font-mono);
    font-size: var(--font-size-s);
    font-weight: 500;
    list-style: none;
    margin: 0 0 1rem;
    padding: 0;
    align-self: flex-end;
  }
  &-categories {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  &-link {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
    overflow: hidden;
    text-indent: -9999px;
    z-index: 0;
  }

  &.size-3 {
    .project-intro {
      font-size: var(--font-size-xxl);
    }
  }

  &.size-2 {
    .project-intro {
      font-size: var(--font-size-xl);
    }
  }

  &.size-1 {
    display: grid;
    grid-template-columns: 1fr minmax(0, 1fr);
    gap: var(--spacing-sitepadding);
    .project-image {
      grid-column: span 1;
      //min-height: 100%;

      img {
        height: 100%;
        object-fit: cover;
      }
    }
    .project-text {
      grid-column: span 1;
    }
    .project-intro {
      font-size: var(--font-size-l);
    }
    .project-info {
      grid-template-columns: 1fr;

      br {
        display: none;
      }
    }
  }
}

.observer {
  position: absolute;
  top: 0;
  bottom: 0;
  height: 100%;
  z-index: 0;
  width: 10px;
}

body {
  .project-text {
    --color-hover: var(--color-hover-light);
  }
}

body[data-theme="dark"] {
  .project-text {
    --color-hover: var(--color-hover-dark);
  }
}

@media (min-width: 600px) {
  .project {
    grid-column: span 6;
  }
}
@media (min-width: 1940px) {
  .project {
    grid-column: span 4;
  }
}
</style>
