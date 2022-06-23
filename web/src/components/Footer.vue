<template>
  <footer class="site-footer" id="kontakt">
    <p class="intro" v-html="$replaceLogo($static.contact.intro)"></p>
    <ul class="contact-list">
      <li class="contact" aria-label="Kontakt">
        <a
          v-if="$static.contact.email"
          :href="`tel:${$static.contact.phone}`"
          class="phone"
          ><span class="icon"
            ><img src="/assets/graphics/dingbats/phone.svg"/></span
          ><span>{{ $static.contact.phone }}</span></a
        >
        <a
          v-if="$static.contact.phone"
          :href="`mailto:${$static.contact.email}`"
          target="_blank"
          class="email"
          ><span class="icon"
            ><img src="/assets/graphics/dingbats/email.svg"/></span
          ><span>{{ $static.contact.email }}</span></a
        >
      </li>
      <li class="social" aria-label="Sosiale medier">
        <a
          v-if="$static.contact.facebook"
          :href="`https://facebook.com/${$static.contact.facebook}`"
          target="_blank"
          class="facebook"
          ><span class="icon"
            ><img src="/assets/graphics/dingbats/facebook.svg"/></span
          ><span>Facebook</span></a
        >
        <a
          v-if="$static.contact.instagram"
          :href="`https://instagram.com/${$static.contact.instagram}`"
          target="_blank"
          class="instagram"
          ><span class="icon"
            ><img src="/assets/graphics/dingbats/instagram.svg"/></span
          ><span>Instagram</span></a
        >
        <a
          v-if="$static.contact.linkedin"
          :href="`https://linkedin.com/${$static.contact.linkedin}`"
          target="_blank"
          class="linkedin"
          ><span class="icon"
            ><img src="/assets/graphics/dingbats/linkedin.svg"/></span
          ><span>Linkedin</span></a
        >
      </li>
      <li
        v-if="$static.contact._rawAddress"
        aria-label="Adresse"
        class="address"
      >
        <span class="icon"
          ><img src="/assets/graphics/dingbats/earth.svg"
        /></span>
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
    linkedin
    _rawAddress
  }
}
</static-query>

<script>
import BlockContent from "~/components/tools/BlockContent";
import Totop from "@/components/tools/Totop.vue";

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
  font-size: var(--font-size-m);
}
.intro {
  margin-bottom: calc(var(--spacing-sitepadding) * 6);
}
.contact-list {
  list-style: none;
  margin: 0;
  padding: 0;
  font-size: inherit;

  li {
    display: inline-block;
    padding-right: calc(var(--spacing-sitepadding) * 6);
    margin-bottom: calc(var(--spacing-sitepadding) * 3);
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
.icon {
  display: inline-block;
  width: 1.5em;
  height: 1.5em;
  vertical-align: middle;
  margin-right: 1em;
}
.address {
  position: relative;
  padding-left: 2.4em;
  .icon {
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>
