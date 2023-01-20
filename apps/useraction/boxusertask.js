import robotapi from "../../model/robot/api/api.js"
import { superIndex } from "../../model/robot/api/api.js"
import gameApi from '../../model/api/api.js'
export class boxusertask extends robotapi {
    constructor() {
        super(superIndex([]))
        this.task = {
            cron: gameApi.getConfig({ app: 'task', name: 'task' }).LifeTask,
            name: 'LifeTask',
            fnc: () => this.LevelTask()
        }
    }
    LevelTask = async () => {
        const life = await gameApi.listActionArr({ NAME: 'life', CHOICE: 'user_life' })
        const x = []
        life.forEach((item) => {
            item.Age = item.Age + gameApi.getConfig({ app: 'parameter', name: 'cooling' }).Age.size
            if (item.Age >= item.life) {
                item.status = 0
                x.push(item.qq)
            }
        })
        for (var i = 0; i < x.length; i++) {
            await gameApi.offAction({ UID: [x[i]] })
        }
        await gameApi.userMsgAction({ NAME: 'life', CHOICE: 'user_life', DATA: life })
    }
}

