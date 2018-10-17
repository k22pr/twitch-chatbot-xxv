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

var _class = _interopRequireDefault(require("./class.commander"));

var _class2 = _interopRequireDefault(require("./class.main"));

var _class3 = _interopRequireDefault(require("../db/class.db"));

var Channel =
/*#__PURE__*/
function () {
  function Channel(name) {
    var _this = this;

    (0, _classCallCheck2.default)(this, Channel);
    this.name = name;
    this.commander = new _class.default();
    this.init();

    _class3.default.client.hget(_class3.default.commandKeyName(name), function (err, data) {
      if (err === null && data !== null) {
        Object.keys(data).map(function (key) {
          _this.commander.add(key, data[key]);
        });
      }
    });
  }

  (0, _createClass2.default)(Channel, [{
    key: "clear",
    value: function clear() {
      this.commander.clear();

      _class3.default.commandRemoveAll(this.name);

      this.init();
    }
  }, {
    key: "init",
    value: function init() {
      //관리자 기본
      this.commander.add("추가", "", true, true);
      this.commander.add("삭제", "", true, true);
      this.commander.add("초기화", "", true, true);
      this.commander.add("벤", "", true, true);
      this.commander.add("언벤", "", true, true); //일반 사용자 기본

      this.commander.add("명령어", "", false, true);
      this.commander.add("업타임", "{UPTIME}");
      this.commander.add("게임", "{GAME}");
      this.commander.add("방제", "{TITLE}");
    }
  }, {
    key: "setBan",
    value: function () {
      var _setBan = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee(input) {
        var msg;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.ban(input);

              case 2:
                msg = _context.sent;
                _context.next = 5;
                return msg;

              case 5:
                return _context.abrupt("return", _context.sent);

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function setBan(_x) {
        return _setBan.apply(this, arguments);
      };
    }()
  }, {
    key: "ban",
    value: function () {
      var _ban = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee2(input) {
        var msg;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(input[1] === undefined)) {
                  _context2.next = 4;
                  break;
                }

                msg = "차단할 유저 아이디를 입력해주세요.";
                _context2.next = 7;
                break;

              case 4:
                _context2.next = 6;
                return _class2.default.client.ban(this.name, input[1], input[2] || "").then(function (data) {
                  var msg = "[ ".concat(input[1], " ]\uB2D8\uC744 \uCD94\uBC29\uC2DC\uCF30\uC2B5\uB2C8\uB2E4.");
                  if (input[2] !== undefined) msg += " (".concat(input[2], ")");
                  return msg;
                }).catch(function (data) {
                  if (data == "bad_unban_no_ban") return "[ ".concat(input[1], " ]\uB2D8\uC740 \uC774\uBBF8 \uBCA4\uC0C1\uD0DC \uC785\uB2C8\uB2E4.");else return "\uBA85\uB839\uC2E4\uD328 : ".concat(data);
                });

              case 6:
                msg = _context2.sent;

              case 7:
                _context2.next = 9;
                return msg;

              case 9:
                return _context2.abrupt("return", _context2.sent);

              case 10:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function ban(_x2) {
        return _ban.apply(this, arguments);
      };
    }()
  }, {
    key: "setUnban",
    value: function () {
      var _setUnban = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee3(input) {
        var msg;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.unban(input);

              case 2:
                msg = _context3.sent;
                _context3.next = 5;
                return msg;

              case 5:
                return _context3.abrupt("return", _context3.sent);

              case 6:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      return function setUnban(_x3) {
        return _setUnban.apply(this, arguments);
      };
    }()
  }, {
    key: "unban",
    value: function () {
      var _unban = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee4(input) {
        var msg;
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!(input[1] === undefined)) {
                  _context4.next = 4;
                  break;
                }

                msg = "해제 하실 유저 아이디를 입력해주세요.";
                _context4.next = 7;
                break;

              case 4:
                _context4.next = 6;
                return _class2.default.client.unban(this.name, input[1], input[2] || "").then(function (data) {
                  return "[ ".concat(input[1], " ]\uB2D8\uC758 \uBCA4\uC744 \uD574\uC81C \uD588\uC2B5\uB2C8\uB2E4.");
                }).catch(function (data) {
                  if (data == "bad_unban_no_ban") return "[ ".concat(input[1], " ]\uB2D8\uC740 \uBCA4 \uC0C1\uD0DC\uAC00 \uC544\uB2D9\uB2C8\uB2E4.");else return "\uBA85\uB839\uC2E4\uD328 : ".concat(data);
                });

              case 6:
                msg = _context4.sent;

              case 7:
                _context4.next = 9;
                return msg;

              case 9:
                return _context4.abrupt("return", _context4.sent);

              case 10:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      return function unban(_x4) {
        return _unban.apply(this, arguments);
      };
    }()
  }]);
  return Channel;
}();

var _default = Channel;
exports.default = _default;