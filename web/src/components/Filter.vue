<template>
  <div class="filter-wrapper">
    <ul class="filter-menu">
      <li class="heading">Filter</li>
      <li>
        <button @click="showMenu = !showMenu">Filter</button>
        <ul class="filter-submenu" v-if="showMenu">
          <li><button>Filter</button></li>
          <li><button>Filter</button></li>
          <li><button>Filter</button></li>
          <li><button>Filter</button></li>
          <li><button>Filter</button></li>
          <li><button>Filter</button></li>
          <li><button>Filter</button></li>
          <li><button>Filter</button></li>
        </ul>
      </li>
      <li>
        <button @click="showMenu = !showMenu">Filter</button>
        <ul class="filter-submenu" v-if="showMenu">
          <li><button>Filter</button></li>
          <li><button>Filter</button></li>
          <li><button>Filter</button></li>
          <li><button>Filter</button></li>
          <li><button>Filter</button></li>
          <li><button>Filter</button></li>
          <li><button>Filter</button></li>
          <li><button>Filter</button></li>
        </ul>
      </li>
      <li><button>Filter</button></li>
      <li><button>Filter</button></li>
      <li><button>Filter</button></li>
    </ul>
    <ul class="filter-menu">
      <li class="heading">Sortering</li>
      <li><button>Sortering</button></li>
      <li><button>Sortering</button></li>
      <li><button>Sortering</button></li>
      <li><button>Sortering</button></li>
      <li><button>Sortering</button></li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showMenu: false,
    };
  },
};
</script>

<style lang="scss" scoped>
.filter-wrapper {
  width: 100%;
  grid-column: 1 / -1;
  padding: var(--spacing-m);
  /*position: fixed;
  bottom: 0;
  left: 0;
  z-index: 1000;*/
  display: none;
}
.filter-menu {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: calc(var(--spacing-m) / 4);
  font-family: var(--font-serif);
  text-transform: lowercase;
  text-align: left;
  .heading {
    font-weight: bold;
    background: var(--color-background);
  }
  &:first-of-type {
    margin: 0 0 calc(var(--spacing-m) / 4);
  }
}
.filter-submenu {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: calc(var(--spacing-m) / 2);
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
</style>
