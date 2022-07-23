<template>
  <v-row justify="center">
    <v-col cols="12" sm="9" md="7">
        <transition name="fade">
          <v-card v-if="isSubtitles">
            <SubtitleDisplayer
              class="mt-3"
              @move-weblio="moveWeblio"
            />
          </v-card>
        </transition>

        <vue-typed-js
          v-if="!isSubtitles"
          :strings="['YouTube URL', 'Favorite video', 'Video to study']"
          :loop="true"
          :type-speed="140"
          :back-speed="90"
          class="main-text"
        >
          <transition name="fade">
            <p v-show="delay" class="mx-auto">Hello!<br>Please enter<br><span class="typing"></span></p>
          </transition>
        </vue-typed-js>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'
import SubtitleDisplayer from '~/components/SubtitleDisplayer.vue'

export default {
  name: 'IndexPage',
  components: {
    SubtitleDisplayer,
  },
  data() {
    return {
      delay: false
    }
  },
  computed: {
    ...mapGetters(['subtitles']),
    isSubtitles() {
      return this.subtitles.length > 0
    }
  },
  created() {
    setTimeout(() => {this.delay = true}, 1000)
  },
  methods: {
    moveWeblio(searchWord) {
      window.open(`https://ejje.weblio.jp/content/${searchWord}`, '_blank')
    }
  }
}
</script>

<style lang="scss" scoped>
.main-text > * {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 5rem;
}

.fade-enter-active, .fade-leave-active {
  transition: all 1s ease;
}

.fade-enter, .fade-leave-to {
  transform: translateY(10px);
  opacity: 0;
}
</style>
