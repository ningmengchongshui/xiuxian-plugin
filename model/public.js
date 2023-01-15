import fs from 'fs'
import path from 'path'
import data from './boxdada.js'
import { __PATH } from './boxdada.js'
const CDname = {
    '0': '攻击',
    '1': '降妖',
    '2': '闭关',
    '3': '改名',
    '4': '道宣',
    '5': '赠送',
    '6': '突破',
    '7': '破体',
    '8': '转世',
    '9': '行为',
    '10': '击杀',
    '11': '决斗',
    '12': '修行'
}

/////////////////////////////////////////////////boxpublic.js////////////////
/**
 * 
 * @param {UID} uid 
 * @returns 初始化玩家，不成功则false
 */
export const createBoxPlayer = async (uid) => {
    try {
        const new_player = {
            'autograph': '无',//道宣
            'days': 0//签到
        }
        const Levellist = await returnLevel()
        const Level = Levellist.find(item => item.id == 1)
        const Levelmaxlist = await returnLevelMax()
        const LevelMax = Levelmaxlist.find(item => item.id == 1)
        const new_battle = {
            'nowblood': Level.blood + await LevelMax.blood,//血量
        }
        const new_level = {
            'prestige': 0,//魔力
            'level_id': 1,//练气境界
            'levelname': Level.name,//练气名
            'experience': 1,//练气经验
            'levelmax_id': 1,//练体境界
            'levelnamemax': LevelMax.name,//练体名
            'experiencemax': 1,//练体经验
            'rank_id': 0,//数组位置
            'rankmax_id': 0//数组位置
        }
        const new_wealth = {
            'lingshi': 0,
            'xianshi': 0
        }
        const Posirion = await returnPosirion()
        const position = Posirion.find(item => item.name == '极西')
        const positionID = position.id.split('-')
        const the = {
            mx: Math.floor((Math.random() * (position.x2 - position.x1))) + Number(position.x1),
            my: Math.floor((Math.random() * (position.y2 - position.y1))) + Number(position.y1)
        }
        const new_action = {
            'game': 1,//游戏状态
            'Couple': 1, //双修
            'newnoe': 1, //新人
            'x': the.mx,
            'y': the.my,
            'z': positionID[0],//位面 
            'region': positionID[1],//区域
            'address': positionID[2],//属性
            'Exchange': 0
        }
        const new_najie = {
            'grade': 1,
            'lingshimax': 50000,  //废弃
            'lingshi': 0,  //废弃
            'thing': []
        }
        const newtalent = await get_talent()
        const new_talent = {
            'talent': newtalent,//灵根
            'talentshow': 1,//显示0,隐藏1
            'talentsize': 0,//天赋
            'AllSorcery': []//功法
        }
        const thename = {
            name1: ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'],
            name2: ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']
        }
        const name = await Anyarray(thename.name1) + await Anyarray(thename.name2)
        const life = await Read_Life()
        const time = new Date()
        life.push({
            'qq': uid,
            'name': `${name}`,
            'Age': 1,//年龄
            'life': Math.floor((Math.random() * (84 - 60) + 60)), //寿命
            'createTime': time.getTime(),
            'status': 1
        })
        await Write_player(uid, new_player)
        await Write_talent(uid, new_talent)
        await player_efficiency(uid)
        await Write_battle(uid, new_battle)
        await Write_level(uid, new_level)
        await Write_wealth(uid, new_wealth)
        await Write_action(uid, new_action)
        await Write_equipment(uid, [])
        await Write_najie(uid, new_najie)
        await Write_Life(life)
        return ture
    } catch {
        return false
    }
}

/**
 * 
 * @returns 随机返回一个物品
 */
export const randomThing = async () => {
    const dropsItemList = JSON.parse(fs.readFileSync(`${__PATH.all}/dropsItem.json`))
    const random = Math.floor(Math.random() * dropsItemList.length)
    return dropsItemList[random]
}
/**
 * 
 * @returns 返回练气境界表
 */
export const returnLevel = async () => {
    return JSON.parse(fs.readFileSync(`${__PATH.Level}/Level_list.json`))
}
/**
 * 
 * @returns 返回炼体境界表
 */
export const returnLevelMax = async () => {
    return JSON.parse(fs.readFileSync(`${__PATH.Level}/LevelMax_list.json`))
}
/**
 * 
 * @returns 返回地图区域表
 */
export const returnPosirion = async () => {
    return JSON.parse(fs.readFileSync(`${__PATH.position}/position.json`))
}
/**
 * 
 * @returns 返回地图点位表
 */
export const returnPoint = async () => {
    return JSON.parse(fs.readFileSync(`${__PATH.position}/point.json`))
}
/**
 * 
 * @returns 返回所有物品信息
 */
export const returnAll = async () => {
    return JSON.parse(fs.readFileSync(`${__PATH.all}/all.json`))
}
/**
 * 
 * @returns 返回商品信息
 */
