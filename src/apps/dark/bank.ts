import { plugin, type AEvent } from 'alemonjs'
import { isThereAUserPresent, GameApi, controlByName } from '../../api/index.js'
export class Bank extends plugin {
  constructor() {
    super({
      rule: [
        {
          reg: /^(#|\/)?(金银置换|金銀置換)\d+\*[\u4e00-\u9fa5]+\*[\u4e00-\u9fa5]+$/,
          fnc: 'substitution'
        }
      ]
    })
  }

  /**
   * 金银置换
   * @param e
   * @returns
   */
  async substitution(e: AEvent) {
    const UID = e.user_id
    if (!(await isThereAUserPresent(e, UID))) return
    const UserData = await GameApi.Users.read(UID)
    if (!(await controlByName(e, UserData, '金银坊'))) return
    const [account, LeftName, RightName] = e.msg
      .replace(/^(#|\/)?(金银置换|金銀置換)/, '')
      .split('*')
    const quantity = convertStoneQuantity(Number(account), LeftName, RightName)
    if (!quantity) {
      e.reply(`[金银坊]金老三\n?你玩我呢?`)

      return
    }
    const lingshi = await GameApi.Bag.searchBagByName(UID, LeftName)
    if (!lingshi || lingshi.acount < Number(account)) {
      e.reply(`[金银坊]金老三\n?哪儿来的穷鬼!`)

      return
    }
    //
    if (LeftName == '极品灵石' && Number(account) < 20) {
      postMsg(e, 20)
      return
    }
    if (LeftName == '上品灵石' && Number(account) < 100) {
      postMsg(e, 100)
      return
    }
    if (LeftName == '中品灵石' && Number(account) < 500) {
      postMsg(e, 500)
      return
    }
    if (LeftName == '下品灵石' && Number(account) < 2500) {
      postMsg(e, 2500)
      return
    }
    const BagSize = await GameApi.Bag.backpackFull(UID, UserData.bag_grade)
    // 背包未位置了直接返回了
    if (!BagSize) {
      e.reply(['储物袋空间不足'], {
        quote: e.msg_id
      })

      return
    }
    // 先扣除
    await GameApi.Bag.reduceBagThing(UID, [
      {
        name: LeftName,
        acount: Number(account)
      }
    ])
    // 再增加
    await GameApi.Bag.addBagThing(UID, UserData.bag_grade, [
      {
        name: RightName,
        acount: quantity
      }
    ])

    e.reply([`[${LeftName}]*${account}\n置换成\n[${RightName}]*${quantity}`])

    return
  }
}

function postMsg(e: AEvent, size: number) {
  e.reply(`[金银坊]金老三\n少于${size}不换`)
}

const stones = ['下品灵石', '中品灵石', '上品灵石', '极品灵石']

function convertStoneQuantity(
  quantity: number,
  sourceStone: string,
  targetStone: string
) {
  const sourceIndex = stones.indexOf(sourceStone),
    targetIndex = stones.indexOf(targetStone)
  const size = Math.abs(targetIndex - sourceIndex)
  const onSize = 10 ** size
  if (sourceIndex === -1 || targetIndex === -1) {
    // 如果输入的灵石名称不合法，则返回 null
    return false
  } else if (sourceIndex < targetIndex) {
    // 将左边的灵石转换为右边的灵石
    return Math.floor((quantity / onSize) * 0.9)
  } else if (sourceIndex > targetIndex) {
    // 将右边的灵石转换为左边的灵石
    return quantity * onSize
  } else {
    // 如果左右灵石相同，则直接返回原始数量
    return quantity
  }
}
