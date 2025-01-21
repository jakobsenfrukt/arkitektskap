<template>
  <ul class="article-list">
    <NewsItem
      v-for="article in articles"
      :key="article.node.id"
      :article="article.node"
    />
  </ul>
</template>

<script>
import NewsItem from "@/components/NewsItem";

export default {
  components: {
    NewsItem,
  },
  props: {
    articles: Array,
  },
};
</script>

<style lang="scss" scoped>
.article-list {
  grid-column: 1 / -1;
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-m);
  row-gap: var(--spacing-l);
  color: var(--color-text);
}
@media (max-width: 1000px) {
  .article-list {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
