import { BotApi, GameApi, plugin } from '../../model/api/index.js'
export class BoxInformation extends plugin {
  constructor() {
    super({
      rule: [
        { reg: /^(#|\/)基础信息$/, fnc: 'showUserMsg' },
        { reg: /^(#|\/)面板信息$/, fnc: 'showQquipment' },
        { reg: /^(#|\/)功法信息$/, fnc: 'showTalent' }
      ]
    })
  }

  async showUserMsg(e) {
    if (!this.verify(e)) return false
    const UID = e.user_id
    if (!GameApi.Player.getUserLifeSatus(UID)) {
      e.reply('已仙鹤')
      return false
    }
    const { path, name, data } = GameApi.Information.userDataShow(e.user_id)
    const isreply = e.reply(await BotApi.obtainingImages({ path, name, data }))
    BotApi.Robot.surveySet({ e, isreply })
    return false
  }

  async showQquipment(e) {
    if (!this.verify(e)) return false
    const UID = e.user_id
    if (!GameApi.Player.getUserLifeSatus(UID)) {
      e.reply('已仙鹤')
      return false
    }
    const { path, name, data } = GameApi.Information.userEquipmentShow(e.user_id)
    const isreply = e.reply(await BotApi.obtainingImages({ path, name, data }))
    BotApi.Robot.surveySet({ e, isreply })
    return false
  }

  async showTalent(e) {
    if (!this.verify(e)) return false
    const UID = e.user_id
    if (!GameApi.Player.getUserLifeSatus(UID)) {
      e.reply('已仙鹤')
      return false
    }
    const { path, name, data } = GameApi.Information.userTalentShow(e.user_id)
    const isreply = e.reply(await BotApi.obtainingImages({ path, name, data }))
    BotApi.Robot.surveySet({ e, isreply })
    return false
  }
}