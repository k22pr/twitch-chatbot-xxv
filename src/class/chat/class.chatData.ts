import Command from "../../interface/interface.command";
import Channel from "../class.channel";
import ChatBot from "../class.main";
import dateFormat from "dateformat";
import DateDiff from "date-diff";
import db from "../../db/class.db";

class ChatData {
  input: string[];
  channel: Channel;
  user: any;
  private command: Command;

  constructor(channel: Channel, user: any) {
    this.channel = channel;
    this.user = user;
  }

  public async commandConfig(): Promise<boolean> {
    if (this.command.static) return this.runCommandStatic();
    else return this.runCommand();
  }

  private async runCommandStatic() {
    switch (this.command.command) {
      case "추가":
        if (this.input[1] === "") return this.error("추가 할 명령어를 입력해 주세요.");
        else if (this.channel.commander.isStatic(this.input[1])) return this.error("변경할 수 없는 명령어 입니다.");
        else if (this.input[2] === "") return this.error(`${this.input[1]}에 응답을 입력해 주세요.`);
        else {
          let respone = "";
          for (var i = 2; i < this.input.length; i++) {
            respone += `${this.input[i]} `;
          }

          //실제 데이터를 편집하는 부분
          this.channel.commander.add(this.input[1], respone);
          db.commandAdd(this.channel, this.input[1], respone);

          return this.setRespone(`!${this.input[1]} 명령어가 추가되었습니다.`);
        }
        break;
      case "삭제":
        if (this.channel.commander.isStatic(this.input[1])) return this.error("변경할 수 없는 명령어 입니다.");
        else if (!this.channel.commander.isset(this.input[1])) return this.error("해당 명령어가 없습니다.");
        else {
          this.channel.commander.remove(this.input[1]);
          db.commandRemove(this);
          return this.setRespone(`!${this.input[1]} 명령어가 삭제되었습니다.`);
        }
        break;
      case "초기화":
        this.channel.clear();
        return this.setRespone("사용자 지정 명령어가 모두 삭제되었습니다.");
        break;
      case "명령어":
        //this.send(JSON.stringify(chatdata));
        let msg = `총 ${this.channel.commander.defaultCommandLength()}개 - `;
        this.channel.commander.commands.map(now => {
          !now.admin ? (msg += ` !${now.command},`) : false;
        });

        msg = msg.slice(0, msg.length - 1);

        return this.setRespone(msg);
        break;
      case "벤":
        msg = await this.channel.setBan(this.input);
        break;
      case "언벤":
        msg = await this.channel.setUnban(this.input);
        break;
      default:
        return this.error(`[ ${this.command.command} ]는 정의되었지만 찾을 수 없는 명령어 입니다.`);
        break;
    }
  }
  private runCommand(): boolean {
    switch (this.command.respone) {
      case "{TITLE}":
        if (this.input[1] !== undefined && this.isAdmin()) {
          //chatdata.setTitle();
          return this.error("추가 권한이 필요하여 준비중 입니다.");
        }
        break;
    }
  }

  public async responeReg() {
    const REGEXP = /\{.*\}/;
    if (this.command.respone === "") return false;
    else if (!REGEXP.test(this.command.respone)) return false;

    switch (this.command.respone) {
      case "{UPTIME}":
        let stream = await ChatBot.api.getStreamById(this.user["room-id"]);
        console.log(stream);
        this.command.respone = stream === undefined || stream === null ? ChatBot.config.DEFAULT_NOT_STREAMING : this.makeDate(stream.started_at);
        break;
      case "{GAME}":
        let game = await ChatBot.api.getGamesByStreamId(this.user["room-id"]);
        this.command.respone = game === undefined || game === null ? ChatBot.config.DEFAULT_NOT_STREAMING : game.name;
        break;
      case "{TITLE}":
        stream = await ChatBot.api.getStreamById(this.user["room-id"]);
        this.command.respone = stream === undefined || stream === null ? ChatBot.config.DEFAULT_NOT_STREAMING : stream.title;
        break;
    }

    return await true;
  }

  public setTitlePromise(): Promise<any> {
    return new Promise((resolve, reject) => {
      ChatBot.api.channels.updateChannel({ channelID: this.user["room-id"], status: "test" }, (err, res) => {
        if (err != null) reject(err);
        resolve(res);
      });
    });
  }

  public makeDate(updated): string {
    const date = new Date(updated);
    const now = new Date();
    const diff = new DateDiff(now, date);
    let diffString = "";
    if (diff.days() >= 1) diffString += `${Math.floor(diff.days())}일 `;
    if (diff.hours() >= 1) diffString += `${Math.floor(diff.hours()) % 24}시간 `;
    if (diff.minutes() >= 1) diffString += `${Math.floor(diff.minutes()) % 60}분 `;
    if (diff.seconds() >= 1) diffString += `${Math.floor(diff.seconds()) % 60}초 전`;

    return dateFormat(date, `${diffString} (mm-dd HH:MM)`);
  }

  public getCommand(): Command {
    return this.command;
  }
  public isCommand() {
    return this.command ? true : false;
  }
  public setCommand(input: string[]) {
    this.input = input;
    if (this.channel.commander.isset(input[0])) {
      let nowCommand = this.channel.commander.find(input[0]);
      //관리자만 할 수 있는 명령어인 경우
      if (nowCommand.admin && this.isAdmin()) {
        this.command = nowCommand;
      } else if (!nowCommand.admin) {
        this.command = nowCommand;
      }
    }
  }

  isAdmin(): boolean {
    //195692100
    if (this.user.mod || (this.user.badges != null && this.user.badges.broadcaster) || this.user["user-id"] === "1") return true;
    else return false;
  }

  error(ment: string): boolean {
    this.command.respone = `[ 실패 ] ${ment}`;
    return false;
  }
  setRespone(ment: string): boolean {
    this.command.respone = ment;
    return true;
  }
  getRespone(): string {
    return this.command.respone;
  }
  /*
  constructor(channel: Channel, input: string[], user: object) {
    this.channel = channel;
    this.input = input;
    this.user = user;
    //this.command = new Command();
  }*/
}

export default ChatData;
