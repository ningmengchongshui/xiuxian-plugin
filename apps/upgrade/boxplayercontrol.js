import robotapi from "../../model/robot/api/api.js"
import { superIndex } from "../../model/robot/api/api.js"
import gameApi from '../../model/api/api.js'
import botApi from '../../model/robot/api/botapi.js'
export class boxplayercontrol extends robotapi {
    constructor() {
        super(superIndex([
            {
                reg: '#降妖$',
                fnc: 'Dagong'
            },
            {
                reg: '#闭关$',
                fnc: 'Biguan'
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
    Biguan = async (e) => {
        const exist = await gameApi.existUserSatus({ UID: e.user_id })
        if (!exist) {
            //如果死了，就直接返回
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
    Dagong = async (e) => {
        const exist = await gameApi.existUserSatus({ UID: e.user_id })
        if (!exist) {
            //如果死了，就直接返回
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
        const exist = await gameApi.existUserSatus({ UID })
        if (!exist) {
            //如果死了，就直接返回
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
        const timeUnit = gameApi.getConfig({ app: 'xiuxian', name: 'xiuxian' }).biguan.time
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
        const exist = await gameApi.existUserSatus({ UID })
        if (!exist) {
            //如果死了，就直接返回
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
        const timeUnit = gameApi.getConfig({ app: 'xiuxian', name: 'xiuxian' }).work.time
        //分钟
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
        e.reply([botApi.segmentAt(UID)])
        const msg = []
        const rand = Math.floor((Math.random() * (100 - 1) + 1))
        if (name == '闭关') {
            if (rand < 20) {
                other = Math.floor(gameApi.getConfig({ app: 'xiuxian', name: 'xiuxian' }).biguan.size * time * mybuff / 2)
                msg.push(`\n闭关迟迟无法入定,只得到了${other}修为`)
            } else {
                other = Math.floor(gameApi.getConfig({ app: 'xiuxian', name: 'xiuxian' }).biguan.size * time * mybuff)
                msg.push(`\n闭关结束,得到了${other}修为`)
            }
            await gameApi.updataUser({ UID, CHOICE: 'user_level', ATTRIBUTE: 'experience', SIZE: other })
        } else {
            if (rand < 20) {
                other = Math.floor(gameApi.getConfig({ app: 'xiuxian', name: 'xiuxian' }).work.size * time * mybuff / 2)
                msg.push(`\n降妖不专心,只得到了${other}气血`)
            } else {
                other = Math.floor(gameApi.getConfig({ app: 'xiuxian', name: 'xiuxian' }).work.size * time * mybuff)
                msg.push(`\n降妖回来,得到了${other}气血`)
            }
            await gameApi.updataUser({ UID, CHOICE: 'user_level', ATTRIBUTE: 'experiencemax', SIZE: other })
        }
        await gameApi.updataUserBlood({ UID, SIZE: Number(90) })
        msg.push('\n血量恢复至90%')
        msg.push('\n' + name + '结束')
        await botApi.forwardMsg({ e, data: msg })
        return
    }
}