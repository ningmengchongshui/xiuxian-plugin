export const BaseSkill = {
  price: 36,
  // 100%
  efficiency: 100
}

export const BaseEquipment = {
  attack: 56, // 攻击
  defense: 23, // 防御
  blood: 9, // 血量
  agile: 0, // 敏捷
  critical_hit_rate: 0, // 暴击率
  critical_damage: 0, // 暴击伤害
  price: 99 // 价格
}

// 基础境界 不会影响 双暴
export const BaseLevel = {
  attack: 200,
  defense: 100,
  blood: 300
}

// 基础修炼经验
export const BaseExperience = {
  attack: 0,
  defense: 0,
  blood: 0
}

type EquipmentsType = {
  // 武器  攻击
  arms: null | string
  // 护甲 防御
  armor: null | string
  // 裤子 血量
  trousers: null | string
  // 靴子  敏捷
  boot: null | string
  // 法器  爆伤
  magic: null | string
  // 头冠  暴击率
  helmet: null | string
}

// 身份卡 ： 白 绿 蓝 紫 金
const Identities = [0, 1, 2, 3, 4] as const

type IdentityType = (typeof Identities)[number]

//
export const UserMessageBase = {
  uid: 1715713638 as string | number,
  name: '柠檬冲水',
  blood: 100,
  autograph: '无',
  money: 34,
  // 主题
  theme: 'dark',
  // 境界
  level_id: 0,
  identity: 0 as IdentityType,
  efficiency: 0,
  base: BaseExperience,
  // 功法
  kills: {},
  // 装备
  equipments: {
    // 武器  攻击
    arms: null,
    // 护甲 防御
    armor: null,
    // 裤子 血量
    trousers: null,
    // 靴子  敏捷
    boot: null,
    // 法器  爆伤
    magic: null,
    // 头冠  暴击率
    helmet: null
  } as EquipmentsType,
  // 背包
  bags: {
    // 功法
    kills: {},
    // 装备  --- 手续改成 EquipmentsType
    equipments: {}
  }
}

// 主题
export const ThemesColor = {
  dark: {
    left: '#f3d109a6',
    right: '#ff0000ba'
  },
  red: {
    left: '#f7da2fa6',
    right: '#ff6800ba'
  },
  purple: {
    left: '#83e139ba',
    right: '#f72020cc'
  },
  blue: {
    left: '#aadb03ba',
    right: '#f72020ba'
  }
}

// 淡黑
export const Themes = Object.keys(ThemesColor)

/**
 * 反转键值对
 * @param obj
 * @returns
 */
export function reverseObject(obj: object) {
  const reversedObj = {}
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      reversedObj[obj[key]] = key
    }
  }
  return reversedObj
}

// 境界名
export const LevelNameMap = {
  '0': '凡人',
  '1': '练气一层',
  '2': '练气二层',
  '3': '练气三层',
  '4': '练气四层',
  '5': '练气五层',
  '6': '练气六层',
  '7': '练气七层',
  '8': '练气八层',
  '9': '练气九层',
  '10': '练气十层',
  '11': '练气十一层',
  '12': '练气十二层',
  '13': '筑基初期',
  '14': '筑基中期',
  '15': '筑基后期',
  '16': '筑基大圆满',
  '17': '金丹初期',
  '18': '金丹中期',
  '19': '金丹后期',
  '20': '金丹大圆满',
  '21': '元婴初期',
  '22': '元婴中期',
  '23': '元婴后期',
  '24': '元婴大圆满',
  '25': '化神初期',
  '26': '化神中期',
  '27': '化神后期',
  '28': '化神大圆满',
  '29': '洞虚初期',
  '30': '洞虚中期',
  '31': '洞虚后期',
  '32': '洞虚大圆满',
  '33': '大乘初期',
  '34': '大乘中期',
  '35': '大乘后期',
  '36': '大乘大圆满',
  '37': '渡劫期',
  '38': '地仙',
  '39': '天仙',
  '40': '真仙',
  '41': '金仙',
  '42': '大罗金仙',
  '43': '仙王',
  '44': '仙帝',
  '45': '超凡入圣'
}

export const EquipmentNameMap = {
  '0': '烂匕首',
  '1': '火龙剑',
  '2': '雷霆枪',
  '3': '风刃刀',
  '4': '地煞锤',
  '5': '冰霜剑',
  '6': '飞龙棍',
  '7': '岩石锤',
  '8': '霜寒剑',
  '9': '雷焰弓',
  '10': '烈焰刃',
  '11': '虎魄刀',
  '12': '凤翼扇',
  '13': '魔焰枪',
  '14': '幽冥剑',
  '15': '玄冰杖',
  '16': '斩魂刀',
  '17': '天雷剑',
  '18': '灵光棒',
  '19': '火凤刃',
  '20': '奔雷锤',
  '21': '寒冰刀',
  '22': '炎龙戟',
  '23': '破空剑',
  '24': '玄霜枪',
  '25': '神焰锤',
  '26': '雷电斧',
  '27': '霜寒刃',
  '28': '烈焰弓',
  '29': '虎啸刀',
  '30': '风神剑',
  '31': '冰魄枪',
  '32': '震天刀',
  '33': '龙吟锤',
  '34': '烈焰枪',
  '35': '魔龙剑',
  '36': '霜寒棍',
  '37': '紫电剑',
  '38': '血魂刀',
  '39': '幽影剑',
  '40': '冰焰刃',
  '41': '风雷棒',
  '42': '天崩锤',
  '43': '龙鳞刀',
  '44': '碎星剑',
  '45': '寒霜枪',
  '46': '火龙棍',
  '47': '魔炎弓',
  '48': '破冰剑',
  '49': '雷霆戟',
  '50': '霜寒锤',
  '51': '虎啸剑',
  '52': '烈焰斧',
  '53': '冰崖刀',
  '54': '风魂剑',
  '55': '雷神锤',
  '56': '霜寒刃',
  '57': '烈焰戟',
  '58': '火蛟刀',
  '59': '破冰棍',
  '60': '寒霜枪',
  '61': '风雷弓',
  '62': '龙鳞剑',
  '63': '天魔刃',
  '64': '幽冥锤',
  '65': '碧龙剑',
  '66': '冰焰枪',
  '67': '烈焰棍',
  '68': '魔炎刃',
  '69': '破空剑',
  '70': '风雷斧',
  '71': '雷霆刀',
  '72': '霜寒棒',
  '73': '火蛇剑',
  '74': '寒冰弓',
  '75': '龙鳞锤',
  '76': '天魔剑',
  '77': '烈焰枪',
  '78': '幽冥刃',
  '79': '碧龙棍',
  '80': '冰炎刀',
  '81': '风雷剑',
  '82': '雷霆枪',
  '83': '霜寒斧',
  '84': '火蛟刀',
  '85': '寒冰棒',
  '86': '龙鳞剑',
  '87': '天魔弓',
  '88': '烈焰锤',
  '89': '幽冥枪',
  '90': '碧龙刃',
  '91': '冰炎棍',
  '92': '风雷剑',
  '93': '雷霆刀',
  '94': '霜寒枪',
  '95': '火蛟锤',
  '96': '寒冰剑',
  '97': '龙鳞弓',
  '98': '天魔棍',
  '99': '烈焰斧',
  '100': '幽冥刃'
}

// 反转key
export const ReverseEquipmentNameMap: {
  [key: string]: string
} = reverseObject(EquipmentNameMap)

export const SkillNameMap = {
  '0': '灵气吐纳法'
}

// 反转key
export const ReverseSkillNameMap: {
  [key: string]: string
} = reverseObject(SkillNameMap)