export const returnCommodities = async () => {
    return JSON.parse(fs.readFileSync(`${__PATH.all}/commodities.json`))
}


//读取境界
export const Read_level = async (uid) => {
    return await Read(uid, __PATH.level)
}
//读取存档
export const Read_player = async (uid) => {
    return await Read(uid, __PATH.player)
}
//读取拓展
export const Read_extend = async (uid) => {
    const dir = path.join(`${__PATH.extend}/${uid}.json`)
    if (!fs.existsSync(dir)) {
        await Write_extend(uid, {})
    }
    return await Read(uid, __PATH.extend)
}
//读取灵根
export const Read_talent = async (uid) => {
    return await Read(uid, __PATH.talent)
}
//写入存档
export const Write_player = async (uid, player) => {
    await Write(uid, player, __PATH.player)
    return
}
//写入拓展
export const Write_extend = async (uid, player) => {
    await Write(uid, player, __PATH.extend)
    return
}
//写入新灵根
export const Write_talent = async (uid, player) => {
    await Write(uid, player, __PATH.talent)
    return
}
//写入新战斗
export const Write_battle = async (uid, data) => {
    await Write(uid, data, __PATH.battle)
    return
}


//写入新境界
export const Write_level = async (uid, data) => {
    await Write(uid, data, __PATH.level)
    return
}
//读取财富
export const Read_wealth = async (uid) => {
    return await Read(uid, __PATH.wealth)
}
//写入新财富
export const Write_wealth = async (uid, data) => {
    await Write(uid, data, __PATH.wealth)
    return
}
//读取状态
export const Read_action = async (uid) => {
    return await Read(uid, __PATH.action)
}
//写入新状态
export const Write_action = async (uid, data) => {
    await Write(uid, data, __PATH.action)
    return
}
//读取储物袋
export const Write_najie = async (uid, najie) => {
    await Write(uid, najie, __PATH.najie)
    return
}
//写入新储物袋
export const Read_najie = async (uid) => {
    return await Read(uid, __PATH.najie)
}
//读取装备
export const Read_equipment = async (uid) => {
    return await Read(uid, __PATH.equipment)
}
//写入新装备
export const Write_equipment = async (uid, equipment) => {
    await Write(uid, equipment, __PATH.equipment)
    return
}


//写入寿命表
export const Write_Life = async (wupin) => {
    await Write(`life`, wupin, __PATH.life)
    return
}
//读寿命表
export const Read_Life = async () => {
    const dir = path.join(`${__PATH.life}/life.json`)
    let Life = await newRead(dir)
    if (Life == 1) {
        await Write_Life([])
        Life = await newRead(dir)
    }
    Life = await JSON.parse(Life)
    return Life
}

//得到灵根
export const get_talent = async () => {
    const newtalent = []
    const talentacount = Math.round(Math.random() * (5 - 1)) + 1
    for (let i = 0; i < talentacount; i++) {
        const x = Math.round(Math.random() * (10 - 1)) + 1
        const y = newtalent.indexOf(x)
        if (y != -1) {
            continue
        }
        if (x <= 5) {
            const z = newtalent.indexOf(x + 5)
            if (z != -1) {
                continue
            }
        } else {
            const z = newtalent.indexOf(x - 5)
            if (z != -1) {
                continue
            }
        }
        newtalent.push(x)
    }
    return newtalent
}
/**
 * 得到灵根名字
 */
export const talentname = async (player) => {
    const talentname = []
    let name = ''
    const talent = player.talent
    for (let i = 0; i < talent.length; i++) {
        name = data.talent_list.find(item => item.id == talent[i]).name
        talentname.push(name)
    }
    return talentname
}

/**
 * 计算天赋
 */
const talentsize = async (player) => {
    const talent = {
        player: player.talent,
        talentsize: 250
    }
    //根据灵根数来判断
    for (let i = 0; i < talent.player.length; i++) {
        //循环加效率
        if (talent.player[i] <= 5) {
            talent.talentsize -= 50
        }
        if (talent.player[i] >= 6) {
            talent.talentsize -= 40
        }
    }
    return talent.talentsize
}

/**
 * 天赋综合计算
 */
export const player_efficiency = async (uid) => {
    const player = await Read_talent(uid)
    const the = {
        gongfa_efficiency: 0,
        linggen_efficiency: 0
    }
    the.gongfa_efficiency = 0
    player.AllSorcery.forEach((item) => {
        the.gongfa_efficiency = the.gongfa_efficiency + item.size
    })
    the.linggen_efficiency = await talentsize(player)
    let promise = await Read_extend(uid)
    promise = Object.values(promise)
    let extend = 0
    for (let i in promise) {
        extend += (promise[i].perpetual.efficiency * 100)
    }
    player.talentsize = the.linggen_efficiency + the.gongfa_efficiency + extend
    await Write_talent(uid, player)
    return
}



