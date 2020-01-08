import axios from '@/request/http'

const requestApi = {
  // get
  get (url) {
    return axios.get(url)
  },
  getJson (url) {
    return axios.get(url, {headers: {'Content-Type': 'application/json'}})
  },
  // post
  post (url, param) {
    return axios.post(url, param)
  },
  postJson (url, param) {
    return axios.post(url, param, {headers: {'Content-Type': 'application/json'}})
  }
}

export default requestApi
