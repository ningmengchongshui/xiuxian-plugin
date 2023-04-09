import { BotApi, GameApi, plugin, name, dsc } from "../../../model/api/api.js";
export class BoxInstall extends plugin {
  constructor() {
    super({
      name,
      dsc,
      event: "notice.group.increase",
      priority: 99999,
      rule: [
        {
          fnc: "createinstall",
        },
      ],
    });
  }
  createinstall = async (e) => {
    if (!e.isGroup || e.user_id == 80000000) return false;
    if (!BotApi.User.surveySet({ e })) return false;
    const cf = await GameApi.DefsetUpdata.getConfig({
      app: "parameter",
      name: "cooling",
    });
    const T = cf["switch"] ? cf["switch"]["come"] : true;
    if (!T) {
      return false;
    }
    const UID = e.user_id;
    if (!(await GameApi.GameUser.existUserSatus({ UID }))) {
      e.reply([
        BotApi.segment.at(UID),
        "降临失败...\n请降临者[#再入仙途]后步入轮回!",
      ]);
      return false;
    }
    e.reply([
      BotApi.segment.at(UID),
      "降临成功...\n欢迎降临修仙世界\n请降临者[#修仙帮助]以获得\n《凡人是如何修仙成功的之修仙生存手册之先抱大腿》",
    ]);
    return false;
  };
}