/**
 * 
 * @param {UID} uid 
 * @param {物品名} name 
 * @returns 若背包存在即返回物品信息,若不存在则返回
 */
export const returnUserBagName = async (uid, name) => {
    const najie = await Read_najie(uid)
    const ifexist = najie.thing.find(item => item.name == name)
    if (!ifexist) { 
        return 1
    }
    return ifexist
}





/**
 * 
 * @param {UID} uid 
 * @returns 有存档则false
 */
export const exist = async (uid) => {
    const life = await Read_Life()
    const find = life.find(item => item.qq == uid)
    if (find == undefined) {
        return true
    } else {
        //不管死没死，有存档就不能降临
        //必须再入仙途
        return false
    }
}


/////////////////////////////////////////boxpublic.js////////////////////
///////////////boxfs.js////////


/**
 * 读取数据
 */
export const Read = async (uid, PATH) => {
    const dir = path.join(`${PATH}/${uid}.json`)
    const the = {
        player: ''
    }
    the.player = fs.readFileSync(dir, 'utf8', (err, data) => {
        if (err) {
            return 'error'
        }
        return data
    })
    the.player = JSON.parse(the.player)
    return the.player
}
/**
 * 
 * @param {UID} uid 
 * @param {数据} data 
 * @param {地址} PATH 
 * @returns 
 */
export const Write = async (uid, data, PATH) => {
    const dir = path.join(PATH, `${uid}.json`)
    const new_ARR = JSON.stringify(data, '', '\t')
    fs.writeFileSync(dir, new_ARR, 'utf8', (err) => { })
    return
}



//新的写入
export const newRead = async (dir) => {
    try {
        const newdata = fs.readFileSync(dir, 'utf8', (err, data) => {
            if (err) {
                return 'error'
            }
            return data
        })
        return newdata
    } catch {
        return 1
    }
}

///////////////boxfs.js////////









/**
 * 
 * @param {UID} uid 
 * @returns 若不存在则先初始化后通过
 */
export const existplayer = async (uid) => {
    let life = await Read_Life()
    let find = life.find(item => item.qq == uid)
    if (find == undefined) {
        const Go = await createBoxPlayer(uid)
        if (!Go) {
            return false
        }
        life = await Read_Life()
        find = life.find(item => item.qq == uid)
    }
    if (find.status == 0) {
        return false
    }
    return true
}
/**
 * 
 * @param {UID} uid 
 * @returns 检测是否存在
 */
export const existplayerplugins = async (uid) => {
    const life = await Read_Life()
    const find = life.find(item => item.qq == uid)
    if (find == undefined) {
        return false
    } else {
        return find
    }
}



/**
 * 
 * @returns 返回所有用户UID
 */
export const returnUid = async () => {
    const playerList = []
    const life = await Read_Life()
    life.forEach((item) => {
        playerList.push(item.qq)
    })
    return playerList
}










//计算双境界*装备
export const Read_battle = async (uid) => {
    const equipment = await Read_equipment(uid)
    const level = await Read_level(uid)

    const Levellist = await returnLevel()
    const Levelmaxlist = await returnLevelMax()
    const levelmini = Levellist.find(item => item.id == level.level_id)
    const levelmax = Levelmaxlist.find(item => item.id == level.levelmax_id)
    //双境界面板之和
    let the = {
        attack: levelmini.attack + levelmax.attack,
        defense: levelmini.defense + levelmax.defense,
        blood: levelmini.blood + levelmax.blood,
        burst: levelmini.burst + levelmax.burst,
        burstmax: levelmini.burstmax + levelmax.burstmax,
        speed: levelmini.speed + levelmax.speed,
        power: 0
    }
    //计算装备倍化
    const equ = {
        attack: 0,
        defense: 0,
        blood: 0,
        burst: 0,
        burstmax: 0,
        speed: 0,
    }
    equipment.forEach((item) => {
        equ.attack = equ.attack + item.attack
        equ.defense = equ.defense + item.defense
        equ.blood = equ.blood + item.blood
        equ.burst = equ.burst + item.burst
        equ.burstmax = equ.burstmax + item.burstmax
        equ.speed = equ.speed + item.speed
    })
    //计算插件临时属性及永久属性
    let extend = await Read_extend(uid)
    extend = Object.values(extend)
    for (let i = 0; i < extend.length; i++) {
        //永久属性计算
        equ.attack = equ.attack + extend[i]["perpetual"].attack
        equ.defense = equ.defense + extend[i]["perpetual"].defense
        equ.blood = equ.blood + extend[i]["perpetual"].blood
        equ.burst = equ.burst + extend[i]["perpetual"].burst
        equ.burstmax = equ.burstmax + extend[i]["perpetual"].burstmax
        equ.speed = equ.speed + extend[i]["perpetual"].speed
        //临时属性计算
        for (let j in extend[i]["times"]) {
            if (extend[i]["times"][j].timeLimit > new Date().getTime()) {
                equ[extend[i]["times"][j].type] += extend[i]["times"][j].value
            }
        }
    }
    //血量上限 换装导致血量溢出时需要
    const bloodLimit = levelmini.blood + levelmax.blood + Math.floor((levelmini.blood + levelmax.blood) * equ.blood * 0.01)
    const player = await Read(uid, __PATH.battle)
    the.attack = Math.floor(the.attack * ((equ.attack * 0.01) + 1))
    the.defense = Math.floor(the.defense * ((equ.defense * 0.01) + 1))
    the.blood = bloodLimit
    the.nowblood = player.nowblood > bloodLimit ? bloodLimit : player.nowblood
    the.burst += equ.burst
    the.burstmax += equ.burstmax
    the.speed += equ.speed
    the.power = the.attack + the.defense + bloodLimit / 2 + the.burst * 100 + the.burstmax * 10 + the.speed * 50
    return the
}






