import robotapi from "../../model/robot/api/api.js"
import { superIndex } from "../../model/robot/api/api.js"
import { BotApi } from '../../model/robot/api/botapi.js'
import gameApi from '../../model/api/api.js'
export class boxadminwork extends robotapi {
    constructor() {
        super(superIndex([
            {
                reg: '^#修仙数据$',
                fnc: 'dataBackups'
            },
            {
                reg: '^#修仙复原.*$',
                fnc: 'dataRecovery'
            }
        ]))
    }
    dataBackups = async (e) => {
        if (!e.isMaster) {
            return
        }
        await BotApi.User.forwardMsg({ e, data: gameApi.viewbackups() })
        return
    }
    dataRecovery = async (e) => {
        if (!e.isMaster) {
            return
        }
        await BotApi.User.forwardMsg({ e, data: gameApi.backuprecovery({ name: e.msg.replace('#修仙复原', '') }) })
        return
    }
}