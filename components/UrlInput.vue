<template>
  <ValidationProvider
    name="YouTube-URL"
    rules="is_youtube_url|required"
    style="width: 100%"
  >
    <v-text-field
      v-model="scopedUrl"
      dense
      clearable
      hide-details
      solo
      :background-color="bgColor"
      :flat="!isFocus"
      :placeholder="placeholder"
      @blur="isFocus = false; $emit('get-lang-list', scopedUrl);"
      @focus="isFocus = true"
    />
  </ValidationProvider>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      isFocus: false,
      placeholder: this.$t('urlInput.placeholder'),
    }
  },
  computed: {
    ...mapGetters(['url']),
    scopedUrl: {
      get() {
        return this.url
      },
      set(string) {
        this.$store.commit('setUrl', string)
      }
    },
    bgColor() {
      const color = this.$vuetify.theme.dark ? 'blue-grey darken-2' : 'blue-grey lighten-5'
      return this.isFocus ? color : null
    }
  }
}
</script>
