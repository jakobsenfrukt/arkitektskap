<template>
  <Layout>
    <p class="intro about-intro" v-html="$replaceLogo($page.about.intro)"></p>
    <ul class="about-numbers">
      <li>
        <Dingbats icon="house" />
        <strong class="number">{{ getActiveYears() }}</strong> år i praksis
      </li>
      <!--<li>
        <strong class="number">{{ $page.locations.edges.length }}</strong> ulike
        steder
      </li>-->
      <li>
        <Dingbats icon="award" />
        <strong class="number">{{ $page.about.numbers.awards }}</strong> priser
        og utmerkelser
      </li>
      <li>
        <Dingbats icon="heart" />
        <strong class="number">{{ $page.people.edges.length }}</strong> flinke
        folk
      </li>
      <li>
        <Dingbats icon="earth" />
        <strong class="number">{{ $page.languages.edges.length }}</strong> ulike
        språk
      </li>
      <li>
        <Dingbats icon="measuring" />
        <strong class="number"
          >{{ $page.about.numbers.sqm }}m<sup>2</sup></strong
        >
        kontorareal
      </li>
    </ul>
    <div class="about-content">
      <BlockContent
        :blocks="$page.about._rawBody"
        v-if="$page.about._rawBody"
        class="block-content"
      />
    </div>
  </Layout>
</template>

<page-query>
query {
  about: sanityAbout(id: "about") {
    intro
    numbers {
      awards
      sqm
    }
    _rawBody
  }
  projects: allSanityProject(sortBy: "year") {
    edges {
      node {
        id
      }
    }
  }
  people: allSanityPerson(sortBy: "name") {
    edges {
      node {
        id
      }
    }
  }
  locations: allSanityLocation(sortBy: "title") {
    edges {
      node {
        id
      }
    }
  }
  clients: allSanityClient(sortBy: "title") {
    edges {
      node {
        id
      }
    }
  }
  collaborators: allSanityCollaborator(sortBy: "title") {
    edges {
      node {
        id
      }
    }
  }
  languages: allSanityLanguage(sortBy: "title") {
    edges {
      node {
        id
      }
    }
  }
}
</page-query>

<script>
import BlockContent from "~/components/tools/BlockContent";
import Dingbats from "~/components/tools/Dingbats";

export default {
  components: {
    BlockContent,
    Dingbats,
  },
  methods: {
    getActiveYears() {
      let now = new Date(Date.now());
      let startDate = new Date(1985, 12, 3);
      let yearsDiff = now.getFullYear() - startDate.getFullYear();
      return yearsDiff;
    },
  },
  metaInfo: {
    title: "Om",
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
.about-intro {
  grid-column: 1 / -1;
}
.about-content {
  grid-column: 5 / span 7;
}
.about-numbers {
  grid-column: 1 / span 4;
  list-style: none;
  margin: 0;
  padding: 0;

  li {
    margin-bottom: 2rem;
    position: relative;
    padding-left: 2.4em;
    .dingbat {
      position: absolute;
      top: 0.4rem;
      left: 0;
    }
    sup {
      line-height: 0;
    }
  }
  h2 {
    grid-column: 1 / -1;
  }
  .number {
    font-family: var(--font-mono);
    font-size: var(--font-size-l);
    margin: 0 0.1em 0.2em 0;
    display: block;
    line-height: 1;
  }
}

@media (max-width: 800px) {
  .about-content,
  .about-numbers {
    grid-column: 1 / -1;
  }
  .about-numbers {
    margin-bottom: var(--spacing-l);
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin-bottom: var(--spacing-m);

    li {
      .dingbat {
        top: 0;
      }
    }
  }
}

@media (max-width: 500px) {
  .about-numbers {
    margin-bottom: var(--spacing-m);
    grid-template-columns: 1fr;

    li {
      .dingbat {
        top: 0;
      }
    }
  }
}
</style>
