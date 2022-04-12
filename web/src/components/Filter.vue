<template>
  <div class="filter-wrapper">
    <ul class="filter-menu">
      <li class="heading">Filter</li>
      <li>
        <button @click="showMenu = !showMenu">Filterkategori</button>
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
    </ul>
    <ul class="filter-menu">
      <li class="heading">Sortering</li>
      <li><button>Sorteringskriterium</button></li>
      <li><button>Sorteringskriterium</button></li>
      <li><button>Sorteringskriterium</button></li>
      <li><button>Sorteringskriterium</button></li>
      <li><button>Sorteringskriterium</button></li>
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
  padding: var(--spacing-sitepadding);

  .filter-menu {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    .heading {
      font-weight: bold;
    }
  }
}
.filter-submenu {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
}
button {
  width: 100%;
}
</style>
