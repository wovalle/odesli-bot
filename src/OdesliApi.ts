import axios from 'axios'
import { OdesliLinksResponse, Platform } from './types'

export const platformWhitelist: Platform[] = ['spotify', 'google']

const baseUrl = 'https://api.song.link/v1-alpha.1/links?url='

export const OdesliApi = {
  findByUrl: async (url: string) => {
    const queryUrl = `${baseUrl}${decodeURIComponent(url)}`
    const response: OdesliLinksResponse = await axios.get(queryUrl).then(a => a.data)

    const links = Object.entries(response.linksByPlatform)
      .filter(t => platformWhitelist.includes(t[0] as Platform))
      .map(([provider, data]) => ({
        provider,
        ...data
      }))

    return {
      odesliUrl: response.pageUrl,
      userCountry: response.userCountry,
      links
    }
  }
}
