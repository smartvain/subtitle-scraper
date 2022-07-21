<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <!-- <div>url: {{ url }}</div>
        <br>
        <div>langList: {{ langList }}</div>
        <br>
        <div>selectedLang: {{ selectedLang }}</div>
        <br> -->
        <SubtitleDisplayer @move-weblio="moveWeblio"/>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'
import SubtitleDisplayer from '~/components/subtitleDisplayer.vue'

export default {
  name: 'IndexPage',
  components: {
    SubtitleDisplayer
  },
  computed: {
    ...mapGetters(['url', 'langList', 'selectedLang'])
  },
  methods: {
    moveWeblio(searchWord) {
      window.open(`https://ejje.weblio.jp/content/${searchWord}`, '_subwindow')
    }
  }
}
</script>
