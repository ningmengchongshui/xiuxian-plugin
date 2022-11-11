import plugin from "../../../../lib/plugins/plugin.js"
import Show from "../../model/show.js"
import puppeteer from "../../../../lib/puppeteer/puppeteer.js"
import config from "../../model/Config.js"
import data from '../../model/XiuxianData.js'
import {
    talentname, Read_battle,
    Read_player, Read_wealth, Read_talent,
    Read_equipment, Read_level, Read_najie, Read_Life, existplayer
} from '../Xiuxian/Xiuxian.js';
export class showData extends plugin {
    constructor(e) {
        super({
            name: "showData",
            dsc: "showData",
            event: "message",
            priority: 600,
            rule: [
                {
                    reg: "^#练气境界$",
                    fnc: "show_Level",
                },
                {
                    reg: "^#炼体境界$",
                    fnc: "show_LevelMax",
                },
                {
                    reg: "^#修仙地图$",
                    fnc: "show_map",
                },
                {
                    reg: "^#修仙版本$",
                    fnc: "show_updata",
                }
            ]
        })
    }

    async show_Level(e) {
        let img = await get_state_img(e);
        e.reply(img);
        return;
    }
    async show_LevelMax(e) {
        let img = await get_statemax_img(e);
        e.reply(img);
        return;
    }
    async show_map(e){
        let img = await get_map_img(e);
        e.reply(img);
        return;
    }
    async show_updata(e) {
        let img = await get_updata_img(e);
        e.reply(img);
        return;
    }
}

export async function get_state_img(e) {
    let usr_qq = e.user_id;
    let ifexistplay = await existplayer(usr_qq);
    if (!ifexistplay) {
        return;
    }
    let player = await Read_level(usr_qq);
    let Level_id = player.level_id;
    let Level_list = data.Level_list;
    for (var i = 1; i <= 60; i++) {
        if (i > Level_id && i < Level_id + 5) {
            continue;
        }
        Level_list = await Level_list.filter(item => item.id != i);
    }
    let myData = {
        name: "炼气境界",
        user_id: usr_qq,
        Level_list: Level_list
    }
    const data1 = await new Show(e).get_Data("state", "state", myData);
    let img = await puppeteer.screenshot("state", {
        ...data1,
    });
    return img;

}

export async function get_statemax_img(e) {
    let usr_qq = e.user_id;
    let ifexistplay = await existplayer(usr_qq);
    if (!ifexistplay) {
        return;
    }
    let player = await Read_level(usr_qq);
    let Level_id = player.levelmax_id;
    let LevelMax_list = data.LevelMax_list;
    for (var i = 1; i <= 60; i++) {
        if (i > Level_id && i < Level_id + 5) {
            continue;
        }
        LevelMax_list = await LevelMax_list.filter(item => item.id != i);
    }
    let myData = {
        name: "炼体境界",
        user_id: usr_qq,
        Level_list: LevelMax_list
    }
    const data1 = await new Show(e).get_Data("state", "state", myData);
    let img = await puppeteer.screenshot("statemax", {
        ...data1,
    });
    return img;
}

export async function get_map_img(e) {
    let usr_qq = e.user_id;
    let ifexistplay = await existplayer(usr_qq);
    if (!ifexistplay) {
        return;
    }
    let myData = {};
    const data1 = await new Show(e).get_Data("map", "map", myData);
    let img = await puppeteer.screenshot("map", {
        ...data1,
    });
    return img;
}

let updata = config.getdefSet("version", "version");
export async function get_updata_img(e) {
    let myData = {
        version: updata
    }
    const data1 = await new Show(e).get_Data("updata", "updata", myData);
    let img = await puppeteer.screenshot("updata", {
        ...data1,
    });
    return img;

}


/**
 * 对外的
 */
export async function get_player_img(e) {
    let usr_qq = e.user_id;
    let player = await Read_player(usr_qq);
    let life = await Read_Life();
    life = life.find(item => item.qq == usr_qq);
    let wealt = await Read_wealth(usr_qq);
    let equipment = await Read_equipment(usr_qq);
    let talent = await Read_talent(usr_qq);
    let level = await Read_level(usr_qq);
    let battle = await Read_battle(usr_qq);
    let linggenname = await talentname(talent);
    let name = "";
    for (var i = 0; i < linggenname.length; i++) {
        name = name + linggenname[i];
    }
    if (await talent.talentshow != 0) {
        talent.talentsize = "0";
        name = "未知";
    }
    let myData = {
        user_id: usr_qq,
        life: life,
        player: player,
        level: level,
        linggenname: name,
        battle: battle,
        equipment: equipment,
        lingshi: Math.trunc(wealt.lingshi),
        xianshi: Math.trunc(wealt.xianshi),
        talent: talent,
        talentsize: Math.trunc(talent.talentsize)
    }
    const data1 = await new Show(e).get_Data("User/player", "player", myData);
    let img = await puppeteer.screenshot("player", {
        ...data1,
    });
    return img;

}

export async function get_equipment_img(e) {
    let usr_qq = e.user_id;
    let life = await Read_Life();
    life = life.find(item => item.qq == usr_qq);
    let equipment = await Read_equipment(usr_qq);
    let battle = await Read_battle(usr_qq);
    let myData = {
        user_id: usr_qq,
        battle: battle,
        life: life,
        equipment: equipment
    }
    const data1 = await new Show(e).get_Data("User/equipment", "equipment", myData);
    let img = await puppeteer.screenshot("equipment", {
        ...data1,
    });
    return img;
}

export async function get_najie_img(e) {
    let usr_qq = e.user_id;
    let ifexistplay = await existplayer(usr_qq);
    if (!ifexistplay) {
        return;
    }
    let life = await Read_Life();
    life = life.find(item => item.qq == usr_qq);
    let player = await Read_player(usr_qq);
    let battle = await Read_battle(usr_qq);
    let najie = await Read_najie(usr_qq);

    let thing=najie.thing;
    let danyao_list=[];
    let daoju_list=[];
    //循环与await将会消耗大量算力
    thing.forEach((item,index) => {
        let id = item.id.split('-');
        if (id[0] == 4) {
            danyao_list.push(item);
            thing.splice(index,1);
        }
        else if(id[0] == 6){
            daoju_list.push(item);
            thing.splice(index,1);
        }
    });
    let myData = {
        user_id: usr_qq,
        player: player,
        life: life,
        battle: battle,
        najie: najie,
        thing:thing,
        daoju_list:daoju_list,
        danyao_list:danyao_list
    }
    const data1 = await new Show(e).get_Data("User/najie", "najie", myData);
    let img = await puppeteer.screenshot("najie", {
        ...data1,
    });
    return img;
}

export async function get_toplist_img(e, list) {
    let usr_qq = e.user_id;
    let ifexistplay = await existplayer(usr_qq);
    if (!ifexistplay) {
        return;
    }
    let myData = {
        list: list,
    }
    const data1 = await new Show(e).get_Data("toplist", "toplist", myData);
    let img = await puppeteer.screenshot("toplist", {
        ...data1,
    });
    return img;
}