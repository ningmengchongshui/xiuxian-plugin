import md5 from 'md5'
import { plugin, puppeteer } from '../../../import.js'
import { helpData } from '../../model/index.js'
import Help from '../../model/image/help.js'
export class BotHelp extends plugin {
  constructor() {
    super({
      name: 'BotHelp',
      dsc: '修仙帮助',
      event: 'message',
      priority: 400,
      rule: [
        {
          reg: /^(#|\/)修仙帮助$/,
          fnc: 'Xiuxianhelp'
        },
        {
          reg: /^(#|\/)修仙管理$/,
          fnc: 'adminsuper'
        },
        {
          reg: /^(#|\/)宗门管理$/,
          fnc: 'AssociationAdmin'
        },
        {
          reg: /^(#|\/)修仙扩展$/,
          fnc: 'Xiuxianhelpcopy'
        },
        {
          reg: /^(#|\/)师徒帮助$/,
          fnc: 'shituhelp'
        }
      ]
    })
  }

  async Xiuxianhelpcopy(e) {
    let data = await Help.gethelpcopy()
    if (!data) return false
    let img = await this.cache(data)
    await e.reply(img)
  }
  async Xiuxianhelp(e) {
    let data = await Help.get()
    if (!data) return false
    let img = await this.cache(data)
    await e.reply(img)
  }

  async adminsuper(e) {
    let data = await Help.setup()
    if (!data) return false
    let img = await this.cache(data)
    await e.reply(img)
  }

  async AssociationAdmin(e) {
    let data = await Help.Association()
    if (!data) return false
    let img = await this.cache(data)
    await e.reply(img)
  }

  async shituhelp(e) {
    e.reply('维护中')
    return false
  }

  async cache(data) {
    let tmp = md5(JSON.stringify(data))
    if (helpData.md5 == tmp) return helpData.img
    helpData.img = await puppeteer.screenshot('help', data)
    helpData.md5 = tmp
    return helpData.img
  }
}