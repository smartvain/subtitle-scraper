<template>
  <v-app dark>
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
          />
        </v-col>
        <v-col cols="1">
          <v-btn icon @click="getSubtitle">
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

export default {
  name: 'DefaultLayout',
  components: {
    UrlInput,
    LangSelect
  },
  mixins: [
    SubtitleScraperMixin
  ],
  data() {
    return {
      alignCenter: 'd-flex align-center',
      darkMode: false,
    }
  },
  computed: {
    ...mapGetters(['selectedLang']),
    themeIcon() {
      return this.darkMode ? 'mdi-weather-night' : 'mdi-weather-sunny'
    },
    bgColor() {
      return this.darkMode ? 'grey darken-3' : 'grey lighten-4'
    }
  },
  watch: {
    darkMode(bool) {
      this.$vuetify.theme.dark = bool
    }
  }
}
</script>
