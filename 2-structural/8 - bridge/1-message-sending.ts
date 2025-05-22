// 1. Implementation

interface Channel {
  sendMessage (text: string, destination: string): void
}

class SmsChannel implements Channel {
  async sendMessage (text: string, destination: string) {
    console.log(`Send SMS message: "${text}" to ${destination}`)
  }
}

class TelegramChannel implements Channel {
  async sendMessage (text: string, destination: string) {
    console.log(`Send Telegram message: "${text}" to ${destination}`)
  }
}

class WhatsAppChannel implements Channel {
  async sendMessage (text: string, destination: string) {
    console.log(`Send WhatsApp message: "${text}" to ${destination}`)
  }
}

// 2. Abstraction

class MessageService {
  constructor (protected channel: Channel) {}

  async send (text: string, destination: string) {
    return this.channel.sendMessage(text, destination)
  }
}

// 3. Usage

const smsChannel = new SmsChannel()
const telegramChannel = new TelegramChannel()
const whatsAppChannel = new WhatsAppChannel()

const smsService = new MessageService(smsChannel)
await smsService.send('Hi, call be back please', '+79991234567')
