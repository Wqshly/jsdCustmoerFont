import axios from '@/request/http'

const getRequestApi = {
  // get
  get (url) {
    return axios.get(url)
  },
  getJson (url) {
    return axios.get(url, {headers: {'Content-Type': 'application/json'}})
  }
}

export default getRequestApi
