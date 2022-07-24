<template>
  <v-app>
    <v-app-bar app flat height="70">
      <v-btn
        icon
        absolute
        left
        @click="isOpenDrawer = !isOpenDrawer"
      >
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      
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
                :loading="loading.getSubtitles"
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

    <v-main :style="`background-color: ${bgColor}`">
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>

    <v-fade-transition>
      <v-footer
        v-show="isSmSize ? isScroll : false"
        v-scroll="onScroll"
        style="opacity: .9"
        :height="isSmSize ? 70 : 40"
        app
      >
        <v-btn
          v-show="isSmSize"
          icon
          small
          @click="isOpenDrawer = !isOpenDrawer"
        >
          <v-icon>mdi-menu</v-icon>
        </v-btn>
      
        <v-btn
          v-show="isSmSize"
          fixed
          bottom
          right
          fab
          small
          @click="$vuetify.goTo(0, 'smooth')"
        >
          <v-icon>mdi-chevron-up</v-icon>
        </v-btn>
      </v-footer>
    </v-fade-transition>

    <NavigationDrawer
      :is-open-drawer.sync="isOpenDrawer"
      :is-open-dialog.sync="isOpenDialog"
      :dark-mode.sync="darkMode"
    >
      <template #themeIcon>
        {{ themeIcon }}
      </template>
    </NavigationDrawer>

    <AboutDialog
      :is-open-dialog.sync="isOpenDialog"
    />
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import SubtitleScraperMixin from '~/mixins/subtitle-scraper.js'
import UrlInput from '~/components/UrlInput.vue'
import LangSelect from '~/components/LangSelect.vue'
import LangSelectMenu from '~/components/LangSelectMenu.vue'
import NavigationDrawer from '~/components/NavigationDrawer.vue'
import AboutDialog from '~/components/AboutDialog.vue'

export default {
  name: 'DefaultLayout',
  components: {
    UrlInput,
    LangSelect,
    LangSelectMenu,
    NavigationDrawer,
    AboutDialog
  },
  mixins: [
    SubtitleScraperMixin
  ],
  data() {
    return {
      darkMode: false,
      isOpenDrawer: false,
      isOpenDialog: false,
      screenWidth: window.innerWidth,
      isScroll: false,
      scrollOffset: 0
    }
  },
  computed: {
    ...mapGetters(['url', 'selectedLang']),
    themeIcon() {
      return this.darkMode ? 'mdi-weather-night' : 'mdi-weather-sunny'
    },
    bgColor() {
      return this.darkMode ? '#272727' : '#F5F5F5'
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

      this.isScroll = this.scrollOffset < top
      this.scrollOffset = top
    }
  }
}
</script>
