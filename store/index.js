export const state = () => ({
  // url: '',
  langList: [],
  selectedLang: '',
  subtitles: [],
  url: 'https://www.youtube.com/watch?v=ouf7rXDlkDk',
  // langList: [
  //   { "text": "インドネシア語", "code": "id" },
  //   { "text": "スペイン語 (ラテンアメリカ)", "code": "es-419" },
  //   { "text": "ポルトガル語 (ブラジル)", "code": "pt-BR" },
  //   { "text": "英語", "code": "en" },
  //   { "text": "韓国語", "code": "ko" },
  //   { "text": "中国語 (簡体字)", "code": "zh-Hans" },
  //   { "text": "中国語 (繁体字)", "code": "zh-Hant" },
  //   { "text": "日本語", "code": "ja" }
  // ],
  // selectedLang: 'en',
  // subtitle: []
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
