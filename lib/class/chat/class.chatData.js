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

var _class = _interopRequireDefault(require("../class.main"));

var _dateformat = _interopRequireDefault(require("dateformat"));

var _dateDiff = _interopRequireDefault(require("date-diff"));

var _class2 = _interopRequireDefault(require("../../db/class.db"));

var ChatData =
/*#__PURE__*/
function () {
  function ChatData(channel, user) {
    (0, _classCallCheck2.default)(this, ChatData);
    this.channel = channel;
    this.user = user;
  }

  (0, _createClass2.default)(ChatData, [{
    key: "commandConfig",
    value: function () {
      var _commandConfig = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee() {
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!this.command.static) {
                  _context.next = 4;
                  break;
                }

                return _context.abrupt("return", this.runCommandStatic());

              case 4:
                return _context.abrupt("return", this.runCommand());

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function commandConfig() {
        return _commandConfig.apply(this, arguments);
      };
    }()
  }, {
    key: "runCommandStatic",
    value: function () {
      var _runCommandStatic = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee2() {
        var respone, i, msg;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.t0 = this.command.command;
                _context2.next = _context2.t0 === "추가" ? 3 : _context2.t0 === "삭제" ? 21 : _context2.t0 === "초기화" ? 33 : _context2.t0 === "명령어" ? 36 : _context2.t0 === "벤" ? 41 : _context2.t0 === "언벤" ? 45 : 49;
                break;

              case 3:
                if (!(this.input[1] === "")) {
                  _context2.next = 7;
                  break;
                }

                return _context2.abrupt("return", this.error("추가 할 명령어를 입력해 주세요."));

              case 7:
                if (!this.channel.commander.isStatic(this.input[1])) {
                  _context2.next = 11;
                  break;
                }

                return _context2.abrupt("return", this.error("변경할 수 없는 명령어 입니다."));

              case 11:
                if (!(this.input[2] === "")) {
                  _context2.next = 15;
                  break;
                }

                return _context2.abrupt("return", this.error("".concat(this.input[1], "\uC5D0 \uC751\uB2F5\uC744 \uC785\uB825\uD574 \uC8FC\uC138\uC694.")));

              case 15:
                respone = "";

                for (i = 2; i < this.input.length; i++) {
                  respone += "".concat(this.input[i], " ");
                } //실제 데이터를 편집하는 부분


                this.channel.commander.add(this.input[1], respone);

                _class2.default.commandAdd(this.channel, this.input[1], respone);

                return _context2.abrupt("return", this.setRespone("!".concat(this.input[1], " \uBA85\uB839\uC5B4\uAC00 \uCD94\uAC00\uB418\uC5C8\uC2B5\uB2C8\uB2E4.")));

              case 20:
                return _context2.abrupt("break", 51);

              case 21:
                if (!this.channel.commander.isStatic(this.input[1])) {
                  _context2.next = 25;
                  break;
                }

                return _context2.abrupt("return", this.error("변경할 수 없는 명령어 입니다."));

              case 25:
                if (this.channel.commander.isset(this.input[1])) {
                  _context2.next = 29;
                  break;
                }

                return _context2.abrupt("return", this.error("해당 명령어가 없습니다."));

              case 29:
                this.channel.commander.remove(this.input[1]);

                _class2.default.commandRemove(this);

                return _context2.abrupt("return", this.setRespone("!".concat(this.input[1], " \uBA85\uB839\uC5B4\uAC00 \uC0AD\uC81C\uB418\uC5C8\uC2B5\uB2C8\uB2E4.")));

              case 32:
                return _context2.abrupt("break", 51);

              case 33:
                this.channel.clear();
                return _context2.abrupt("return", this.setRespone("사용자 지정 명령어가 모두 삭제되었습니다."));

              case 36:
                //this.send(JSON.stringify(chatdata));
                msg = "\uCD1D ".concat(this.channel.commander.defaultCommandLength(), "\uAC1C - ");
                this.channel.commander.commands.map(function (now) {
                  !now.admin ? msg += " !".concat(now.command, ",") : false;
                });
                msg = msg.slice(0, msg.length - 1);
                return _context2.abrupt("return", this.setRespone(msg));

              case 41:
                _context2.next = 43;
                return this.channel.setBan(this.input);

              case 43:
                msg = _context2.sent;
                return _context2.abrupt("break", 51);

              case 45:
                _context2.next = 47;
                return this.channel.setUnban(this.input);

              case 47:
                msg = _context2.sent;
                return _context2.abrupt("break", 51);

              case 49:
                return _context2.abrupt("return", this.error("[ ".concat(this.command.command, " ]\uB294 \uC815\uC758\uB418\uC5C8\uC9C0\uB9CC \uCC3E\uC744 \uC218 \uC5C6\uB294 \uBA85\uB839\uC5B4 \uC785\uB2C8\uB2E4.")));

              case 51:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function runCommandStatic() {
        return _runCommandStatic.apply(this, arguments);
      };
    }()
  }, {
    key: "runCommand",
    value: function runCommand() {
      switch (this.command.respone) {
        case "{TITLE}":
          if (this.input[1] !== undefined && this.isAdmin()) {
            //chatdata.setTitle();
            return this.error("추가 권한이 필요하여 준비중 입니다.");
          }

          break;
      }
    }
  }, {
    key: "responeReg",
    value: function () {
      var _responeReg = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee3() {
        var REGEXP, stream, game;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                REGEXP = /\{.*\}/;

                if (!(this.command.respone === "")) {
                  _context3.next = 5;
                  break;
                }

                return _context3.abrupt("return", false);

              case 5:
                if (REGEXP.test(this.command.respone)) {
                  _context3.next = 7;
                  break;
                }

                return _context3.abrupt("return", false);

              case 7:
                _context3.t0 = this.command.respone;
                _context3.next = _context3.t0 === "{UPTIME}" ? 10 : _context3.t0 === "{GAME}" ? 16 : _context3.t0 === "{TITLE}" ? 21 : 26;
                break;

              case 10:
                _context3.next = 12;
                return _class.default.api.getStreamById(this.user["room-id"]);

              case 12:
                stream = _context3.sent;
                console.log(stream);
                this.command.respone = stream === undefined || stream === null ? _class.default.config.DEFAULT_NOT_STREAMING : this.makeDate(stream.started_at);
                return _context3.abrupt("break", 26);

              case 16:
                _context3.next = 18;
                return _class.default.api.getGamesByStreamId(this.user["room-id"]);

              case 18:
                game = _context3.sent;
                this.command.respone = game === undefined || game === null ? _class.default.config.DEFAULT_NOT_STREAMING : game.name;
                return _context3.abrupt("break", 26);

              case 21:
                _context3.next = 23;
                return _class.default.api.getStreamById(this.user["room-id"]);

              case 23:
                stream = _context3.sent;
                this.command.respone = stream === undefined || stream === null ? _class.default.config.DEFAULT_NOT_STREAMING : stream.title;
                return _context3.abrupt("break", 26);

              case 26:
                _context3.next = 28;
                return true;

              case 28:
                return _context3.abrupt("return", _context3.sent);

              case 29:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      return function responeReg() {
        return _responeReg.apply(this, arguments);
      };
    }()
  }, {
    key: "setTitlePromise",
    value: function setTitlePromise() {
      var _this = this;

      return new Promise(function (resolve, reject) {
        _class.default.api.channels.updateChannel({
          channelID: _this.user["room-id"],
          status: "test"
        }, function (err, res) {
          if (err != null) reject(err);
          resolve(res);
        });
      });
    }
  }, {
    key: "makeDate",
    value: function makeDate(updated) {
      var date = new Date(updated);
      var now = new Date();
      var diff = new _dateDiff.default(now, date);
      var diffString = "";
      if (diff.days() >= 1) diffString += "".concat(Math.floor(diff.days()), "\uC77C ");
      if (diff.hours() >= 1) diffString += "".concat(Math.floor(diff.hours()) % 24, "\uC2DC\uAC04 ");
      if (diff.minutes() >= 1) diffString += "".concat(Math.floor(diff.minutes()) % 60, "\uBD84 ");
      if (diff.seconds() >= 1) diffString += "".concat(Math.floor(diff.seconds()) % 60, "\uCD08 \uC804");
      return (0, _dateformat.default)(date, "".concat(diffString, " (mm-dd HH:MM)"));
    }
  }, {
    key: "getCommand",
    value: function getCommand() {
      return this.command;
    }
  }, {
    key: "isCommand",
    value: function isCommand() {
      return this.command ? true : false;
    }
  }, {
    key: "setCommand",
    value: function setCommand(input) {
      this.input = input;

      if (this.channel.commander.isset(input[0])) {
        var nowCommand = this.channel.commander.find(input[0]); //관리자만 할 수 있는 명령어인 경우

        if (nowCommand.admin && this.isAdmin()) {
          this.command = nowCommand;
        } else if (!nowCommand.admin) {
          this.command = nowCommand;
        }
      }
    }
  }, {
    key: "isAdmin",
    value: function isAdmin() {
      //195692100
      if (this.user.mod || this.user.badges != null && this.user.badges.broadcaster || this.user["user-id"] === "1") return true;else return false;
    }
  }, {
    key: "error",
    value: function error(ment) {
      this.command.respone = "[ \uC2E4\uD328 ] ".concat(ment);
      return false;
    }
  }, {
    key: "setRespone",
    value: function setRespone(ment) {
      this.command.respone = ment;
      return true;
    }
  }, {
    key: "getRespone",
    value: function getRespone() {
      return this.command.respone;
    }
    /*
    constructor(channel: Channel, input: string[], user: object) {
      this.channel = channel;
      this.input = input;
      this.user = user;
      //this.command = new Command();
    }*/

  }]);
  return ChatData;
}();

var _default = ChatData;
exports.default = _default;