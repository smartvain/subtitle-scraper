<template>
  <v-app>
    <v-app-bar app flat height="70">
      <ValidationObserver
        ref="observer"
        style="width: 100%"
        @submit.prevent="handleSubmit"
      >
        <form>
          <v-row justify="center">
            <v-col
              cols="9"
              md="6"
              class="d-flex align-center pl-0"
            >
              <UrlInput @get-lang-list="getLangList" />
            </v-col>

            <v-col
              cols="1"
              class="d-flex align-center pa-0"
            >
              <LangSelectMenu
                v-if="isMdSize"
                :loading="loading.getLangList"
              />
              <LangSelect
                v-else
                :loading="loading.getLangList"
              />
            </v-col>

            <v-col
              cols="1"
              class="d-flex align-center"
              :class="{ 'pa-0': isMdSize }"
            >
              <v-btn
                icon
                small
                type="submit"
              >
                <v-icon>mdi-magnify</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </form>
      </ValidationObserver>

      <v-btn
        v-if="!isSmSize"
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

    <v-footer v-show="!isSmSize" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>

    <div v-show="isSmSize">
      <v-fade-transition>
        <v-btn
          v-show="fab"
          v-scroll="onScroll"
          fixed
          bottom
          right
          fab
          small
          style="opacity: .5"
          @click="$vuetify.goTo(0, 'smooth')"
        >
          <v-icon>mdi-chevron-up</v-icon>
        </v-btn>
      </v-fade-transition>
    </div>
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
      screenWidth: window.innerWidth,
      fab: false,
      scrollOffset: 0
    }
  },
  computed: {
    ...mapGetters(['url', 'selectedLang']),
    themeIcon() {
      return this.darkMode ? 'mdi-weather-night' : 'mdi-weather-sunny'
    },
    bgColor() {
      return this.darkMode ? 'grey darken-3' : 'grey lighten-4'
    },
    isMdSize() {
      return this.screenWidth < 960
    },
    isSmSize() {
      return this.screenWidth < 600
    }
  },
  watch: {
    darkMode(bool) {
      this.$vuetify.theme.dark = bool
    }
  },
  mounted() {
    window.addEventListener('resize', () => (this.screenWidth = window.innerWidth))
  },
  methods: {
    async handleSubmit() {
      const isValid = await this.$refs.observer.validate()
      if (!isValid) {
        this.showErrorMessage(this.$refs.observer.errors)
      } else {
        this.getSubtitles(this.url, this.selectedLang)
      }
    },
    showErrorMessage(messages) {
      const errors = []
      Object.keys(messages).forEach(key => {
        messages[key].forEach(message => errors.push(message))
      })
      this.$toast.error(errors.shift())
    },
    onScroll (e){
      if (typeof window === 'undefined') return
      const top = window.pageYOffset || e.target.scrollTop || 0

      this.fab = this.scrollOffset < top
      this.scrollOffset = top
    }
  }
}
</script>
