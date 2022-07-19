<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import SubtitleScraperMixin from '~/mixins/subtitle-scraper.js'

export default {
  mixins: [ SubtitleScraperMixin ],
  name: 'IndexPage',
}
</script>
