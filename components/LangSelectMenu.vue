<template>
  <div>
    <v-btn
      icon
      small
      :loading="loading"
      @click="isOpenMenu = !isOpenMenu"
    >
      <v-icon>mdi-translate</v-icon>
    </v-btn>

    <v-menu
      v-model="isOpenMenu"
      offset-y
    >
      <v-list dense>
        <v-list-item-group v-model="scopedSelectedLang">
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
      </v-list>
    </v-menu>
  </div>
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