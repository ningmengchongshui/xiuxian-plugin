import gameUer from '../box/index.js'
import { REDIS } from './redis.js'

/** 自定义冷却反馈 */
const MYCD = {
  0: '攻击',
  1: '降妖',
  2: '闭关',
  3: '改名',
  4: '道宣',
  5: '赠送',
  6: '突破',
  7: '破体',
  8: '转世',
  9: '行为',
  10: '击杀',
  11: '决斗',
  12: '修行',
  13: '渡劫',
  99: 'action'
}

const ReadiName = 'xiuxian@2.1'

class Wrap {
  /**
   * 删除redis
   * @param {*} key
   */
  deleteReids(key) {
    REDIS.deleteReids(key)
  }

  /**
   * 设置redis
   * @param {*} UID 用户
   * @param {*} CDID 类型
   * @param {*} nowTime 现在的时间：毫秒
   * @param {*} CDTime 要锁定的时间：分
   */
  setRedis(UID, CDID, nowTime, CDTime) {
    REDIS.set(`${ReadiName}:${UID}:${CDID}`, {
      val: nowTime,
      expire: CDTime * 600000
    })
  }

  /**
   * 得到redis
   * @param {*} UID
   * @param {*} CDID
   * @returns
   */
  getRedis(UID, CDID) {
    return REDIS.get(`${ReadiName}:${UID}:${CDID}`)
  }

  /**
   * @returns
   */
  cooling({ UID, CDID }) {
    /**
     * 当时的时间
     * 要锁定的时间
     */
    const { val, expire } = REDIS.get(`${ReadiName}:${UID}:${CDID}`)
    // 如果当时设置了时间
    if (val) {
      // 现在的时间
      const NowTime = new Date()
      if (NowTime >= val + expire) {
        // 过期了,需要清除
        REDIS.del(`${ReadiName}:${UID}:${CDID}`)
        return {
          state: 2000,
          msg: '通过'
        }
      }
      // 剩余时间计算
      const theTime = val + expire - NowTime
      const time = {
        h: 0,
        m: 0,
        s: 0
      }
      // 格式转换
      time.h = Math.floor(theTime / 60 / 60)
      time.h = time.h < 0 ? 0 : time.h
      time.m = Math.floor((theTime - time.h * 60 * 60) / 60)
      time.m = time.m < 0 ? 0 : time.m
      time.s = Math.floor(theTime - time.h * 60 * 60 - time.m * 60)
      time.s = time.s < 0 ? 0 : time.s
      return {
        state: 4001,
        msg: `${MYCD[CDID]}冷却${time.h}h${time.m}m${time.s}s`,
        CDMSG: `${MYCD[CDID]}冷却${time.h}h${time.m}m${time.s}s`
      }
    }
    // 没设置时间
    return {
      state: 2000,
      msg: '通过'
    }
  }

  /**
   * 设置action
   * @param {*} UID
   * @param {*} actionObject
   */
  setAction(UID, actionObject) {
    REDIS.set(`${ReadiName}:${UID}:${MYCD[99]}`, actionObject)
  }

  /**
   * 得到action
   * @param {*} UID
   * @returns
   */
  getAction(UID) {
    return REDIS.get(`${ReadiName}:${UID}:${MYCD[99]}`)
  }

  /**
   * 删除action
   * @param {*} param0
   */
  deleteAction({ UID }) {
    REDIS.del(`${ReadiName}:${UID}:${MYCD[99]}`)
  }

  /**
   * @returns
   */
  GoMini(UID) {
    const action = REDIS.get(`${ReadiName}:${UID}:${MYCD[99]}`)
    if (action) {
      return {
        state: 4001,
        msg: `${action.actionName}中...`
      }
    }
    return {
      state: 2000,
      smg: '通过'
    }
  }

  /**
   * 行为检测
   * @returns 若存在对象MSG则为flase
   */

  Go(UID) {
    // 得到val
    const action = REDIS.get(`${ReadiName}:${UID}:${MYCD[99]}`)
    if (action) {
      // 存在
      return {
        state: 4001,
        msg: `${action.actionName}中...`
      }
    }
    const player = gameUer.userMsgAction({
      NAME: UID,
      CHOICE: 'user_battle'
    })
    if (player.nowblood <= 1) {
      return {
        state: 4001,
        msg: '血量不足'
      }
    }
    return {
      sate: 2000,
      msg: '成功'
    }
  }
}
export default new Wrap()