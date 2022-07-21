<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <div>url: {{ url }}</div>
        <br>
        <div>langList: {{ langList }}</div>
        <br>
        <div>selectedLang: {{ selectedLang }}</div>
        <br>
        <div>subtitles: {{ subtitles }}</div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'
import SubtitleScraperMixin from '~/mixins/subtitle-scraper.js'

export default {
  mixins: [ SubtitleScraperMixin ],
  name: 'IndexPage',
  computed: {
    ...mapGetters(['url', 'langList', 'selectedLang', 'subtitles'])
  }
}
</script>
