import { extend, localize, ValidationObserver, ValidationProvider } from 'vee-validate'
import { required } from 'vee-validate/dist/rules'
import Vue from 'vue'
import en from 'vee-validate/dist/locale/en.json'
import customEn from '~/locales/en.json'

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
localize('en', en)

extend('required', required)

extend('is_youtube_url', {
  message: customEn.validation.isYoutubeUrl,
  validate(string) {
    return string.match(/www.youtube.com/g)
  }
})

extend('required_selected', {
  params: ['selectedLang'],
  message: en.messages.required,
  validate(value, { selectedLang }) {
    return !!selectedLang
  }
})
