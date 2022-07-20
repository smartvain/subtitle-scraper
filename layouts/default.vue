<template>
  <v-app dark>
    <!-- header -->
    <v-app-bar app flat height="70">
      <v-row justify="center">
        <v-col cols="5" :class="alignCenter">
          <UrlInput
            @get-lang-list="getLangList"
          />
        </v-col>
        <v-col cols="1" :class="alignCenter">
          <LangSelect
            :loading="loading.getLangList"
            :lang-list="langList"
          />
        </v-col>
        <v-col cols="1">
          <v-btn
            icon
            @click="getSubtitle"
          >
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
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
      alignCenter: 'd-flex align-center'
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
