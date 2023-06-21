import { BotApi, GameApi, plugin } from '../../model/api/index.js'
export class Boxadminaction extends plugin {
  constructor() {
    super({
      rule: [
        { reg: /^(#|\/)修仙更新$/, fnc: 'allForcecheckout' },
        { reg: /^(#|\/)修仙删除数据$/, fnc: 'deleteRedis' },
        { reg: /^(#|\/)修仙删除世界$/, fnc: 'deleteAllusers' },
        { reg: /^(#|\/)修仙复原.*$/, fnc: 'dataRecovery' }
      ]
    })
  }

  async allForcecheckout(e) {
    if (!e.isMaster) return false
    if (!this.verify(e)) return false
    BotApi.Exec.execStart({ cmd: 'git  pull', e })
    return false
  }

  async deleteAllReids(e) {
    if (!e.isMaster) return false
    if (!this.verify(e)) return false
    GameApi.Wrap.deleteAllReids()
    e.reply('删除完成')
    return false
  }

  async deleteAllusers(e) {
    if (!e.isMaster) return false
    if (!this.verify(e)) return false
    GameApi.Listdata.write('life', 'playerLife', {})
    GameApi.Wrap.deleteAllReids()
    e.reply('删除完成')
    return false
  }

  async dataRecovery(e) {
    if (!e.isMaster) return false
    if (!this.verify(e)) return false
    BotApi.obtainingImages({
      path: 'msg',
      name: 'msg',
      data: {
        msg: GameApi.Schedule.backupRecovery({
          name: e.msg.replace(/^(#|\/)修仙复原/, '')
        })
      }
    })
    return false
  }
}
