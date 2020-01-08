import axios from '@/request/http'

const postRequestApi = {
  // post
  post (url, param) {
    return axios.post(url, param)
  },
  postJson (url, param) {
    return axios.post(url, param, {headers: {'Content-Type': 'application/json'}})
  }
}

export default postRequestApi
