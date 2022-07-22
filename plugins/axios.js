export default ({ $axios, $toast }) => {
  $axios.onError(error => {
    const code = error.response.status

    if (code >= 400 && code < 500) {
      $toast.error(`${code}: An unexpected error has occurred. Please contact the developer.`)
    } else {
      $toast.error(`${code}: An unexpected error has occurred.`)
    }
  })
}