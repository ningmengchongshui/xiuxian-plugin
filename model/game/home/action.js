import listdata from '../data/listdata.js'
import GamePublic from '../public/index.js'
import User from './user.js'
class userAction {
  userextensionhome = (parameter) => {
    const { UID } = parameter
    const home = listdata.controlAction({
      NAME: UID,
      CHOICE: 'user_home_user'
    })
    const homelevel = home.homelevel
    if (homelevel > 9) {
      return { homemsg: `你的家园等级已经到达目前最高级，请等待后续等级开放!` }
    }
    let thing_nameg
    let thing_nameh = '木板'
    let h = 40 * Math.pow(2, homelevel)
    let g = 40
    const map = {
      0: '焦煤',
      1: '焦煤',
      2: '焦煤',
      3: '玄铁',
      4: '玄铁',
      5: '玄铁',
      6: '火铜',
      7: '火铜',
      8: '熔岩',
      9: '熔岩'
    }
    thing_nameg = map[homelevel]
    const searchsthing = User.userWarehouseSearch({
      UID: UID,
      name: thing_nameg
    })
    const searchsthingh = User.userWarehouseSearch({
      UID: UID,
      name: thing_nameh
    })
    if (searchsthing == undefined) {
      return { homemsg: `你的仓库里没有${thing_nameg}!` }
    }
    if (searchsthingh == undefined) {
      return { homemsg: `你的仓库里没有${thing_nameh}!` }
    }
    let x = g - searchsthing.acount
    let y = h - searchsthingh.acount
    if (searchsthing.acount < g) {
      return {
        homemsg: `你的${thing_nameg}不够，还需要筹备${x}块${thing_nameg}!`
      }
    }
    if (searchsthingh.acount < h) {
      return {
        homemsg: `你的${thing_nameh}不够，还需要筹备${y}块${thing_nameh}!`
      }
    }
    let homeexperience = home.homeexperience
    let homeexperienceMax = home.homeexperienceMax
    let doge = home.doge
    let money = 10000 * Math.trunc(homelevel) + 10000
    if (homeexperience < homeexperienceMax) {
      let x = homeexperienceMax - homeexperience
      return { homemsg: `你的家园经验不够!要升级还缺${x}家园经验` }
    }
    if (doge < money) {
      let x = money - doge
      return {
        homemsg: `这点灵晶可请不动建筑队帮扩建家园哦!要想请动他们，还缺${x}灵晶`
      }
    } else {
      const time = (Math.trunc(homelevel) + 1) * 10
      const now_time = new Date().getTime()
      const actionObject = {
        actionName: '扩建',
        startTime: now_time,
        time1: time
      }
      GamePublic.setAction(UID, actionObject)
      User.userWarehouse({
        UID: UID,
        name: thing_nameg,
        ACCOUNT: -g
      })
      User.userWarehouse({
        UID: UID,
        name: thing_nameh,
        ACCOUNT: -h
      })
      User.Add_doge({ UID: UID, money: -money })
      return { homemsg: `建筑队正在扩建家园，预计需要${time}秒` }
    }
  }
}
export default new userAction()
