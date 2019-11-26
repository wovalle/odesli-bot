import { MessageBuilder, MessageBuilderProps } from './MessageBuilder'
import axios from 'axios'

type ReplyMarkup = {
  force_reply?: boolean
}

type TelegramHttpPayload = {
  chat_id: string
  text: string
  parse_mode?: ParseMode
  reply_to_message_id?: string
  reply_markup?: ReplyMarkup
}

export enum ParseMode {
  Markdown = 'Markdown',
  HTML = 'HTML'
}

export class TelegramService {
  constructor(private token: string) {}

  private buildUrl = (method: string) => `https://api.telegram.org/bot${this.token}/${method}`

  buildMessage(text: string) {
    return new MessageBuilder(this, text)
  }

  async sendRawMessage(props: MessageBuilderProps): Promise<void> {
    const url = this.buildUrl('sendMessage')
    const payload: TelegramHttpPayload = {
      chat_id: props.chatId,
      text: props.text,
      reply_markup: {}
    }

    if (props.parseMode) {
      payload.parse_mode = props.parseMode
    }

    if (props.forceReply) {
      payload.reply_markup.force_reply = true
    }

    if (props.prepend) {
      payload.text = `${props.prepend}${payload.text}`
    }

    if (props.append) {
      payload.text = `${payload.text}${props.append}`
    }

    if (props.activator) {
      payload.text = `|${props.activator}| ${payload.text}`
    }

    if (props.replyTo) {
      payload.reply_to_message_id = props.replyTo
    }

    await axios.post(url, payload)
  }
}
