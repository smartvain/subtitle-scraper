export default {
  data() {
    return {
      axiosUrl: '/youtube',
      loading: {
        getLangList: false,
        getSubtitles: false
      }
    }
  },
  methods: {
    async fetchContent(param) {
      return await this.$axios.$get(`${this.axiosUrl}/watch`, {params: {
        ...param,
        app: 'desktop',
        hl: 'en',
        persist_hl: 1
      }});
    },
    async fetchContentFromBaseUrl(captionTrack) {
      const baseUrl = new URL(captionTrack.baseUrl)
      const urlParams = new URLSearchParams(baseUrl.search)
      const params = Object.fromEntries(urlParams.entries())

      return await this.$axios.$get(`${this.axiosUrl}${baseUrl.pathname}`, { params })
    },
    async extractCaptionTracksFromUrl(url) {
      const videoId = this.extractVideoId(url)
      const html = await this.fetchContent({v: videoId})

      return this.extractCaptionTracks(html)
    },
    extractVideoId(url) {
      const perseUrl = new URL(url);

      return perseUrl.searchParams.get('v')
    },
    extractCaptionTracks(html) {
      const regex = /{"captionTracks":.*isTranslatable":(true|false)}]/
      const [match] = regex.exec(html)
      const json = JSON.parse(`${match}}`)

      return json.captionTracks
    },
    extractSubtitlesWithSeconds(xml) {
      xml = xml.replace(/<\?xml version="[\d.]+" encoding=".+" \?><transcript>/, '')
      xml = xml.replace(/<\/transcript>/, '')
      const subtitles = xml.split('</text>')

      return subtitles.map((item, idx) => {
        if (!item) {
          subtitles.splice(idx, 1)
          return false
        }

        const startRegex = /start="([\d.]+)"/
        const start = startRegex.exec(item)
        const durRegex = /dur="([\d.]+)"/
        const dur = durRegex.exec(item)
        item = this.adjustSubtitle(item)

        return {
          text: item,
          start: this.calcTime(start[1]),
          dur: this.calcTime(dur[1])
        }
      }).filter(Boolean)
    },
    calcTime(seconds) {
      let hour = String(Math.floor(seconds / 3600))
      let min  = String(Math.floor(seconds % 3600 / 60))
      let rem  = String(Math.floor(seconds % 60))
      if (hour < 10) { hour = hour.padStart(2, '0') }
      if (min < 10) { min = min.padStart(2, '0') }
      if (rem < 10) { rem = rem.padStart(2, '0') }

      return hour === '00' ? `${min}:${rem}` : `${hour}:${min}:${rem}`
    },
    adjustSubtitle(subtitle) {
      subtitle = subtitle.trim()
      subtitle = subtitle.replace(/<text.+?>/, '')
      subtitle = subtitle.replace(/&amp;/, '&')
      subtitle = subtitle.replace(/&#39;/, "'")

      return subtitle
    },
    filterByLang(captionTracks, lang) {
      const captionTrack = captionTracks.map(item => {
        return item.languageCode === lang ? item : false
      }).filter(Boolean)
      
      return captionTrack.shift()
    },
    async getLangList(url) {
      this.loading.getLangList = true
      
      try {
        const captionTracks = await this.extractCaptionTracksFromUrl(url)
        const langList = captionTracks.map(item => {
          return {
            text: item.name.simpleText,
            code: item.languageCode
          }
        })

        this.$store.commit('setLangList', langList)
      } catch (e) {
        console.log(e.message) // eslint-disable-line no-console
      }

      this.loading.getLangList = false
    },
    async getSubtitles(url, lang) {
      this.loading.getSubtitles = true
      
      try {
        const captionTracks = await this.extractCaptionTracksFromUrl(url)
        const captionTrack = this.filterByLang(captionTracks, lang)
        const xml = await this.fetchContentFromBaseUrl(captionTrack)
        const subtitles = this.extractSubtitlesWithSeconds(xml)
        
        this.$store.commit('setSubtitles', subtitles)

      } catch (e) {
        console.log(e.message) // eslint-disable-line no-console
      }
      
      this.loading.getSubtitles = false
    }
  }
}
