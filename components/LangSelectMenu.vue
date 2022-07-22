<template>
  <ValidationProvider
    name="Selected-lang"
    :rules="`required_selected:${selectedLang}`"
    style="width: 100%"
  >
    <v-menu
      v-model="isOpenMenu"
      offset-y
    >
      <template #activator="{ on, attrs }">
        <v-btn
          icon
          small
          :loading="loading"
          v-bind="attrs"
          v-on="on"
          @click="isOpenMenu = !isOpenMenu"
        >
          <v-icon>mdi-translate</v-icon>
        </v-btn>
      </template>

      <v-list dense>
        <v-list-item-group
          v-if="langList.length > 0"
          v-model="scopedSelectedLang"
        >
          <v-list-item
            v-for="(lang, idx) in langList"
            :key="idx"
            :value="lang.code"
          >
            <v-list-item-content>
              <v-list-item-title>{{ lang.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>

        <v-list-item v-else>
          <v-list-item-content>
            <v-list-item-title class="grey--text">
              {{ $t('langSelectMenu.noDataText') }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>
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
  data() {
    return {
      isOpenMenu: false,
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

<style>

</style>