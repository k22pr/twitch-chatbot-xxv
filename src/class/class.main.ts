import tmi from "tmi.js";
import auth from "../config/auth";
import Channel from "./class.channel";
import ChatData from "./chat/class.chatData";
import Inspection from "./chat/class.inspection";
import config from "../config/config";
import Message from "./class.message";
import twitchApi from "./twitch.api";
import db from "../db/class.db";

class ChatBot {
  private commandPrefix: string;
  private channels: Channel[];
  public static client;
  public static api;
  public static config;
  public static db;

  constructor() {
    this.channels = Array();
    this.commandPrefix = "";
    ChatBot.db = new db();
    ChatBot.api = new twitchApi();

    ChatBot.config = config;
  }

  public setPrifix(prefix: string) {
    this.commandPrefix = prefix;
  }

  public makeClient(username: string, channels: string[]): tmi.client {
    let opts = {
      identity: {
        username: username,
        password: `oauth:${auth.oauth}`
      },
      connection: {
        reconnect: true
      },
      channels: channels
    };

    channels.map(now => {
      this.channels.push(new Channel(now));
    });
    ChatBot.client = new tmi.client(opts);
    return ChatBot.client;
  }

  public async onMessageHandler(channelName: string, user: object, msg: string, self) {
    if (self) return;

    let list = msg.split(" ");
    let prefix = list[0].split("")[0];
    list[0] = list[0].slice(1, list[0].length);

    //let chatbox = new ChatData(channelName, list, user);
    let chatdata = new ChatData(this.findChannel(channelName), user);
    chatdata.setCommand(list);

    const message = new Message();
    //console.log(utils.getChannel(channelName, this.channels));
    if (prefix === this.commandPrefix) {
      //console.log(`${prefix} == ${this.commandPrefix}`);
      //해당 채널이 존재하는 경우
      if (this.isChannel(channelName)) {
        //존재하는 명령어인지 확인
        if (chatdata.isCommand()) {
          chatdata.commandConfig();

          //정규식으로 치환
          await chatdata.responeReg();

          //서버에 메세지를 전달합니다.
          message.setSay(chatdata.channel.name, chatdata.getRespone());
        }
        //this.getChannel(channelName).console.log(`${channelName} : ${commandName} / ${input}`);
      }
    } else {
      //관리자가 아닌경우
      if (!chatdata.isAdmin()) {
        var check = new Inspection(chatdata.user, msg).check();
        if (check.block == true) {
          let timeOut: number = 1;
          //사용자에게 메세지를 전달합니다.
          const block = await db.getUserBlock(chatdata.user);
          db.setUserBlock(chatdata.user, check);
          message.setWhisper(chatdata.user.username, `[ ${channelName} ] ${check.ment}`);

          if (block.length >= 3) timeOut = 60;
          else if (block.length === 4) timeOut = 60 * 5;
          else if (block.length >= 5) timeOut = 60 * 60 * 24;

          if (block.length >= 3) {
            message.setWhisper(chatdata.user.username, `[ ${channelName} ]채널의 ${block.length}/5번째 경고`);
            message.setSay(chatdata.channel.name, `[ ${chatdata.user["display-name"]} ]님이 경고 ${block.length}번으로 ${timeOut}초간 퇴장당했습니다.`);
          }

          //잠시 퇴장
          ChatBot.client.timeout(channelName, chatdata.user.username, timeOut, check.ment);
        }
      }
    }
  }

  public onConnectedHandler(addr: string, port: string) {
    console.log(`* Connected to ${addr}:${port}`);
  }

  findChannel(target: string): Channel {
    let find = undefined;
    this.channels.map(now => {
      //console.log(`${now.name} == ${target}`);
      if ("#" + now.name == target) find = now;
    });
    return find;
  }

  isChannel(target: string): boolean {
    if (this.findChannel(target) === undefined) return false;
    else return true;
  }

  addCommand(channel: string, input: string[]) {}
}

export default ChatBot;
