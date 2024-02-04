import { plugin } from '../../../import.js'
import {
  existplayer,
  exist_najie_thing,
  Read_player,
  foundthing,
  __PATH,
  convert2integer,
  Add_najie_thing,
  Add_money,
  Go,
  get_forum_img,
  Write_Forum,
  Read_Forum
} from '../../model/index.js'
export class Forum extends plugin {
  constructor() {
    super({
      name: 'Forum',
      dsc: '交易模块',
      event: 'message',
      priority: 600,
      rule: [
        {
          reg: /^(#|\/)聚宝堂(装备|丹药|skill|道具|草药|仙宠|材料)?$/,
          fnc: 'show_supermarket'
        },
        {
          reg: /^(#|\/)发布.*$/,
          fnc: 'onsell'
        },
        {
          reg: /^(#|\/)取消[1-9]d*/,
          fnc: 'Offsell'
        },
        {
          reg: /^(#|\/)接取.*$/,
          fnc: 'purchase'
        }
      ]
    })
  }
  async Offsell(e) {
    //固定写法
    let user_id = e.user_id
    //有无存档
    let ifexistplay = await existplayer(user_id)
    if (!ifexistplay) return false
    let Forum
    let player = await Read_player(user_id)
    let x = parseInt(e.msg.replace('#取消', '')) - 1
    try {
      Forum = await Read_Forum()
    } catch {
      //没有表要先建立一个！
      await Write_Forum([])
      Forum = await Read_Forum()
    }
    if (x >= Forum.length) {
      e.reply(`没有编号为${x + 1}the宝贝需求`)
      return false
    }
    //对比qq是否相等
    if (Forum[x].qq != user_id) {
      e.reply('不能取消别人the宝贝需求')
      return false
    }
    await Add_money(user_id, Forum[x].whole)
    e.reply(
      player.name +
        '取消' +
        Forum[x].name +
        '成功,返还' +
        Forum[x].whole +
        'money'
    )
    Forum.splice(x, 1)
    await Write_Forum(Forum)
    return false
  }

  //上架
  async onsell(e) {
    //固定写法
    let user_id = e.user_id
    //判断是否为匿名创建存档
    if (user_id == 80000000) {
      return false
    }
    //有无存档
    let ifexistplay = await existplayer(user_id)
    if (!ifexistplay) return false
    let thing = e.msg.replace(/^(#|\/)/, '')
    thing = thing.replace('发布', '')
    let code = thing.split('*')
    let thing_name = code[0] //物品
    let thing_value = code[1] //价格
    let thing_amount = code[2] //数量
    //判断列表中是否存在，不存在不能卖,并定位是什么物品
    let thing_exist = await foundthing(thing_name)
    if (!thing_exist) {
      e.reply(`这方世界没有[${thing_name}]`)
      return false
    }
    if (thing_exist.class == '装备' || thing_exist.class == '仙宠') {
      e.reply(`暂不支持该类型物品交易`)
      return false
    }
    thing_value = await convert2integer(thing_value)
    thing_amount = await convert2integer(thing_amount)
    let Forum
    try {
      Forum = await Read_Forum()
    } catch {
      await Write_Forum([])
      Forum = await Read_Forum()
    }
    let now_time = new Date().getTime()
    let whole = Math.trunc(thing_value * thing_amount)
    let off = Math.trunc(whole * 0.03)
    if (off < 100000) off = 100000
    let player = await Read_player(user_id)
    if (player.money < off + whole) {
      e.reply(`money不足,还需要${off + whole - player.money}money`)
      return false
    }
    await Add_money(user_id, -(off + whole))
    const wupin = {
      qq: user_id,
      name: thing_name,
      price: thing_value,
      class: thing_exist.class,
      aconut: thing_amount,
      whole: whole,
      now_time: now_time
    }
    Forum.push(wupin)
    //写入
    await Write_Forum(Forum)
    e.reply('发布成功！')
    return false
  }

  async show_supermarket(e) {
    let thing_class = e.msg.replace('#聚宝堂', '')
    let img = await get_forum_img(e, thing_class)
    e.reply(img)
    return false
  }

  async purchase(e) {
    let user_id = e.user_id
    //全局状态判断
    let flag = await Go(e)
    if (!flag) return false
    //防并发cd
    let time = 0.5 //分钟cd
    //获取当前时间
    let now_time = new Date().getTime()
    let ForumCD = Number(
      await redis.get('xiuxian@1.4.0:' + user_id + ':ForumCD')
    )
    let transferTimeout = 60000 * time
    if (now_time < ForumCD + transferTimeout) {
      let ForumCDm = Math.trunc(
        (ForumCD + transferTimeout - now_time) / 60 / 1000
      )
      let ForumCDs = Math.trunc(
        ((ForumCD + transferTimeout - now_time) % 60000) / 1000
      )
      e.reply(
        `每${transferTimeout / 1000 / 60}分钟操作一次，` +
          `CD: ${ForumCDm}分${ForumCDs}秒`
      )
      //存在CD。直接返回
      return false
    }
    //记录本次执行时间
    await redis.set('xiuxian@1.4.0:' + user_id + ':ForumCD', now_time)
    let player = await Read_player(user_id)
    let Forum
    try {
      Forum = await Read_Forum()
    } catch {
      //没有表要先建立一个！
      await Write_Forum([])
      Forum = await Read_Forum()
    }
    let t = e.msg.replace('#接取', '').split('*')
    let x = (await convert2integer(t[0])) - 1
    if (x >= Forum.length) {
      return false
    }
    let thingqq = Forum[x].qq
    if (thingqq == user_id) {
      e.reply('没事找事做?')
      return false
    }
    //根据qq得到物品
    let thing_name = Forum[x].name
    let thing_class = Forum[x].class
    let thing_amount = Forum[x].aconut
    let thing_price = Forum[x].price
    let n = await convert2integer(t[1])
    if (!t[1]) {
      n = thing_amount
    }
    const num = await exist_najie_thing(user_id, thing_name, thing_class)
    if (!num) {
      e.reply(`你没有【${thing_name}】`)
      return false
    }
    if (num < n) {
      e.reply(`你只有【${thing_name}】x ${num}`)
      return false
    }
    if (n > thing_amount) n = thing_amount
    let money = n * thing_price

    await Add_najie_thing(user_id, thing_name, thing_class, -n)
    //扣钱
    await Add_money(user_id, money)
    //加钱
    await Add_najie_thing(thingqq, thing_name, thing_class, n)
    Forum[x].aconut = Forum[x].aconut - n
    Forum[x].whole = Forum[x].whole - money
    //删除该位置信息
    Forum = Forum.filter((item) => item.aconut > 0)
    await Write_Forum(Forum)
    e.reply(`${player.name}在聚宝堂收获了${money}money！`)
  }
}
