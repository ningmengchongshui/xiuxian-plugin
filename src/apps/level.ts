import component from '../image/index.js'
import {
  LEVEL_PROBABILITY_RANGE,
  LEVEL_SIZE,
  LEVEL_UP_LIMIT
} from '../model/config.js'
import { getLevelById } from '../model/level.js'
import { getRandomNumber, getUserName } from '../model/utils.js'

import { Messages, segment } from 'yunzai/core'
import { DB } from '../model/db-system.js'
const message = new Messages()
/**
 * 突破就是以三维为基，触发一定概率的事件
 */
message.response(/^(#|\/)?突破$/, async (e) => {
  // 获取账号
  const uid = e.user_id
  const data = await DB.findOne(uid)
  if (!data) {
    e.reply('操作频繁')
    return
  }
  // 寻找下一个境界
  const level = getLevelById(data.level_id + 1)
  if (!level.name) {
    e.reply('已达巅峰')
    return
  }
  // 得到当前境界
  const NowLevel = getLevelById(data.level_id)

  // 得到当前三维 百分比值
  const obj = {
    attack: Math.floor(
      ((NowLevel.attack + data.base.attack) / level.attack) * 100
    ),
    defense: Math.floor(
      ((NowLevel.defense + data.base.defense) / level.defense) * 100
    ),
    blood: Math.floor(((NowLevel.blood + data.base.blood) / level.blood) * 100)
  }
  /**
   * 可以突破的前提是，其中一个数值超过境界限制。
   */
  if (
    obj.attack < LEVEL_UP_LIMIT &&
    obj.defense < LEVEL_UP_LIMIT &&
    obj.blood < LEVEL_UP_LIMIT
  ) {
    // 对三维 进行 从大到小排序 sort((a, b) => b - a)
    // 从小到大为 sort((a, b) => a - b)
    const max = [obj.attack, obj.defense, obj.blood].sort((a, b) => b - a)
    // 瓶颈，指的是有一个数值最接近
    e.reply(`尚未感应到瓶颈(${max[0]}%/${LEVEL_UP_LIMIT}%)`)
    return
  }
  // 修正大于100的值。并削弱一定倍数。
  const $attack = Math.floor(
    (obj.attack > 100 ? 100 : obj.attack) / LEVEL_SIZE[0]
  )
  // 修正大于100的值。并削弱一定倍数。
  const $defense = Math.floor(
    (obj.defense > 100 ? 100 : obj.defense) / LEVEL_SIZE[1]
  )
  // 修正大于100的值。并削弱一定倍数。
  const $blood = Math.floor(obj.blood > 100 ? 100 : obj.blood / LEVEL_SIZE[2])
  // 最低 30？ 最大不过  75的概率。
  const p = $attack + $defense + $blood
  // 产生随机数  40 -100 之间
  const ran = getRandomNumber(
    LEVEL_PROBABILITY_RANGE[0],
    LEVEL_PROBABILITY_RANGE[1]
  )
  // 不管成功失败都全部清零
  data.base.attack = 0
  data.base.defense = 0
  data.base.blood = 0
  if (p < ran) {
    e.reply(`有${p}%的可能打破瓶颈，但是失败了呢`)
    DB.create(uid, data)
    return
  }
  // 境界+1
  data.level_id += 1
  // 存入数据
  DB.create(uid, data)
  // 修正名字
  data.name = getUserName(data.name, e.sender.nickname)
  // 数据植入组件
  component.message(data, uid).then((img) => {
    // 获取到图片后发送
    if (typeof img !== 'boolean') {
      e.reply(segment.image(img))
    } else {
      e.reply('图片生成失败~')
    }
  })
  return false
})

export default message
