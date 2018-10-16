import Commander from "./class.commander";
import Command from "../interface/interface.command";
import ChatBot from "./class.main";
import ChatData from "./chat/class.chatData";
import Message from "./class.message";
import db from "../db/class.db";

class Channel {
  name: string;
  commander: Commander;

  constructor(name) {
    this.name = name;
    this.commander = new Commander();
    this.init();

    db.client.hget(db.commandKeyName(name), (err, data) => {
      if (err === null && data !== null) {
        Object.keys(data).map(key => {
          this.commander.add(key, data[key]);
        });
      }
    });
  }

  public clear() {
    this.commander.clear();
    db.commandRemoveAll(this.name);
    this.init();
  }
  private init() {
    //관리자 기본
    this.commander.add("추가", "", true, true);
    this.commander.add("삭제", "", true, true);
    this.commander.add("초기화", "", true, true);
    this.commander.add("벤", "", true, true);
    this.commander.add("언벤", "", true, true);

    //일반 사용자 기본
    this.commander.add("명령어", "", false, true);
    this.commander.add("업타임", "{UPTIME}");
    this.commander.add("게임", "{GAME}");
    this.commander.add("방제", "{TITLE}");
  }

  public async setBan(input: string[]): Promise<string> {
    let msg = await this.ban(input);
    return await msg;
  }
  private async ban(input: string[]) {
    let msg: string;
    if (input[1] === undefined) msg = "차단할 유저 아이디를 입력해주세요.";
    else {
      msg = await ChatBot.client
        .ban(this.name, input[1], input[2] || "")
        .then(data => {
          let msg = `[ ${input[1]} ]님을 추방시켰습니다.`;
          if (input[2] !== undefined) msg += ` (${input[2]})`;
          return msg;
        })
        .catch(data => {
          if (data == "bad_unban_no_ban") return `[ ${input[1]} ]님은 이미 벤상태 입니다.`;
          else return `명령실패 : ${data}`;
        });
    }
    return await msg;
  }

  public async setUnban(input: string[]): Promise<string> {
    let msg = await this.unban(input);
    return await msg;
  }
  private async unban(input: string[]) {
    let msg: string;
    if (input[1] === undefined) msg = "해제 하실 유저 아이디를 입력해주세요.";
    else {
      msg = await ChatBot.client
        .unban(this.name, input[1], input[2] || "")
        .then(data => {
          return `[ ${input[1]} ]님의 벤을 해제 했습니다.`;
        })
        .catch(data => {
          if (data == "bad_unban_no_ban") return `[ ${input[1]} ]님은 벤 상태가 아닙니다.`;
          else return `명령실패 : ${data}`;
        });
    }
    return await msg;
  }
}
export default Channel;