//魔力操作
export const Add_prestige = async (uid, prestige) => {
    const player = await Read_level(uid)
    player.prestige += Math.trunc(prestige)
    await Write_level(uid, player)
    return
}













export const addAll = async (uid, acount, newname) => {
    //默认下品灵石
    let name = '下品灵石'
    if (newname != undefined) {
        name = newname
    }
    //搜索物品信息
    const najie_thing = await search_thing_name(name)
    let najie = await Read_najie(uid)
    najie = await Add_najie_thing(najie, najie_thing, acount)
    await Write_najie(uid, najie)
    return
}

export const addLingshi = async (uid, lingshi, name) => {
    let najieName = '下品灵石'
    if (name != undefined) {
        najieName = name
    }
    const najie_thing = await search_thing_name(najieName)
    let najie = await Read_najie(uid)
    najie = await Add_najie_thing(najie, najie_thing, lingshi)
    await Write_najie(uid, najie)
    return
}












//灵石操作
export const Add_lingshi = async (uid, lingshi) => {
    const player = await Read_wealth(uid)
    player.lingshi += Math.trunc(lingshi)
    await Write_wealth(uid, player)
    return
}
//修为操作
export const Add_experience = async (uid, experience) => {
    const player = await Read_level(uid)
    const exp0 = await Numbers(player.experience)
    const exp1 = await Numbers(experience)
    player.experience = await (exp0 + exp1)
    await Write_level(uid, player)
    return
}
//气血操作
export const Add_experiencemax = async (uid, qixue) => {
    const player = await Read_level(uid)
    player.experiencemax += Math.trunc(qixue)
    await Write_level(uid, player)
    return
}
//血量按百分比恢复
export const Add_blood = async (uid, blood) => {
    const player = await Read_battle(uid)
    const battle = await Read_battle(uid)
    //判断百分比
    if (player.nowblood < Math.floor(battle.blood * blood * 0.01)) {
        player.nowblood = Math.floor(battle.blood * blood * 0.01)
    }
    await Write_battle(uid, player)
    return
}
//储物袋灵石操作
export const Add_najie_lingshi = async (uid, acount) => {
    const najie = await Read_najie(uid)
    najie.lingshi += Math.trunc(acount)
    await Write_najie(uid, najie)
    return
}
//新增功法
export const Add_player_AllSorcery = async (uid, gongfa) => {
    const player = await Read_talent(uid)
    player.AllSorcery.push(gongfa)
    await Write_talent(uid, player)
    await player_efficiency(uid)
    return
}

export const Add_extend_perpetual = async (uid, flag, type, value) => {
    const dir = path.join(`${__PATH.extend}/${uid}.json`)
    let player
    if (!fs.existsSync(dir)) {
        player = {}
    } else {
        player = await Read_extend(uid)
    }
    if (!isNotNull(player[flag])) {
        const extend = {
            "times": [],
            "perpetual": {
                "attack": 0,
                "defense": 0,
                "blood": 0,
                "burst": 0,
                "burstmax": 0,
                "speed": 0,
                "efficiency": 0
            }
        }
        player[flag] = extend
    }
    player[flag].perpetual[type] = value
    await Write_extend(uid, player)
    return
}

//限时属性
export const Add_extend_times = async (uid, flag, type, value, endTime) => {
    const dir = path.join(`${__PATH.extend}/${uid}.json`)
    let player
    if (!fs.existsSync(dir)) {
        player = {}
    } else {
        player = await Read_extend(uid)
    }
    if (!isNotNull(player[flag])) {
        const extend = {
            "times": [],
            "perpetual": {
                "attack": 0,
                "defense": 0,
                "blood": 0,
                "burst": 0,
                "burstmax": 0,
                "speed": 0,
                "efficiency": 0
            }
        }
        player[flag] = extend
    }
    const find = player[flag].times.findIndex(item => item.type == type)
    const timExtend = {
        "type": type,
        "value": value,
        "timeLimit": endTime
    }
    if (find != -1 && player[flag].times[find].timeLimit > new Date().getTime() && player[flag].times[find].value >= value) {
        await Write_extend(uid, player)
        return
    } else if (find != -1 && (player[flag].times[find].timeLimit <= new Date().getTime() || player[flag].times[find].value < value)) {
        player[flag].times[find].value = value
        player[flag].times[find].timeLimit = endTime
        await Write_extend(uid, player)
        return
    } else {
        player[flag].times.push(timExtend)
        await Write_extend(uid, player)
        return
    }
}

