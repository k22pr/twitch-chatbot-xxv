"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _class = _interopRequireDefault(require("./db/class.db"));

var _class2 = _interopRequireDefault(require("./class/class.main"));

new _class.default();
var chat = new _class2.default();
chat.setPrifix("!");
var client = chat.makeClient("섭봇", ["k2pr", "ll1x"]);
client.on("message", function (channelName, context, msg, self) {
  console.log(channelName);
  if (context["message-type"] == "chat") chat.onMessageHandler(channelName, context, msg, self);
});
client.on("connected", chat.onConnectedHandler);
client.connect();