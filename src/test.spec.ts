import { OdesliApi } from './OdesliApi'

describe('OdesliApi', () => {
  it('should return right information', async () => {
    const url = 'https://open.spotify.com/track/3FvFaFqlzzDcaEbcuTim2g?si=Xl034nigTxGXoxx7g-xfeQ'
    const response = await OdesliApi.findByUrl(url)
    const spotifyLinkEntity = response.links.find(l => l.provider === 'spotify')
    const googleLinkEntity = response.links.find(l => l.provider === 'google')
    const youtubeLinkEntity = response.links.find(l => l.provider === 'youtube')

    expect(response.odesliUrl).toBe('https://song.link/s/3FvFaFqlzzDcaEbcuTim2g')
    expect(response.userCountry).toBe('US')

    expect(spotifyLinkEntity.entityUniqueId).toBe('SPOTIFY_SONG::3FvFaFqlzzDcaEbcuTim2g')
    expect(spotifyLinkEntity.nativeAppUriDesktop).toBe('spotify:track:3FvFaFqlzzDcaEbcuTim2g')
    expect(spotifyLinkEntity.url).toBe('https://open.spotify.com/track/3FvFaFqlzzDcaEbcuTim2g')

    expect(googleLinkEntity.entityUniqueId).toBe('GOOGLE_SONG::Tkwln6nshj6luecyy2jtcwp33zu')
    expect(googleLinkEntity.url).toBe(
      'https://play.google.com/music/m/Tkwln6nshj6luecyy2jtcwp33zu?signup_if_needed=1'
    )
    expect(youtubeLinkEntity).toBe(undefined)
  })
})

describe('Telegram', () => {
  it('should parse telegram message', async () => {})
})
