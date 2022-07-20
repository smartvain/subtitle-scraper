<template>
  <ValidationProvider
    v-slot="{ errors }"
    mode="passive"
    name="URL"
    rules="is_youtube_url"
    style="width: 100%"
  >
    <v-text-field
      v-model="url"
      dense
      clearable
      hide-details
      solo
      :background-color="bgColor"
      :error-messages="errors"
      :flat="!isFocus"
      :placeholder="placeholder"
      @blur="isFocus = false; $emit('get-lang-list', url);"
      @focus="isFocus = true"
    />
  </ValidationProvider>
</template>

<script>
export default {
  data: () => ({
    isFocus: false,
    placeholder: '字幕表示したいYouTube動画のURLを入力して下さい。',
    url: ''
  }),
  computed: {
    bgColor() {
      const color = this.$vuetify.theme.dark ? 'blue-grey darken-2' : 'blue-grey lighten-5'
      return this.isFocus ? color : null
    }
  },
  created() {
    this.url = 'https://www.youtube.com/watch?v=ouf7rXDlkDk'
  }
}
</script>