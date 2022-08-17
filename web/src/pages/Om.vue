<template>
  <Layout>
    <p class="intro about-intro" v-html="$replaceLogo($page.about.intro)"></p>
    <ul class="about-numbers">
      <h2><strong>arkitektskap</strong> i tall</h2>
      <li>
        <strong class="number">{{ getActiveYears() }}</strong> år i praksis
      </li>
      <li>
        prosjekter på
        <strong class="number">{{ $page.locations.edges.length }}</strong> ulike
        steder
      </li>
      <li>
        som har mottatt
        <strong class="number">{{ $page.about.numbers.awards }}</strong> priser
        og utmerkelser
      </li>
      <li>
        nå er vi
        <strong class="number">{{ $page.people.edges.length }}</strong> flinke
        folk
      </li>
      <li>
        som snakker
        <strong class="number">{{ $page.languages.edges.length }}</strong> ulike
        språk
      </li>
      <li>
        fordelt på
        <strong class="number">{{ $page.about.numbers.sqm }}</strong>
        kvadratmeter
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

export default {
  components: {
    BlockContent,
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
  display: grid;

  h2 {
    grid-column: 1 / -1;
  }
  .number {
    font-family: var(--font-mono);
    font-size: var(--font-size-xl);
    vertical-align: middle;
    margin-bottom: 0.2em;
  }
}

@media (max-width: 600px) {
  .about-content,
  .about-numbers {
    grid-column: 1 / -1;
  }
  .about-numbers {
    margin-bottom: var(--spacing-l);
  }
}
</style>
