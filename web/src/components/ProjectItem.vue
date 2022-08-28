<template>
  <li class="project" :class="`size-${project.rating}`">
    <SuperImage
      v-if="project.mainImage"
      class="project-image"
      :image="project.mainImage"
      :alt="project.mainImage.alt"
      :width="800"
      :lqip="project.mainImage.asset.metadata.lqip"
      :aspectRatio="project.mainImage.asset.metadata.dimensions.aspectRatio"
    />
    <div class="project-text">
      <h2 class="project-title">{{ project.title }}</h2>
      <p class="project-intro">
        {{ project.intro }}
      </p>
      <ul class="project-info">
        <li v-if="project.projectInfo.location.title">
          {{ project.projectInfo.location.title }},
          <template
            v-if="
              project.projectInfo.endYear &&
                project.projectInfo.endYear === project.projectInfo.startYear
            "
            >{{ project.projectInfo.startYear }}</template
          ><template v-else-if="project.projectInfo.endYear"
            >{{ project.projectInfo.startYear }}&mdash;{{
              project.projectInfo.endYear
            }}</template
          ><template v-else>
            {{ project.projectInfo.startYear }} (pågår)</template
          >
        </li>
        <li v-if="project.projectInfo.category.length">
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
    <template v-if="usePalette">
      <IntersectionObserver
        :id="`observer-${project.id}`"
        class="observer"
        @on-enter-viewport="onEnterViewport"
      ></IntersectionObserver>
    </template>
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
    usePalette: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isInView: false,
    };
  },
  computed: {
    cssVars() {
      if (this.project.mainImage.asset.metadata.palette) {
        const palette = this.prepareColors(
          this.project.mainImage.asset.metadata.palette
        );
        return {
          "--color-background-light": palette.light
            ? palette.light
            : "var(--color-white)",
          "--color-text-light": palette.dark
            ? palette.dark
            : "var(--color-black)",

          "--color-background-dark": palette.dark
            ? palette.dark
            : "var(--color-black)",
          "--color-text-dark": palette.light
            ? palette.light
            : "var(--color-white)",
        };
      } else {
        return {
          "--color-background-light": "var(--color-white)",
          "--color-text-light": "var(--color-black)",

          "--color-background-dark": "var(--color-black)",
          "--color-text-dark": "var(--color-white)",
        };
      }
    },
  },
  methods: {
    onEnterViewport(value) {
      this.isInView = value;
      if (value === false) {
        return;
      }

      Object.entries(this.cssVars).forEach((entry) => {
        const [key, value] = entry;
        document.body.style.setProperty(key, value);
      });
    },
    prepareColors(palette) {
      const newPalette = {
        light: palette.lightMuted.background,
        dark: palette.darkMuted.background,
      };
      do {
        newPalette.light = this.lightenDarkenColor(newPalette.light, 10);
        newPalette.dark = this.lightenDarkenColor(newPalette.dark, -10);
      } while (this.contrastRatio(newPalette.light, newPalette.dark) >= 1 / 7);
      return newPalette;
    },
    hexToRgb(hex) {
      // function by Tim Down
      var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
      hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
      });

      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
          }
        : null;
    },
    luminance(r, g, b) {
      // function by kirilloid
      var a = [r, g, b].map(function(v) {
        v /= 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
      });
      return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
    },
    contrastRatio(color1hex, color2hex) {
      const color1 = this.hexToRgb(color1hex);
      const color2 = this.hexToRgb(color2hex);
      const color1luminance = this.luminance(color1.r, color1.g, color1.b);
      const color2luminance = this.luminance(color2.r, color2.g, color2.b);

      const ratio =
        color1luminance > color2luminance
          ? (color2luminance + 0.05) / (color1luminance + 0.05)
          : (color1luminance + 0.05) / (color2luminance + 0.05);

      return ratio;
    },
    lightenDarkenColor(col, amt) {
      var usePound = false;

      if (col[0] == "#") {
        col = col.slice(1);
        usePound = true;
      }

      var num = parseInt(col, 16);

      var r = (num >> 16) + amt;

      if (r > 255) r = 255;
      else if (r < 0) r = 0;

      var b = ((num >> 8) & 0x00ff) + amt;

      if (b > 255) b = 255;
      else if (b < 0) b = 0;

      var g = (num & 0x0000ff) + amt;

      if (g > 255) g = 255;
      else if (g < 0) g = 0;

      return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
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
    margin-bottom: var(--spacing-m);
    width: 100%;
    max-height: 70vh;
    overflow: hidden;

    img {
      width: 100%;
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
    margin-bottom: var(--spacing-s);
  }
  &-intro {
    font-size: var(--font-size-l);
    font-family: var(--font-serif);
    line-height: 1.2;
    margin: 0 0 calc(var(--spacing-s) * 1.2) -0.06em;
  }
  &-info {
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
      font-size: var(--font-size-xl);
    }
  }

  &.size-2 {
    .project-intro {
      font-size: var(--font-size-l);
    }
  }

  &.size-1 {
    display: grid;
    grid-template-columns: 1fr minmax(0, 1fr);
    gap: var(--spacing-m);
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
      font-size: var(--font-size-m);
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

@media (min-width: 600px) {
  .project {
    grid-column: span 6;
  }
}

@media (max-width: 600px) {
  .project {
    &.size-1 {
      grid-template-columns: 1fr;
    }
  }
}
</style>
