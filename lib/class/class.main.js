"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _tmi = _interopRequireDefault(require("tmi.js"));

var _auth = _interopRequireDefault(require("../config/auth"));

var _class = _interopRequireDefault(require("./class.channel"));

var _class2 = _interopRequireDefault(require("./chat/class.chatData"));

var _class3 = _interopRequireDefault(require("./chat/class.inspection"));

var _config = _interopRequireDefault(require("../config/config"));

var _class4 = _interopRequireDefault(require("./class.message"));

var _twitch = _interopRequireDefault(require("./twitch.api"));

var _class5 = _interopRequireDefault(require("../db/class.db"));

var ChatBot =
/*#__PURE__*/
function () {
  function ChatBot() {
    (0, _classCallCheck2.default)(this, ChatBot);
    this.channels = Array();
    this.commandPrefix = "";
    ChatBot.db = new _class5.default();
    ChatBot.api = new _twitch.default();
    ChatBot.config = _config.default;
  }

  (0, _createClass2.default)(ChatBot, [{
    key: "setPrifix",
    value: function setPrifix(prefix) {
      this.commandPrefix = prefix;
    }
  }, {
    key: "makeClient",
    value: function makeClient(username, channels) {
      var _this = this;

      var opts = {
        identity: {
          username: username,
          password: "oauth:".concat(_auth.default.oauth)
        },
        connection: {
          reconnect: true
        },
        channels: channels
      };
      channels.map(function (now) {
        _this.channels.push(new _class.default(now));
      });
      ChatBot.client = new _tmi.default.client(opts);
      return ChatBot.client;
    }
  }, {
    key: "onMessageHandler",
    value: function () {
      var _onMessageHandler = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee(channelName, user, msg, self) {
        var list, prefix, chatdata, message, check, timeOut, block;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!self) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt("return");

              case 2:
                list = msg.split(" ");
                prefix = list[0].split("")[0];
                list[0] = list[0].slice(1, list[0].length); //let chatbox = new ChatData(channelName, list, user);

                chatdata = new _class2.default(this.findChannel(channelName), user);
                chatdata.setCommand(list);
                message = new _class4.default(); //console.log(utils.getChannel(channelName, this.channels));

                if (!(prefix === this.commandPrefix)) {
                  _context.next = 17;
                  break;
                }

                if (!this.isChannel(channelName)) {
                  _context.next = 15;
                  break;
                }

                if (!chatdata.isCommand()) {
                  _context.next = 15;
                  break;
                }

                chatdata.commandConfig(); //정규식으로 치환

                _context.next = 14;
                return chatdata.responeReg();

              case 14:
                //서버에 메세지를 전달합니다.
                message.setSay(chatdata.channel.name, chatdata.getRespone());

              case 15:
                _context.next = 29;
                break;

              case 17:
                if (chatdata.isAdmin()) {
                  _context.next = 29;
                  break;
                }

                check = new _class3.default(chatdata.user, msg).check();

                if (!(check.block == true)) {
                  _context.next = 29;
                  break;
                }

                timeOut = 1; //사용자에게 메세지를 전달합니다.

                _context.next = 23;
                return _class5.default.getUserBlock(chatdata.user);

              case 23:
                block = _context.sent;

                _class5.default.setUserBlock(chatdata.user, check);

                message.setWhisper(chatdata.user.username, "[ ".concat(channelName, " ] ").concat(check.ment));
                if (block.length >= 3) timeOut = 60;else if (block.length === 4) timeOut = 60 * 5;else if (block.length >= 5) timeOut = 60 * 60 * 24;

                if (block.length >= 3) {
                  message.setWhisper(chatdata.user.username, "[ ".concat(channelName, " ]\uCC44\uB110\uC758 ").concat(block.length, "/5\uBC88\uC9F8 \uACBD\uACE0"));
                  message.setSay(chatdata.channel.name, "[ ".concat(chatdata.user["display-name"], " ]\uB2D8\uC774 \uACBD\uACE0 ").concat(block.length, "\uBC88\uC73C\uB85C ").concat(timeOut, "\uCD08\uAC04 \uD1F4\uC7A5\uB2F9\uD588\uC2B5\uB2C8\uB2E4."));
                } //잠시 퇴장


                ChatBot.client.timeout(channelName, chatdata.user.username, timeOut, check.ment);

              case 29:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function onMessageHandler(_x, _x2, _x3, _x4) {
        return _onMessageHandler.apply(this, arguments);
      };
    }()
  }, {
    key: "onConnectedHandler",
    value: function onConnectedHandler(addr, port) {
      console.log("* Connected to ".concat(addr, ":").concat(port));
    }
  }, {
    key: "findChannel",
    value: function findChannel(target) {
      var find = undefined;
      this.channels.map(function (now) {
        //console.log(`${now.name} == ${target}`);
        if ("#" + now.name == target) find = now;
      });
      return find;
    }
  }, {
    key: "isChannel",
    value: function isChannel(target) {
      if (this.findChannel(target) === undefined) return false;else return true;
    }
  }, {
    key: "addCommand",
    value: function addCommand(channel, input) {}
  }]);
  return ChatBot;
}();

var _default = ChatBot;
exports.default = _default;