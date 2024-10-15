import staticBaeUrl from './staticBaeUrl'
import axios from 'axios'

export default function requestStaticFile(path: string) {
  return axios({
    baseURL: '',
    url: staticBaeUrl(path)
  })
}