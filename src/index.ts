import * as functions from 'firebase-functions'
import { Update } from 'telegram-typings'

import { TelegramService } from './TelegramService'
import { OdesliApi } from './OdesliApi'

const botToken = '<insert your token here>'
const telegramService = new TelegramService(botToken)

const extractLinkEntity = (url: string) => {
  const providers = [
    { id: 'spotify', pattern: 'open.spotify.com' },
    { id: 'google', pattern: 'play.google.com/music' }
  ]

  return providers.find(p => p.pattern.match(url))
}

export const onTelegramUpdateFn = functions.https.onRequest(async (req, res) => {
  const update: Update = req.body

  if (!update) {
    return res.status(400).send('`message` parameter is required')
  }

  try {
    const linkProvider = extractLinkEntity(update.message.text)

    if (!linkProvider) {
      throw 'not a link'
    }

    const linkResponse = await OdesliApi.findByUrl(update.message.text)
    const links = linkResponse.links.filter(l => l.provider !== linkProvider.id)

    const linksToMd = links.reduce((acc, { provider, url }) => {
      return [acc, `[${provider}](${url})`].join(', ')
    }, '')

    await telegramService
      .buildMessage(linksToMd)
      .replyTo(update.message.from.id.toString())
      .asMarkDown()
      .send()

    return res.send({ ok: true })
  } catch (error) {
    return res.status(200).send({ ok: false })
  }
})
