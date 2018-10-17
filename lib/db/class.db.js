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

var asyncRedis = require("async-redis");

var db =
/*#__PURE__*/
function () {
  function db() {
    (0, _classCallCheck2.default)(this, db);
    db.client = asyncRedis.createClient();
    db.client.select(4);
    db.client.on("error", function (err) {
      console.log("Error : ".concat(err));
    });
  }

  (0, _createClass2.default)(db, null, [{
    key: "commandAdd",
    value: function commandAdd(channel, command, respone) {
      db.client.hset(this.commandKeyName(channel.name), command, respone);
      db.client.expire(this.commandKeyName(channel.name), 60 * 60 * 24 * 30);
    }
  }, {
    key: "commandRemove",
    value: function commandRemove(chatdata) {
      db.client.hdel(this.commandKeyName(chatdata.channel.name), chatdata.input[1]);
    }
  }, {
    key: "commandRemoveAll",
    value: function commandRemoveAll(channelName) {
      db.client.del(this.commandKeyName(channelName));
    } //게임정보

  }, {
    key: "isGame",
    value: function () {
      var _isGame = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee(gameId) {
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return db.client.exists(this.gameKeyName(gameId));

              case 2:
                return _context.abrupt("return", _context.sent);

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function isGame(_x) {
        return _isGame.apply(this, arguments);
      };
    }()
  }, {
    key: "getGame",
    value: function () {
      var _getGame = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee2(gameId) {
        var data;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return db.client.get(this.gameKeyName(gameId));

              case 2:
                data = _context2.sent;
                return _context2.abrupt("return", JSON.parse(data));

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function getGame(_x2) {
        return _getGame.apply(this, arguments);
      };
    }()
  }, {
    key: "setGame",
    value: function setGame(gameId, data) {
      var expire = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 60 * 60 * 24;
      db.client.set(this.gameKeyName(gameId), JSON.stringify(data));
      db.client.expire(this.gameKeyName(gameId), expire);
    }
  }, {
    key: "isStream",
    value: function () {
      var _isStream = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee3(streamId) {
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return db.client.exists(this.streamKeyName(streamId));

              case 2:
                return _context3.abrupt("return", _context3.sent);

              case 3:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      return function isStream(_x3) {
        return _isStream.apply(this, arguments);
      };
    }() //스트리밍 정보

  }, {
    key: "getStream",
    value: function () {
      var _getStream = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee4(streamId) {
        var data;
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return db.client.get(this.streamKeyName(streamId));

              case 2:
                data = _context4.sent;
                return _context4.abrupt("return", JSON.parse(data));

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      return function getStream(_x4) {
        return _getStream.apply(this, arguments);
      };
    }()
  }, {
    key: "setStream",
    value: function setStream(streamId, data) {
      var expire = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 60;
      db.client.set(this.streamKeyName(streamId), JSON.stringify(data));
      db.client.expire(this.streamKeyName(streamId), expire);
    } //이용자 관련

  }, {
    key: "getUserBlock",
    value: function () {
      var _getUserBlock = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee5(user) {
        var key, list, data;
        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                key = "".concat(this.userBlockKeyName(user["user-id"]), ":*");
                _context5.next = 3;
                return db.client.keys(key);

              case 3:
                list = _context5.sent;
                data = [];
                _context5.next = 7;
                return list.forEach(function (keys, index) {
                  var date = new Date(keys.split(":")[3] * 1000);
                  var now = db.client.get(keys);
                  data.push({
                    ment: now.ment,
                    date: date,
                    msg: now.msg
                  });
                });

              case 7:
                _context5.next = 9;
                return data;

              case 9:
                return _context5.abrupt("return", _context5.sent);

              case 10:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      return function getUserBlock(_x5) {
        return _getUserBlock.apply(this, arguments);
      };
    }()
  }, {
    key: "setUserBlock",
    value: function () {
      var _setUserBlock = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee6(user, status) {
        var block, key;
        return _regenerator.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                block = {
                  ment: status.ment,
                  blockPoint: status.blockPoint,
                  msg: status.msg
                };
                key = "".concat(this.userBlockKeyName(user["user-id"]), ":").concat(Math.floor(Number(new Date()) / 1000));
                db.client.set(key, JSON.stringify(block));
                db.client.expire(key, 60 * 60 * 24);

              case 4:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      return function setUserBlock(_x6, _x7) {
        return _setUserBlock.apply(this, arguments);
      };
    }()
  }, {
    key: "commandKeyName",
    value: function commandKeyName(channel) {
      return "channel:".concat(channel, ":command");
    }
  }, {
    key: "gameKeyName",
    value: function gameKeyName(gameId) {
      return "games:".concat(gameId);
    }
  }, {
    key: "streamKeyName",
    value: function streamKeyName(streamId) {
      return "streams:".concat(streamId);
    }
  }, {
    key: "userBlockKeyName",
    value: function userBlockKeyName(userId) {
      return "user:block:".concat(userId);
    }
  }]);
  return db;
}();

var _default = db;
exports.default = _default;