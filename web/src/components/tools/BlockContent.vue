<template>
  <portable-text
    :blocks="blocks"
    :serializers="serializers"
    :projectId="$static.metadata.sanityOptions.projectId"
    :dataset="$static.metadata.sanityOptions.dataset"
  />
</template>

<script>
import PortableText from "sanity-blocks-vue-component";

export default {
  props: {
    blocks: Array,
  },
  components: {
    PortableText,
  },
  data() {
    return {
      serializers: {
        types: {
          figure: ({ node }) => (
            <figure>
              <img
                src={this.$urlForImage(
                  node,
                  this.$static.metadata.sanityOptions
                )
                  .auto("format")
                  .url()}
                alt={node.alt}
              />
              <figcaption>{node.caption}</figcaption>
            </figure>
          ),
        },
        marks: {
          link: ({ mark, children }) => {
            const { blank, href } = mark;
            return blank ? (
              <a href={href} target="_blank" rel="noopener">
                {children}
              </a>
            ) : (
              <a href={href}>{children}</a>
            );
          },
        },
      },
    };
  },
};
</script>

<static-query>
  {
    metadata{
    sanityOptions{
      projectId
      dataset
    }
  }
}
</static-query>

<style lang="scss">
.block-content {
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 1.6em 0 0.6em;
  }
  ul {
    list-style-type: none;
    padding-left: 1em;
  }
  ul > li:before {
    content: "—";
    margin-right: 0.5em;
  }
  figure {
    margin: calc(var(--spacing-m) * 1.5) 0;
  }
}
</style>
