import redis from "redis";
import dateFormat from "dateformat";
declare function require(name: string);
var asyncRedis = require("async-redis");
import ChatData from "../class/chat/class.chatData";

class db {
  static client;
  constructor() {
    db.client = asyncRedis.createClient();
    db.client.select(4);

    db.client.on("error", err => {
      console.log(`Error : ${err}`);
    });
  }
  static commandAdd(channel, command: string, respone: string) {
    db.client.hset(this.commandKeyName(channel.name), command, respone);
    db.client.expire(this.commandKeyName(channel.name), 60 * 60 * 24 * 30);
  }
  static commandRemove(chatdata: ChatData) {
    db.client.hdel(this.commandKeyName(chatdata.channel.name), chatdata.input[1]);
  }

  static commandRemoveAll(channelName: string) {
    db.client.del(this.commandKeyName(channelName));
  }

  //게임정보
  static async isGame(gameId: string): Promise<boolean> {
    return await db.client.exists(this.gameKeyName(gameId));
  }
  static async getGame(gameId: string) {
    const data = await db.client.get(this.gameKeyName(gameId));
    return JSON.parse(data);
  }

  static setGame(gameId: string, data, expire = 60 * 60 * 24) {
    db.client.set(this.gameKeyName(gameId), JSON.stringify(data));
    db.client.expire(this.gameKeyName(gameId), expire);
  }

  static async isStream(streamId: string): Promise<boolean> {
    return await db.client.exists(this.streamKeyName(streamId));
  }

  //스트리밍 정보
  static async getStream(streamId: string) {
    const data = await db.client.get(this.streamKeyName(streamId));
    return JSON.parse(data);
  }

  static setStream(streamId: string, data, expire = 60) {
    db.client.set(this.streamKeyName(streamId), JSON.stringify(data));
    db.client.expire(this.streamKeyName(streamId), expire);
  }

  //이용자 관련
  static async getUserBlock(user) {
    const key = `${this.userBlockKeyName(user["user-id"])}:*`;
    const list = await db.client.keys(key);
    let data: BlockData[] = [];
    await list.forEach(function(keys, index) {
      let date = new Date(keys.split(":")[3] * 1000);
      let now = db.client.get(keys);
      data.push({ ment: now.ment, date: date, msg: now.msg });
    });
    return await data;
  }

  static async setUserBlock(user, status) {
    let block = {
      ment: status.ment,
      blockPoint: status.blockPoint,
      msg: status.msg
    };
    const key = `${this.userBlockKeyName(user["user-id"])}:${Math.floor(Number(new Date()) / 1000)}`;
    db.client.set(key, JSON.stringify(block));
    db.client.expire(key, 60 * 60 * 24);
  }

  static commandKeyName(channel: string) {
    return `channel:${channel}:command`;
  }

  static gameKeyName(gameId: string) {
    return `games:${gameId}`;
  }

  static streamKeyName(streamId: string) {
    return `streams:${streamId}`;
  }

  static userBlockKeyName(userId: string) {
    return `user:block:${userId}`;
  }
}

interface BlockUser {
  data: string[];
}
interface BlockData {
  ment: string;
  date: Date;
  msg: string;
}

export default db;
