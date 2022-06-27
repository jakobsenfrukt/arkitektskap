<template>
  <Layout>
    <p class="intro about-intro" v-html="$replaceLogo($page.about.intro)"></p>
    <ul class="about-numbers">
      <h2><strong>arkitektskap</strong> i tall</h2>
      <li>
        <span class="number">{{ $page.projects.edges.length }}</span> prosjekter
      </li>
      <li>
        over <span class="number">{{ getActiveYears() }}</span> år
      </li>
      <li>
        i <span class="number">{{ $page.locations.edges.length }}</span> byer
      </li>
      <li>
        for <span class="number">{{ $page.clients.edges.length }}</span> ulike
        oppdragsgivere
      </li>
      <li>
        nå er vi
        <span class="number">{{ $page.people.edges.length }}</span> folk
      </li>
      <li>
        som samarbeider på tvers med
        <span class="number">{{ $page.collaborators.edges.length }}</span>
        samarbeidspartnere
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
  grid-column: 1 / -1;
}
.about-numbers {
  grid-column: 1 / -1;
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
  }
}
</style>
