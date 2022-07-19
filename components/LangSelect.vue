<template>
  <v-select
    v-model="selectLang"
    dense
    item-text="text"
    item-value="value"
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
export default {
  props: {
    langList: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: () => false
    }
  },
  data() {
    return {
      selectLang: '',
      noDataText: 'URLが入力されていません。',
      placeholder: '言語を選択'
    }
  }
}
</script>