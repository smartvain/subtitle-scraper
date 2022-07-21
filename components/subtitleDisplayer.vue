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
            clearable
            dense
            :placeholder="$t('subtitleDisplayer.searchField.placeholder')"
          />
        </v-col>
        <v-col cols="1" class="px-0">
          <v-btn
            icon
            small
            :disabled="!searchWord"
            @click="$emit('move-weblio', searchWord)"
          >
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </template>

    <template #[`item.text`]="{ item }">
      <span
        v-for="(word, idx) in splitSentence(item.text)"
        :key="idx"
        class="subtitle-word"
        @click="searchWord = word"
      >
        {{ word }}
      </span>
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
  },
  methods: {
    splitSentence(sentence) {
      return sentence.split(' ')
    }
  }
}
</script>

<style lang="scss" scoped>
.subtitle-word {
  transition: .3s;
  &:hover {
    color: #64B5F6;
  }
}
</style>