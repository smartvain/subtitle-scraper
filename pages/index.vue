<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="9" md="7">
      <v-card v-if="subtitles.length > 0">
        <SubtitleDisplayer
          class="mt-3"
          @move-weblio="moveWeblio"
        />
      </v-card>

      <vue-typed-js
        :strings="['YouTube URL', 'Favorite video', 'Video to study']"
        :loop="true"
        :type-speed="140"
        :back-speed="90"
        class="main-text"
      >
        <p>Hello!<br>Please enter<br><span class="typing"></span></p>
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
  computed: {
    ...mapGetters(['subtitles'])
  },
  methods: {
    moveWeblio(searchWord) {
      window.open(`https://ejje.weblio.jp/content/${searchWord}`, '_blank')
    }
  }
}
</script>
