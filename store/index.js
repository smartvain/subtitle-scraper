export const state = () => ({
  url: '',
  langList: [],
  selectedLang: '',
  subtitles: [],
})

export const getters = {
  url: state => state.url,
  langList: state => state.langList,
  selectedLang: state => state.selectedLang,
  subtitles: state => state.subtitles
}

export const mutations = {
  setUrl: (state, url) => (state.url = url),
  setLangList: (state, langList) => (state.langList = langList),
  setSelectedLang: (state, selectedLang) => (state.selectedLang = selectedLang),
  setSubtitles: (state, subtitles) => (state.subtitles = subtitles)
}
