import { GameApi, plugin } from '../../model/api/index.js'
export class BoxadminConfig extends plugin {
  constructor() {
    super({
      rule: [
        { reg: /^(#|\/)修仙开启.*$/, fnc: 'boxaSwitchOpen' },
        { reg: /^(#|\/)修仙关闭.*$/, fnc: 'boxaSwitchOff' },
        { reg: /^(#|\/)修仙配置更改.*$/, fnc: 'updataConfig' },
        { reg: /^(#|\/)修仙重置配置$/, fnc: 'updataConfigRe' },
        { reg: /^(#|\/)凡人修仙启动$/, fnc: 'boxStart' },
        { reg: /^(#|\/)凡人修仙停止$/, fnc: 'boxStop' }
      ]
    })
  }

  async boxStart(e) {
    if (!e.isMaster) return false
    if (!e.isGroup || e.user_id == 80000000) return false
    e.reply(GameApi.Defset.startGame(e.group_id, e.group_name))
    return false
  }

  async boxStop(e) {
    if (!e.isMaster) return false
    if (!e.isGroup || e.user_id == 80000000) return false
    e.reply(GameApi.Defset.stopGame(e.group_id, e.group_name))
    return false
  }

  async boxaSwitchOpen(e) {
    if (!e.isMaster) return false
    if (!this.verify(e)) return false
    const name = e.msg.replace(/^(#|\/)修仙开启/, '')
    e.reply(GameApi.Defset.updataSwich({ name, swich: true }))
    return false
  }

  async boxaSwitchOff(e) {
    if (!e.isMaster) return false
    if (!this.verify(e)) return false
    const name = e.msg.replace(/^(#|\/)修仙关闭/, '')
    e.reply(GameApi.Defset.updataSwich({ name, swich: false }))
    return false
  }

  async updataConfig(e) {
    if (!e.isMaster) return false
    if (!this.verify(e)) return false
    const [name, size] = e.msg.replace(/^(#|\/)修仙配置更改/, '').split('*')
    e.reply(GameApi.Defset.updataConfig({ name, size }))
    return false
  }

  async reUpdataConfig(e) {
    if (!e.isMaster) return false
    if (!this.verify(e)) return false
    GameApi.Createdata.recreateConfig()
    e.reply('配置已重置')
    return false
  }
}
