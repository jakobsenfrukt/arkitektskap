<template>
  <footer class="site-footer" id="kontakt">
    <h1>Kontakt</h1>
    <ul class="contact-list">
      <li v-if="$static.contact._rawAddress">
        <block-content
          :blocks="$static.contact._rawAddress"
          v-if="$static.contact._rawAddress"
        />
      </li>
      <li v-if="$static.contact.email">
        <a :href="`mailto:${$static.contact.email}`" target="_blank">{{
          $static.contact.email
        }}</a>
      </li>
      <li v-if="$static.contact.phone">
        <a :href="`tel:${$static.contact.phone}`">{{
          $static.contact.phone
        }}</a>
      </li>
      <li>&nbsp;</li>
      <li v-if="$static.contact.facebook">
        <a
          :href="`https://facebook.com/${$static.contact.facebook}`"
          target="_blank"
          >Facebook</a
        >
      </li>
      <li v-if="$static.contact.instagram">
        <a
          :href="`https://instagram.com/${$static.contact.instagram}`"
          target="_blank"
          >Instagram</a
        >
      </li>
      <li v-if="$static.contact.linkedin">
        <a
          :href="`https://linkedin.com/${$static.contact.linkedin}`"
          target="_blank"
          >Linkedin</a
        >
      </li>
    </ul>
    <Totop />
  </footer>
</template>

<static-query>
query {
  contact: sanityContact (id: "contact") {
    email
    phone
    facebook
    instagram
    linkedin
    _rawAddress
  }
}
</static-query>

<script>
import BlockContent from "~/components/BlockContent";
import Totop from "@/components/Totop.vue";

export default {
  components: {
    BlockContent,
    Totop,
  },
};
</script>

<style lang="scss" scoped>
.site-footer {
  min-height: 100vh;
  padding: var(--spacing-sitepadding);
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-family: var(--font-mono);
}
h1 {
  margin-bottom: 2rem;
}
.contact-list {
  list-style: none;
  margin: 0;
  padding: 0;
  font-size: inherit;
}
</style>
