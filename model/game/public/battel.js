

import gameUser from '../user/user.js'
import botApi from '../../robot/api/botapi.js'

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
            await gameUser.userMsgAction({ NAME: e.user_id, CHOICE: 'user_battle', DATA: battleA })
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
    await gameUser.userMsgAction({ NAME: e.user_id, CHOICE: 'user_battle', DATA: battleA })
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
            await botApi.forwardMsg({ e, data: battle_msg.msg })
            await gameUser.userMsgAction({ NAME: A, CHOICE: 'user_battle', DATA: battleA })
            return battle_msg.QQ
        }
        battleB.nowblood = battleB.nowblood - battle_hurt.hurtA
        if (battleB.nowblood < 1) {
            battle_msg.msg.push('你仅出一招,就击败了对方!')
            battleB.nowblood = 0
            await botApi.forwardMsg({ e, data: battle_msg.msg })
            await gameUser.userMsgAction({ NAME: B, CHOICE: 'user_battle', DATA: battleB })
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
                await botApi.forwardMsg({ e, data: battle_msg.msg })
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
            await botApi.forwardMsg({ e, data: battle_msg.msg })
            break
        }
        battleB.nowblood = battleB.nowblood - battle_hurt.hurtA
        if (battleB.nowblood < 0) {
            battle_msg.msg.push(`第${battle.Z}回合:你造成${battle_hurt.hurtA}伤害,并击败了对方!`)
            battle_msg.msg.push('你击败了对方!')
            battleB.nowblood = 0
            await botApi.forwardMsg({ e, data: battle_msg.msg })
            break
        } else {
            battle_msg.msg.push(`第${battle.Z}回合:你造成${battle_hurt.hurtA}伤害`)
        }
    }
    battle_msg.msg.push(`血量剩余:${battleA.nowblood}`)
    await gameUser.userMsgAction({ NAME: A, CHOICE: 'user_battle', DATA: battleA })
    await gameUser.userMsgAction({ NAME: B, CHOICE: 'user_battle', DATA: battleB })
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