//怪物战斗
export const monsterbattle = async (e, battleA, battleB) => {
    const battle_msg = {
        msg: [],
        QQ: 1
    }
    const battle = {
        Z: 1
    }
    const battle_hurt = {
        hurtA: 0,
        hurtB: 0
    }
    if (battleA.speed >= battleB.speed - 5) {
        battle_hurt.hurtA = battleA.attack - battleB.defense >= 0 ? battleA.attack - battleB.defense + 1 : 0
        if (battle_hurt.hurtA <= 1) {
            battle_msg.msg.push('你个老六想偷袭,却连怪物的防御都破不了,被怪物一巴掌给拍死了!')
            battleA.nowblood = 0
            battle_msg.QQ = 0
            await Write_battle(e.user_id, battleA)
            return battle_msg
        }
        const T = await battle_probability(battleA.burst)
        if (T) {
            battle_hurt.hurtA += Math.floor(battle_hurt.hurtA * battleA.burstmax / 100)
        }
        battleB.nowblood = battleB.nowblood - battle_hurt.hurtA
        if (battleB.nowblood < 1) {
            battle_msg.msg.push('你仅出一招,就击败了怪物!')
            return battle_msg
        } else {
            battle_msg.msg.push(`你个老六偷袭,造成${battle_hurt.hurtA}伤害`)
        }
    }
    else {
        battle_msg.msg.push('你个老六想偷袭,怪物一个转身就躲过去了')
    }
    while (true) {
        battle.Z++
        if (battle.Z == 30) {
            break
        }
        battle_hurt.hurtB = battleB.attack - battleA.defense >= 0 ? battleB.attack - battleA.defense + 1 : 0
        const F = await battle_probability(battleB.burst)
        if (F) {
            battle_hurt.hurtB += Math.floor(battle_hurt.hurtB * battleB.burstmax / 100)
        }
        battleA.nowblood = battleA.nowblood - battle_hurt.hurtB
        if (battle_hurt.hurtB > 1) {
            if (battleA.nowblood < 1) {
                battle_msg.msg.push(`经过${battle.Z}回合,你被怪物击败了!`)
                battleA.nowblood = 0
                battle_msg.QQ = 0
                break
            }
        }
        battle_hurt.hurtA = battleA.attack - battleB.defense >= 0 ? battleA.attack - battleB.defense + 1 : 0
        const T = await battle_probability(battleA.burst)
        if (T) {
            battle_hurt.hurtA += Math.floor(battle_hurt.hurtA * battleA.burstmax / 100)
        }
        if (battle_hurt.hurtA <= 1) {
            battle_msg.msg.push('你再次攻击,却连怪物的防御都破不了,被怪物一巴掌给拍死了!')
            battleA.nowblood = 0
            battle_msg.QQ = 0
            break
        }
        battleB.nowblood = battleB.nowblood - battle_hurt.hurtA
        if (battleB.nowblood < 1) {
            battle_msg.msg.push(`经过${battle.Z}回合,你击败了怪物!`)
            break
        }
    }
    battle_msg.msg.push(`血量剩余:${battleA.nowblood}`)
    await Write_battle(e.user_id, battleA)
    return battle_msg
}
//战斗模型
export const battle = async (e, A, B) => {
    const battle_msg = {
        msg: [],
        QQ: 1
    }
    const battle = {
        X: 1,
        Y: 0,
        Z: 1
    }
    const battle_hurt = {
        'hurtA': 0,
        'hurtB': 0
    }
    const battleA = await Read_battle(A)
    const battleB = await Read_battle(B)
    battle_msg.QQ = A
    if (battleA.speed >= battleB.speed - 5) {
        battle_hurt.hurtA = battleA.attack - battleB.defense >= 0 ? battleA.attack - battleB.defense + 1 : 0
        const T = await battle_probability(battleA.burst)
        if (T) {
            battle_hurt.hurtA += Math.floor(battle_hurt.hurtA * battleA.burstmax / 100)
        }
        if (battle_hurt.hurtA <= 1) {
            battle_msg.msg.push('你个老六想偷袭,却连对方的防御都破不了,被对方一巴掌给拍死了!')
            battleA.nowblood = 0
            battle_msg.QQ = B
            await ForwardMsg(e, battle_msg.msg)
            await Write_battle(A, battleA)
            return battle_msg.QQ
        }
        battleB.nowblood = battleB.nowblood - battle_hurt.hurtA
        if (battleB.nowblood < 1) {
            battle_msg.msg.push('你仅出一招,就击败了对方!')
            battleB.nowblood = 0
            await ForwardMsg(e, battle_msg.msg)
            await Write_battle(B, battleB)
            return battle_msg.QQ
        } else {
            battle_msg.msg.push(`你个老六偷袭成功,造成 ${battle_hurt.hurtA}伤害`)
        }
    } else {
        battle_msg.msg.push('你个老六想偷袭,对方却一个转身就躲过去了')
    }
    while (true) {
        battle.X++
        battle.Z++
        //分片发送消息
        if (battle.X == 15) {
            await ForwardMsg(e, battle_msg.msg)
            battle_msg.msg = []
            battle.X = 0
            battle.Y++
            if (battle.Y == 2) {
                //就打2轮回
                break
            }
        }
        //B开始
        battle_hurt.hurtB = battleB.attack - battleA.defense >= 0 ? battleB.attack - battleA.defense + 1 : 0
        const F = await battle_probability(battleB.burst)
        if (F) {
            battle_hurt.hurtB += Math.floor(battle_hurt.hurtB * battleB.burstmax / 100)
        }
        battleA.nowblood = battleA.nowblood - battle_hurt.hurtB
        if (battle_hurt.hurtB > 1) {
            if (battleA.nowblood < 0) {
                battle_msg.msg.push(`第${battle.Z}回合:对方造成${battle_hurt.hurtB}伤害`)
                battleA.nowblood = 0
                battle_msg.QQ = B
                await ForwardMsg(e, battle_msg.msg)
                break
            }
        } else {
            battle_msg.msg.push(`第${battle.Z}回合:对方造成${battle_hurt.hurtB}伤害`)
        }
        //A开始
        battle_hurt.hurtA = battleA.attack - battleB.defense >= 0 ? battleA.attack - battleB.defense + 1 : 0
        const T = await battle_probability(battleA.burst)
        if (T) {
            battle_hurt.hurtA += Math.floor(battle_hurt.hurtA * battleA.burstmax / 100)
        }
        if (battle_hurt.hurtA <= 1) {
            //没伤害
            battle_msg.msg.push('你连对方的防御都破不了,被对方一巴掌给拍死了!')
            battleA.nowblood = 0
            battle_msg.QQ = B
            await ForwardMsg(e, battle_msg.msg)
            break
        }
        battleB.nowblood = battleB.nowblood - battle_hurt.hurtA
        if (battleB.nowblood < 0) {
            battle_msg.msg.push(`第${battle.Z}回合:你造成${battle_hurt.hurtA}伤害,并击败了对方!`)
            battle_msg.msg.push('你击败了对方!')
            battleB.nowblood = 0
            await ForwardMsg(e, battle_msg.msg)
            break
        } else {
            battle_msg.msg.push(`第${battle.Z}回合:你造成${battle_hurt.hurtA}伤害`)
        }
    }
    battle_msg.msg.push(`血量剩余:${battleA.nowblood}`)
    await Write_battle(A, battleA)
    await Write_battle(B, battleB)
    return battle_msg.QQ
}
//暴击率
export const battle_probability = async (P) => {
    let newp = P
    if (newp > 100) {
        newp = 100
    }
    if (newp < 0) {
        newp = 0
    }
    const rand = Math.floor((Math.random() * (100 - 1) + 1))
    if (newp > rand) {
        return true
    }
    return false
}


