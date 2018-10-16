import ChatBot from "./class.main";
import ChatData from "./chat/class.chatData";
import db from "../db/class.db";

class Message {
  private respone: string;
  private channelName: string;
  private userName: string;

  private async sender() {
    if (this.respone !== "") {
      await ChatBot.client.say(this.channelName, `# ${this.respone}`);
    } else {
      console.log(`not found to respone message`);
    }
  }

  private async whisper() {
    console.log(`wisper : ${this.userName} => ${this.respone}`);
    await ChatBot.client.whisper(this.userName, `${this.respone}`);
  }

  public setRespone(respone: string) {
    this.respone = respone;
  }
  public setChannelName(channelName: string) {
    this.channelName = channelName;
  }
  public setUserName(userName: string) {
    this.userName = userName;
  }
  public setSay(channelName: string, respone: string) {
    this.setChannelName(channelName);
    this.setRespone(respone);
    this.sender();
  }

  public setWhisper(userName: string, respone: string) {
    this.setUserName(userName);
    this.setRespone(respone);
    this.whisper();
  }
}

export default Message;
