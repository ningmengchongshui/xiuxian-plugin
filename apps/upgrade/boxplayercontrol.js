import robotapi from "../../model/robot/api/api.js"
import { superIndex } from "../../model/robot/api/api.js"
import gameApi from '../../model/api/api.js'
import { BotApi } from '../../model/robot/api/botapi.js'
export class boxplayercontrol extends robotapi {
    constructor() {
        super(superIndex([
            {
                reg: '#降妖$',
                fnc: 'dagong'
            },
            {
                reg: '#闭关$',
                fnc: 'biguan'
            },
            {
                reg: '^#出关$',
                fnc: 'chuGuan'
            },
            {
                reg: '^#归来$',
                fnc: 'endWork'
            }
        ]))
    }
    biguan = async (e) => {
        if (!await gameApi.existUserSatus({ UID: e.user_id })) {
            e.reply('已死亡')
            return
        }
        const { MSG } = await gameApi.GoMini({ UID: e.user_id })
        if (MSG) {
            e.reply(MSG)
            return
        }
        const UID = e.user_id
        const now_time = new Date().getTime()
        const actionObject = {
            'actionName': '闭关',
            'startTime': now_time
        }
        await redis.set(`xiuxian:player:${UID}:action`, JSON.stringify(actionObject))
        e.reply('开始两耳不闻窗外事...')
        return true
    }
    dagong = async (e) => {
        if (!await gameApi.existUserSatus({ UID: e.user_id })) {
            e.reply('已死亡')
            return
        }
        const { MSG } = await gameApi.Go({ UID: e.user_id })
        if (MSG) {
            e.reply(MSG)
            return
        }
        const UID = e.user_id
        const now_time = new Date().getTime()
        const actionObject = {
            'actionName': '降妖',
            'startTime': now_time
        }
        await redis.set(`xiuxian:player:${UID}:action`, JSON.stringify(actionObject))
        e.reply('开始外出...')
        return true
    }
    chuGuan = async (e) => {
        if (!e.isGroup) {
            return
        }
        const UID = e.user_id
        if (!await gameApi.existUserSatus({ UID })) {
            e.reply('已死亡')
            return
        }
        let action = await redis.get(`xiuxian:player:${UID}:action`)
        if (action == undefined) {
            return
        }
        action = JSON.parse(action)
        if (action.actionName != '闭关') {
            return
        }
        const startTime = action.startTime
        const timeUnit = gameApi.getConfig({ app: 'parameter', name: 'cooling' }).biguan.time
        const time = Math.floor((new Date().getTime() - startTime) / 60000)
        if (time < timeUnit) {
            e.reply('只是呆了一会儿...')
            await gameApi.offAction({ UID })
            return
        }
        await gameApi.offAction({ UID })
        await this.upgrade(UID, time, action.actionName, e)
        return
    }
    endWork = async (e) => {
        if (!e.isGroup) {
            return
        }
        const UID = e.user_id
        if (! await gameApi.existUserSatus({ UID })) {
            e.reply('已死亡')
            return
        }
        let action = await redis.get(`xiuxian:player:${UID}:action`)
        if (action == undefined) {
            return
        }
        action = JSON.parse(action)
        if (action.actionName != '降妖') {
            return
        }
        const startTime = action.startTime
        const timeUnit = gameApi.getConfig({ app: 'parameter', name: 'cooling' }).work.time
        const time = Math.floor((new Date().getTime() - startTime) / 60000)
        if (time < timeUnit) {
            e.reply('只是呆了一会儿...')
            await gameApi.offAction({ UID })
            return
        }
        await gameApi.offAction({ UID })
        await this.upgrade(UID, time, action.actionName, e)
        return
    }
    upgrade = async (user_id, time, name, e) => {
        const UID = user_id
        const talent = await gameApi.userMsgAction({ NAME: UID, CHOICE: 'user_talent' })
        const mybuff = Math.floor(talent.talentsize / 100) + Number(1)
        let other = 0
        e.reply([BotApi.segment.at(UID)])
        const msg = []
        const rand = Math.floor((Math.random() * (100 - 1) + 1))
        if (name == '闭关') {
            if (rand < 20) {
                other = Math.floor(gameApi.getConfig({ app: 'parameter', name: 'cooling' }).biguan.size * time * mybuff / 2)
                msg.push(`\n闭关迟迟无法入定,只得到了${other}修为`)
            } else {
                other = Math.floor(gameApi.getConfig({ app: 'parameter', name: 'cooling' }).biguan.size * time * mybuff)
                msg.push(`\n闭关结束,得到了${other}修为`)
            }
            await gameApi.updataUser({ UID, CHOICE: 'user_level', ATTRIBUTE: 'experience', SIZE: other })
        } else {
            if (rand < 20) {
                other = Math.floor(gameApi.getConfig({ app: 'parameter', name: 'cooling' }).work.size * time * mybuff / 2)
                msg.push(`\n降妖不专心,只得到了${other}气血`)
            } else {
                other = Math.floor(gameApi.getConfig({ app: 'parameter', name: 'cooling' }).work.size * time * mybuff)
                msg.push(`\n降妖回来,得到了${other}气血`)
            }
            await gameApi.updataUser({ UID, CHOICE: 'user_level', ATTRIBUTE: 'experiencemax', SIZE: other })
        }
        await gameApi.updataUserBlood({ UID, SIZE: Number(90) })
        msg.push('\n血量恢复至90%')
        msg.push('\n' + name + '结束')
        await BotApi.User.forwardMsg({ e, data: msg })
        return
    }
}