/**
 * 根据名字返回物品
 */
export const search_thing_name = async (thing) => {
    let all = await returnAll()
    const ifexist0 = all.find(item => item.name == thing)
    if (!ifexist0) {
        return 1
    }
    return ifexist0
}
/**
 * 根据id返回物品
 */
export const search_thing_id = async (thing_id) => {
    let all = await returnAll()
    const ifexist0 = all.find(item => item.id == thing_id)
    if (!ifexist0) {
        return 1
    } else {
        return ifexist0
    }
}
//根据id搜储物袋物品
export const exist_najie_thing_id = async (uid, thing_id) => {
    const najie = await Read_najie(uid)
    const ifexist = najie.thing.find(item => item.id == thing_id)
    if (!ifexist) {
        return 1
    }
    return ifexist
}


//根据名字搜储物袋物品
export const exist_najie_thing_name = async (uid, name) => {
    const najie = await Read_najie(uid)
    const ifexist = najie.thing.find(item => item.name == name)
    if (!ifexist) {
        return 1
    }
    return ifexist
}
//给储物袋添加物品
export const Add_najie_thing = async (najie, najie_thing, thing_acount) => {
    const thing = najie.thing.find(item => item.id == najie_thing.id)
    if (thing) {
        let acount = thing.acount + thing_acount
        if (acount < 1) {
            najie.thing = najie.thing.filter(item => item.id != najie_thing.id)
        } else {
            najie.thing.find(item => item.id == najie_thing.id).acount = acount
        }
        return najie
    } else {
        najie_thing.acount = thing_acount
        najie.thing.push(najie_thing)
        return najie
    }
}
//发送转发消息
export const ForwardMsg = async (e, data) => {
    const msgList = []
    for (let i of data) {
        msgList.push({
            message: i,
            nickname: Bot.nickname,
            user_id: Bot.uin,
        })
    }
    if (msgList.length == 1) {
        await e.reply(msgList[0].message)
    } else {
        await e.reply(await Bot.makeForwardMsg(msgList))
    }
    return
}
/**
 * 对象数组排序
 * 从大到小
 */
