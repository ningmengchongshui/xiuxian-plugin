import plugin from '../../../../lib/plugins/plugin.js'
import { Go,GenerateCD,__PATH,At,battle,interactive,distance,
    Read_equipment,Anyarray,Write_equipment,search_thing_name,Read_najie,
    Add_najie_thing, Write_najie } from '../Xiuxian/Xiuxian.js'
export class Battle extends plugin {
    constructor() {
        super({
            name: 'Battle',
            dsc: 'Battle',
            event: 'message',
            priority: 600,
            rule: [
                {
                    reg: '^#攻击.*$',
                    fnc: 'Attack'
                }
            ]
        })
    };

    //攻击
    async Attack(e) {
        let good=await Go(e);
        if (!good) {
            return;
        };
        let A = e.user_id;
        let B = await At(e);
        if(B==0||B==A){
            return;
        };
        let CDid = "0";
        let now_time = new Date().getTime();
        let CDTime = 5;
        let CD = await GenerateCD(A, CDid);
        if(CD != 0) {
            e.reply(CD);
        };
        let qq=0;
        if(await interactive(A,B)){
            qq=await battle(e,A, B);
        }
        if(qq==0){
            let h=await distance(A,B);
            e.reply("他离你"+Math.floor(h)+"里！");
        }
        else{
            //根据QQ掉落物品
            let p=Math.floor((Math.random() * (99-1)+1));
            //如果真，掉物品
            if(p>80){
                if(qq!=A){
                    let C=A;
                    A=B;
                    B=C;
                }
                let equipment = await Read_equipment(B);
                //随机获得里面的名字
                if(equipment.length>0){
                let thing=await Anyarray(equipment);
                let thing_name=thing.name;
                    equipment = equipment.filter(item => item.name != thing_name);
                    await Write_equipment(B, equipment);
                let searchsthing = await search_thing_name(thing_name);
                if (searchsthing == 1) {
                    e.reply("世界没有" + thing_name);
                    return;
                }
                //把物品丢给A
                let najie = await Read_najie(A);
                najie = await Add_najie_thing(najie, searchsthing, 1);
                await Write_najie(A, najie);
                e.reply(A+"夺走了"+thing_name);
                }
            }
        }
        await redis.set("xiuxian:player:" + A + ':'+CDid, now_time);
        await redis.expire("xiuxian:player:" + A +':'+ CDid, CDTime*60);
        return;
    }
}




