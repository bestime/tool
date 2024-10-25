import { dataCache } from '@bestime/utils_base'
import staticBaeUrl from './staticBaeUrl'
import axios, { type AxiosResponse } from 'axios'

export default async function requestStaticFile(path: string):Promise<AxiosResponse<any, any>> {
  const cache = dataCache(path)
  if(cache.isExist()) {
    return new Promise(function (resolve) {
      cache.get(resolve)
    })
  }
  return axios({
    baseURL: '',
    url: staticBaeUrl(path)
  }).then(function (res) {
    cache.set(res)
    return res;
  })
}