export const sortBy = (field) => {
    return function (b, a) {
        return a[field] - b[field]
    }
}
/**
 * 输入概率随机返回布尔类型数据
 */
export const probability = (P) => {
    //概率为1-100
    if (P > 100) { P = 100 }
    if (P < 0) { P = 0 }
    const rand = Math.floor((Math.random() * (100 - 1) + 1))
    //命中
    if (rand < P) {
        return true
    }
    return false
}
//输入物品随机返回元素
export const Anyarray = (ARR) => {
    const randindex = Math.trunc(Math.random() * ARR.length)
    return ARR[randindex]
}
//沉睡
export const sleep = async (time) => {
    return new Promise(resolve => {
        setTimeout(resolve, time)
    })
}
// 时间转换
export const timestampToTime = (timestamp) => {
    //时间戳为10位需*1000,时间戳为13位的话不需乘1000
    const date = new Date(timestamp)
    const Y = date.getFullYear() + '-'
    const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
    const D = date.getDate() + ' '
    const h = date.getHours() + ':'
    const m = date.getMinutes() + ':'
    const s = date.getSeconds()
    return Y + M + D + h + m + s
}
//根据时间戳获取年月日时分秒
export const shijianc = async (time) => {
    const dateobj = {}
    const date = new Date(time)
    dateobj.Y = date.getFullYear()
    dateobj.M = date.getMonth() + 1
    dateobj.D = date.getDate()
    dateobj.h = date.getHours()
    dateobj.m = date.getMinutes()
    dateobj.s = date.getSeconds()
    return dateobj
}
/**
 * 艾特并返回QQ
 */
export const At = async (e) => {
    const isat = e.message.some((item) => item.type === 'at')
    if (!isat) {
        return 0
    }
    const atItem = e.message.filter((item) => item.type === 'at')
    const B = atItem[0].qq
    const ifexistplay = await existplayer(B)
    if (!ifexistplay) {
        return 0
    }
    return B
}
/**
 * 判断对象是否不为undefined且不为null
 * @param obj 对象
 * @returns obj==null/undefined,return false,other return true
 */
export const isNotNull = (obj) => {
    if (obj == undefined || obj == null)
        return false
    return true
}
export const isNotBlank = (value) => {
    if (value ?? '' !== '') {
        return true
    } else {
        return false
    }
}
/**
 * 强制修正至少为1
 */
export const Numbers = async (value) => {
    let size = value
    if (isNaN(parseFloat(size)) && !isFinite(size)) {
        size = 1
    }
    size = Number(Math.trunc(size))
    if (size == null || size == undefined || size < 1 || isNaN(size)) {
        size = 1
    }
    return Number(size)
}
/**
 * 得到状态
 */
export const getPlayerAction = async (uid) => {
    const arr = {}
    let action = await redis.get(`xiuxian:player:${uid}:action`)
    action = JSON.parse(action)
    if (action != null) {
        const action_end_time = action.end_time
        const now_time = new Date().getTime()
        if (now_time <= action_end_time) {
            const m = parseInt((action_end_time - now_time) / 1000 / 60)
            const s = parseInt(((action_end_time - now_time) - m * 60 * 1000) / 1000)
            arr.action = action.action//当期那动作
            arr.time = m + 'm' + s + 's'//剩余时间
            return arr
        }
    }
    arr.action = '空闲'
    return arr
}
/**
 * 关闭状态
 */
export const offaction = async (qq) => {
    const exists = await redis.exists(`xiuxian:player:${qq}:action`)
    if (exists == 1) {
        await redis.del(`xiuxian:player:${qq}:action`)
    }
    return
}
/**
 * 状态封锁查询
 */
export const Gomini = async (e) => {
    const uid = e.user_id
    const ifexistplay = await existplayer(uid)
    if (!ifexistplay) {
        return false
    }
    let action = await redis.get(`xiuxian:player:${uid}:action`)
    if (action != undefined) {
        action = JSON.parse(action)
        if (action.actionName == undefined) {
            e.reply('存在旧版本残留,请联系主人使用[#修仙删除数据]')
            return false
        }
        e.reply(action.actionName + '中...')
        return false
    }
    return true
}

/**
 * 状态封锁查询
 */
