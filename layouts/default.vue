<template>
  <v-app dark>
    <v-app-bar app flat height="70">
      <v-row justify="center">
        <v-col
          cols="9"
          md="5"
          class="d-flex align-center pl-0"
        >
          <UrlInput @get-lang-list="getLangList" />
        </v-col>

        <v-col
          cols="1"
          class="d-flex align-center pa-0"
        >
          <LangSelect
            v-if="!smSize"
            :loading="loading.getLangList"
          />
          <LangSelectMenu
            v-else
            :loading="loading.getLangList"
          />
        </v-col>

        <v-col
          cols="1"
          class="d-flex align-center"
          :class="{ 'pa-0': smSize }"
        >
          <v-btn icon small @click="getSubtitle">
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
        </v-col>
      </v-row>

      <v-btn
        v-if="!smSize"
        icon
        absolute
        right
        @click="darkMode = !darkMode"
      >
        <v-icon>{{ themeIcon }}</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main :class="bgColor">
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>

    <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import SubtitleScraperMixin from '~/mixins/subtitle-scraper.js'
import UrlInput from '~/components/UrlInput.vue'
import LangSelect from '~/components/LangSelect.vue'
import LangSelectMenu from '~/components/LangSelectMenu.vue'

export default {
  name: 'DefaultLayout',
  components: {
    UrlInput,
    LangSelect,
    LangSelectMenu
  },
  mixins: [
    SubtitleScraperMixin
  ],
  data() {
    return {
      darkMode: false,
      screenWidth: window.innerWidth
    }
  },
  computed: {
    ...mapGetters(['langList', 'selectedLang']),
    themeIcon() {
      return this.darkMode ? 'mdi-weather-night' : 'mdi-weather-sunny'
    },
    bgColor() {
      return this.darkMode ? 'grey darken-3' : 'grey lighten-4'
    },
    smSize() {
      return this.screenWidth <= 670
    }
  },
  watch: {
    darkMode(bool) {
      this.$vuetify.theme.dark = bool
    }
  },
  mounted() {
    window.addEventListener('resize', () => (this.screenWidth = window.innerWidth))
  }
}
</script>
