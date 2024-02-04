import {
  existplayer,
  sortBy,
  ForwardMsg,
  Read_player,
  __PATH
} from '../../model/index.js'
import { AppName } from '../../../config.js'
import { readdirSync } from 'fs'
import { plugin } from '../../../import.js'
export class PHB extends plugin {
  constructor() {
    super({
      name: 'Yunzai_Bot_TopList',
      dsc: '修仙模块',
      event: 'message',
      priority: 600,
      rule: [
        {
          reg: /^(#|\/)魔道榜$/,
          fnc: 'TOP_Immortal'
        },
        {
          reg: /^(#|\/)强化榜$/,
          fnc: 'TOP_genius'
        }
      ]
    })
  }

  //封神榜
  async TOP_Immortal(e) {
    let usr_qq = e.user_id
    let ifexistplay = await existplayer(usr_qq)
    if (!ifexistplay) return false
    let msg = ['___[魔道榜]___']
    let playerList = []
    //数组
    let temp = []
    let files = readdirSync(
      './plugins/' + AppName + '/resources/data/xiuxian_player'
    ).filter((file) => file.endsWith('.json'))
    for (let file of files) {
      file = file.replace('.json', '')
      playerList.push(file)
    }
    let i = 0
    for (let player_id of playerList) {
      //(攻击+防御*0.8+生命*0.5)*暴击率=理论战力
      let player = await Read_player(player_id)
      //计算并保存到数组
      let power = player.魔道值
      power = Math.trunc(power)
      temp[i] = {
        power: power,
        qq: player_id,
        name: player.name,
        level_id: player.level_id
      }
      i++
    }
    //根据力量排序
    temp.sort(sortBy('power'))
    console.log(temp)
    let length
    if (temp.length > 20) {
      //只要十个
      length = 20
    } else {
      length = temp.length
    }
    let j
    for (j = 0; j < length; j++) {
      msg.push(
        '第' +
          (j + 1) +
          '名' +
          '\n道号：' +
          temp[j].name +
          '\n魔道值：' +
          temp[j].power +
          '\nQQ:' +
          temp[j].qq
      )
    }
    await ForwardMsg(e, msg)
    return false
  }

  //#至尊榜
  async TOP_genius(e) {
    let usr_qq = e.user_id
    let ifexistplay = await existplayer(usr_qq)
    if (!ifexistplay) return false
    let msg = ['___[强化榜]___']
    let playerList = []
    //数组
    let temp = []
    let files = readdirSync(
      './plugins/' + AppName + '/resources/data/xiuxian_player'
    ).filter((file) => file.endsWith('.json'))
    for (let file of files) {
      file = file.replace('.json', '')
      playerList.push(file)
    }
    let i = 0
    for (let player_id of playerList) {
      //(攻击+防御+生命*0.5)*暴击率=理论战力
      let player = await Read_player(player_id)
      //计算并保存到数组
      let power = player.攻击加成 + player.防御加成 + player.生命加成
      power = Math.trunc(power)
      temp[i] = {
        power: power,
        qq: player_id,
        name: player.name,
        level_id: player.level_id
      }
      i++
    }
    //根据力量排序
    temp.sort(sortBy('power'))
    console.log(temp)
    let length
    if (temp.length > 20) {
      //只要十个
      length = 20
    } else {
      length = temp.length
    }
    let j
    for (j = 0; j < length; j++) {
      msg.push(
        '第' +
          (j + 1) +
          '名' +
          '\n道号：' +
          temp[j].name +
          '\n强化值：' +
          temp[j].power +
          '\nQQ:' +
          temp[j].qq
      )
    }
    await ForwardMsg(e, msg)
    return false
  }
}