export const Go = async (e) => {
    const uid = e.user_id
    const ifexistplay = await existplayer(uid)
    if (!ifexistplay) {
        return false
    }
    let action = await redis.get(`xiuxian:player:${uid}:action`)
    if (action != undefined) {
        action = JSON.parse(action)
        if (action.actionName == undefined) {
            e.reply('旧版数据残留,请联系主人使用[#修仙删除数据]')
            return false
        }
        e.reply(`${action.actionName}中...`)
        return false
    }
    const player = await Read_battle(uid)
    if (player.nowblood <= 1) {
        e.reply('血量不足...')
        return false
    }
    return true
}

export const pluginGo = async (uid) => {
    let action = await redis.get(`xiuxian:player:${uid}:action`)
    if (action != undefined) {
        action = JSON.parse(action)
        if (action.actionName == undefined) {
            return {
                'actoin': '1',
                'msg': `旧版数据残留,请联系主人使用[#修仙删除数据]`
            }
        }
        return {
            'actoin': '1',
            'msg': `${action.actionName}中...`
        }
    }
    const player = await Read_battle(uid)
    if (player.nowblood <= 1) {
        return {
            'actoin': '1',
            'msg': `血量不足`
        }
    }
    return {
        'actoin': '0',
        'msg': ``
    }
}

export const pluginGoMini = async (uid) => {
    let action = await redis.get(`xiuxian:player:${uid}:action`)
    if (action != undefined) {
        action = JSON.parse(action)
        if (action.actionName == undefined) {
            return {
                'actoin': '1',
                'msg': `旧版数据残留,请联系主人使用[#修仙删除数据]`
            }
        }
        return {
            'actoin': '1',
            'msg': `${action.actionName}中...`
        }
    }
    const player = await Read_battle(uid)
    if (player.nowblood <= 1) {
        return {
            'actoin': '1',
            'msg': `血量不足`
        }
    }
    return {
        'actoin': '0',
        'msg': ``
    }
}





/**
 * 冷却检测
 */
export const GenerateCD = async (uid, CDid) => {
    const remainTime = await redis.ttl(`xiuxian:player:${uid}:${CDid}`)
    const time = {
        h: 0,
        m: 0,
        s: 0
    }
    if (remainTime != -1) {
        time.h = Math.floor(remainTime / 60 / 60)
        time.h = time.h < 0 ? 0 : time.h
        time.m = Math.floor((remainTime - time.h * 60 * 60) / 60)
        time.m = time.m < 0 ? 0 : time.m
        time.s = Math.floor((remainTime - time.h * 60 * 60 - time.m * 60))
        time.s = time.s < 0 ? 0 : time.s
        if (time.h == 0 && time.m == 0 && time.s == 0) {
            return 0
        }
        return `${CDname[CDid]}冷却${time.h}h${time.m}m${time.s}s`
    }
    return 0
}
//插件CD检测
export const GenerateCDplugin = async (uid, CDid, CDnameplugin) => {
    const remainTime = await redis.ttl(`xiuxian:player:${uid}:${CDid}`)
    const time = {
        h: 0,
        m: 0,
        s: 0
    }
    if (remainTime != -1) {
        time.h = Math.floor(remainTime / 60 / 60)
        time.h = time.h < 0 ? 0 : time.h
        time.m = Math.floor((remainTime - time.h * 60 * 60) / 60)
        time.m = time.m < 0 ? 0 : time.m
        time.s = Math.floor((remainTime - time.h * 60 * 60 - time.m * 60))
        time.s = time.s < 0 ? 0 : time.s
        if (time.h == 0 && time.m == 0 && time.s == 0) {
            return 0
        }
        return `${CDnameplugin[CDid]}冷却${time.h}h${time.m}m${time.s}s`
    }
    return 0
}

//判断两者是否可以交互
export const interactive = async (A, B) => {
    const a = await Read_action(A)
    const b = await Read_action(B)
    //198=1.98=1
    a.x = Math.floor(a.x / 100)
    a.y = Math.floor(a.y / 100)
    //145/100=1.45=1
    b.x = Math.floor(b.x / 100)
    b.y = Math.floor(b.y / 100)
    if (a.x == b.x && b.y == b.y) {
        return true
    }
    return false
}
//判断两者距离
export const distance = async (A, B) => {
    const a = await Read_action(A)
    const b = await Read_action(B)
    const h = Math.pow(Math.pow((a.x - b.x), 2) + Math.pow((a.y - b.y), 2), 1 / 2)
    return h
}
//两者距离
export const map_distance = async (A, B) => {
    const h = Math.pow(Math.pow((A.x - B.x1), 2) + Math.pow((A.y - B.y1), 2), 1 / 2)
    return h
}
//输入：模糊搜索名字并判断是否在此地
export const point_map = async (action, addressName) => {
    const point = await returnPoint()
    let T = false
    point.forEach((item, index, arr) => {
        //存在模糊
        if (item.name.includes(addressName)) {
            //且位置配对
            if (action.x == item.x && action.y == item.y) {
                T = true
            }
        }
    })
    return T
}