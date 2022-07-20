export default {
  data() {
    return {
      axiosUrl: '/api/watch',
      loading: {
        getLangList: false,
        getSubtitle: false
      }
    }
  },
  methods: {
    // 外部リクエストを送ってyoutubeのhtmlを取得
    async fetchContent(url) {
      return await this.$axios.$get(this.axiosUrl, {params: {
        v: this.extractVideoId(url),
        app: 'desktop'
      }});
    },
    // URLからビデオIDパラメータを抜き取る
    extractVideoId(url) {
      const perseUrl = new URL(url);
      const videoId = perseUrl.searchParams.get('v');
      
      return videoId;
    },
    // htmlからキャプショントラックを取得する
    extractCaptionTracks(html) {
      const regex = /{"captionTracks":.*isTranslatable":(true|false)}]/;
      const [match] = regex.exec(html);
      const json = JSON.parse(`${match}}`);

      return json.captionTracks;
    },
    // 言語リストを取得する
    async getLangList(url) {
      this.loading.getLangList = true
      
      try {
        const html = await this.fetchContent(url)
        const captionTracks = this.extractCaptionTracks(html)
        
        this.$store.commit('setLangList', captionTracks.map(item => {
          return {
            text: item.name.simpleText,
            code: item.languageCode
          }
        }))
      } catch (e) {
        console.log(e.message)
      }

      this.loading.getLangList = false
    },
    getSubtitle() {
      this.$store.commit('setSubtitle', "It's working normally")
    }
  }
}