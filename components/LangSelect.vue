<template>
  <ValidationProvider
    name="Selected-lang"
    rules="required"
    style="width: 100%"
  >
    <v-select
      v-model="scopedSelectedLang"
      dense
      hide-details
      item-text="text"
      item-value="code"
      :items="langList"
      :loading="loading"
      :placeholder="$t('langSelect.placeholder')"
    >
      <template #no-data>
        <div v-if="loading" class="text-center">
          <v-progress-circular color="primary" indeterminate/>
        </div>

        <div v-else class="text-center">
          <span class="grey--text ma-2">
            {{ $t('langSelect.noDataText') }}
          </span>
        </div>
      </template>
    </v-select>
  </ValidationProvider>
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