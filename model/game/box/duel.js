import GameUser from './index.js'
import listdata from '../data/listdata.js'
import GamePublic from '../public/index.js'
import GameBattle from '../public/battel.js'
import defset from '../data/defset.js'
import { GameApi } from '../../api/index.js'
class duel {
  getDuel = ({ e, UIDA, UIDB }) => {
    if (!GameUser.getUID({ UID: UIDB })) {
      return `查无此人`
    }
    if (!GameUser.existUserSatus({ UID: UIDA }) || !GameUser.existUserSatus({ UID: UIDB })) {
      return `已仙鹤`
    }
    const { MSG } = GamePublic.Go({ UID: UIDA })
    if (MSG) {
      return `${MSG}`
    }
    const CDID = '11'
    const now_time = new Date().getTime()
    const cf = defset.getConfig({ app: 'parameter', name: 'cooling' })
    const CDTime = cf.CD.Attack ? cf.CD.Attack : 5

    const { CDMSG } = GamePublic.cooling({ UID: UIDA, CDID })
    if (CDMSG) {
      return `${CDMSG}`
    }
    const actionA = listdata.controlAction({
      NAME: UIDA,
      CHOICE: 'user_action'
    })
    const actionB = listdata.controlAction({
      NAME: UIDB,
      CHOICE: 'user_action'
    })
    if (actionA.region != actionB.region) {
      return `此地未找到此人`
    }
    if (actionA.address == 1) {
      const najie_thing = GameUser.userBagSearch({
        UID: UIDA,
        name: '决斗令'
      })
      if (!najie_thing) {
        return `[修仙联盟]普通卫兵:城内不可出手!`
      }
      GameUser.userBag({
        UID: UIDA,
        name: najie_thing.name,
        ACCOUNT: -1
      })
    }
    GameApi.GamePublic.setRedis(UIDA, CDID, now_time, CDTime)
    const Level = listdata.controlAction({
      NAME: UIDA,
      CHOICE: 'user_level'
    })
    Level.prestige += 1
    listdata.controlAction({
      NAME: UIDA,
      CHOICE: 'user_level',
      DATA: Level
    })
    const user = {
      a: UIDA,
      b: UIDB,
      c: UIDA
    }
    user.c = GameBattle.battle({ e, A: UIDA, B: UIDB })
    const LevelB = listdata.controlAction({
      NAME: UIDB,
      CHOICE: 'user_level'
    })
    const P = Math.floor(Math.random() * (99 - 1) + 1)
    const MP = LevelB.prestige * 10 + Number(50)
    if (P <= MP) {
      if (user.c != UIDA) {
        user.c = UIDA
        user.a = UIDB
        user.b = user.c
      }
      let bagB = listdata.controlAction({
        NAME: user.b,
        CHOICE: 'user_bag'
      })
      if (bagB.thing.length != 0) {
        const thing = GamePublic.Anyarray({ ARR: bagB.thing })
        bagB.thing = bagB.thing.filter((item) => item.name != thing.name)
        listdata.controlAction({
          NAME: user.b,
          CHOICE: 'user_bag',
          DATA: bagB
        })
        GameUser.userBag({
          UID: user.a,
          name: thing.name,
          ACCOUNT: thing.acount
        })
        return `${user.a}夺走了[${thing.name}]*${thing.acount}`
      }
    }
    return `${user.a}战胜了${user.b}`
  }
}
export default new duel()
