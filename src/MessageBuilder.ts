import { ParseMode, TelegramService } from './TelegramService'

export type MessageBuilderProps = {
  chatId?: string
  text?: string
  forceReply?: boolean
  parseMode?: ParseMode
  replyTo?: string
  activator?: string
  prepend?: string
  append?: string
}

export class MessageBuilder {
  protected props: MessageBuilderProps

  constructor(private service: TelegramService, text: string) {
    this.props = {}
    this.props.text = text
  }

  to(chatId: string) {
    this.props.chatId = chatId
    return this
  }

  forceReply() {
    this.props.forceReply = true
    return this
  }

  asMarkDown() {
    this.props.parseMode = ParseMode.Markdown
    return this
  }

  asHTML() {
    this.props.parseMode = ParseMode.HTML
    return this
  }

  replyTo(messageId: string) {
    this.props.replyTo = messageId
    return this
  }

  withActivator(activator: string) {
    this.props.activator = activator
    return this
  }

  prepend(text: string) {
    this.props.prepend = text
    return this
  }

  append(text: string) {
    this.props.append = text
    return this
  }

  send() {
    return this.service.sendRawMessage(this.props)
  }
}
