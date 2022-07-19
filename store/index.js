export const state = () => ({
  videoId: null,
  subtitle: null
})

export const getters = {
  videoId: state => state.videoId,
  subtitle: state => state.subtitle
}

export const mutations = {
  setVideoId: (state, videoId) => (state.videoId = videoId),
  setSubtitle: (state, subtitle) => (state.subtitle = subtitle)
}