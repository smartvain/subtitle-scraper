<template>
  <v-app dark>
    <!-- header -->
    <v-app-bar app flat height="70">
      <v-row justify="center" class="mt-1">
        <v-col cols="5">
          <UrlInput
            @get-lang-list="getLangList"
            @get-subtitle="getSubtitle"
          />
        </v-col>
        <v-col cols="2">
          <LangSelect
            :loading="loading.getLangList"
            :lang-list="langList"
          />
        </v-col>
      </v-row>

      <v-btn
        icon
        absolute
        right
        @click="darkMode = !darkMode"
      >
        <v-icon>{{ themeIcon }}</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- main -->
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
import SubtitleScraperMixin from '~/mixins/subtitle-scraper.js'
import UrlInput from '~/components/UrlInput.vue'
import LangSelect from '~/components/LangSelect.vue'

export default {
  name: 'DefaultLayout',
  mixins: [
    SubtitleScraperMixin
  ],
  components: {
    UrlInput,
    LangSelect
  },
  data() {
    return {
      darkMode: false,
    }
  },
  watch: {
    darkMode(bool) {
      this.$vuetify.theme.dark = bool
    }
  },
  computed: {
    themeIcon() {
      return this.darkMode ? 'mdi-weather-night' : 'mdi-weather-sunny'
    },
    bgColor() {
      return this.darkMode ? 'grey darken-3' : 'grey lighten-4'
    }
  },
}
</script>
