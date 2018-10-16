import db from "./db/class.db";

import ChatBot from "./class/class.main";

new db();
let chat = new ChatBot();
chat.setPrifix("!");

let client = chat.makeClient("섭봇", ["k2pr", "ll1x"]);

client.on("message", (channelName, context, msg, self) => {
  console.log(channelName);
  if (context["message-type"] == "chat") chat.onMessageHandler(channelName, context, msg, self);
});
client.on("connected", chat.onConnectedHandler);

client.connect();
