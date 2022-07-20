<template>
  <v-select
    v-model="scopedSelectedLang"
    dense
    hide-details
    item-text="text"
    item-value="code"
    :items="langList"
    :loading="loading"
    :no-data-text="noDataText"
    :placeholder="placeholder"
  >
    <template #no-data>
      <div v-if="loading" class="text-center">
        <v-progress-circular color="primary" indeterminate/>
      </div>

      <div v-else class="text-center">
        <span class="grey--text">{{ noDataText }}</span>
      </div>
    </template>
  </v-select>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    loading: {
      type: Boolean,
      default: () => false
    }
  },
  data() {
    return {
      noDataText: 'URLが入力されていません。',
      placeholder: '言語を選択'
    }
  },
  computed: {
    ...mapGetters(['langList', 'selectedLang']),
    scopedSelectedLang: {
      get() {
        return this.selectedLang
      },
      set(string) {
        this.$store.commit('setSelectedLang', string)
      }
    }
  }
}
</script>