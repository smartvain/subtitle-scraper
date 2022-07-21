<template>
  <v-data-table
    :headers="headers"
    :items="subtitles"
    :items-per-page="-1"
    :search="searchWord"
    fixed-header
  >
    <template #top>
      <v-row justify="center">
        <v-col cols="10">
          <v-text-field
            v-model="searchWord"
            placeholder="search in subtitles"
            dense clearable
          />
        </v-col>
        <v-col cols="1" class="px-0">
          <v-btn
            icon
            :disabled="!searchWord"
            @click="$emit('move-weblio', searchWord)"
          >
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </template>
  </v-data-table>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      headers: [
        { text: 'start', value: 'start' },
        { text: 'subtitle', value: 'text' }
      ],
      searchWord: ''
    }
  },
  computed: {
    ...mapGetters(['subtitles'])
  }
}
</script>

<style>

</style>