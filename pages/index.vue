<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-col>
          <v-btn @click="getCaption()">get caption</v-btn>
        </v-col>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      url: null,
      html: null
    }
  },
  methods: {
    async getCaption() {
      const html = await this.fetchUrlContent()
      const regex = /"captionTracks":.*isTranslatable":(true|false)}]/;
      const [match] = regex.exec(html);
      
      console.log([match])
    },
    async fetchUrlContent() {
      return await this.$axios.$get('/api/watch', {params: {
        v: 'ESUhsWGdpDQ'
      }})
    }
  }
}
</script>
