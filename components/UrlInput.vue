<template>
  <ValidationProvider
    v-slot="{ errors }"
    mode="passive"
    name="URL"
    rules="is_youtube_url"
    style="width: 100%"
  >
    <v-text-field
      v-model="scopedUrl"
      dense
      clearable
      hide-details
      solo
      :background-color="bgColor"
      :error-messages="errors"
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
      placeholder: '字幕表示したいYouTube動画のURLを入力して下さい。',
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