<template>
  <footer class="site-footer" id="kontakt">
    <p
      class="intro"
      v-html="
        $replaceLogo(
          $static.contact.intro[
            Math.floor(Math.random() * $static.contact.intro.length)
          ]
        )
      "
    ></p>
    <ul class="contact-list">
      <li class="contact" aria-label="Kontakt">
        <a
          v-if="$static.contact.email"
          :href="`tel:${$static.contact.phone}`"
          class="phone"
          ><Dingbats icon="phone" /><span>{{ $static.contact.phone }}</span></a
        >
        <a
          v-if="$static.contact.phone"
          :href="`mailto:${$static.contact.email}`"
          target="_blank"
          class="email"
          ><Dingbats icon="email" /><span>{{ $static.contact.email }}</span></a
        >
      </li>
      <li class="social" aria-label="Sosiale medier">
        <a
          v-if="$static.contact.facebook"
          :href="`${$static.contact.facebook}`"
          target="_blank"
          class="facebook"
          ><Dingbats icon="facebook" /><span>Facebook</span></a
        >
        <a
          v-if="$static.contact.instagram"
          :href="`${$static.contact.instagram}`"
          target="_blank"
          class="instagram"
          ><Dingbats icon="instagram" /><span>Instagram</span></a
        >
        <a
          v-if="$static.contact.linkedin"
          :href="`https://linkedin.com/${$static.contact.linkedin}`"
          target="_blank"
          class="linkedin"
          ><Dingbats icon="linkedin" /><span>Linkedin</span></a
        >
      </li>
      <li
        v-if="$static.contact._rawAddress"
        aria-label="Adresse"
        class="address"
      >
        <Dingbats icon="building" class="icon" />
        <block-content
          :blocks="$static.contact._rawAddress"
          v-if="$static.contact._rawAddress"
        />
      </li>
    </ul>
    <Totop />
  </footer>
</template>

<static-query>
query {
  contact: sanityContact (id: "contact") {
    intro
    email
    phone
    facebook
    instagram
    _rawAddress
  }
}
</static-query>

<script>
import BlockContent from "~/components/tools/BlockContent";
import Totop from "@/components/tools/Totop.vue";
import Dingbats from "@/components/tools/Dingbats.vue";

export default {
  components: {
    BlockContent,
    Totop,
    Dingbats,
  },
};
</script>

<style lang="scss" scoped>
.site-footer {
  min-height: 100vh;
  padding: var(--spacing-m) var(--spacing-sitepadding);
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-family: var(--font-mono);
  font-size: var(--font-size-s);

  /*background: var(--color-text);
  color: var(--color-background);*/
}
.intro {
  margin-bottom: var(--spacing-l);
}
.contact-list {
  list-style: none;
  margin: 0;
  padding: 0;
  font-size: inherit;

  li {
    display: inline-block;
    padding-right: var(--spacing-l);
    margin-bottom: var(--spacing-l);
  }
  a {
    display: block;

    span {
      display: inline-block;
      line-height: 1.5em;
      vertical-align: middle;
    }
  }
}
.address {
  position: relative;
  padding-left: 2.4em;
  p {
    line-height: 1.8;
  }
  .icon {
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>
