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

var _axios = _interopRequireDefault(require("axios"));

var _auth = _interopRequireDefault(require("../config/auth"));

var _class = _interopRequireDefault(require("../db/class.db"));

var twitchApi =
/*#__PURE__*/
function () {
  function twitchApi() {
    (0, _classCallCheck2.default)(this, twitchApi);
  }

  (0, _createClass2.default)(twitchApi, [{
    key: "getStreamById",
    value: function () {
      var _getStreamById = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee(channelId) {
        var url, opt, res;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _class.default.isStream(channelId);

              case 2:
                if (!_context.sent) {
                  _context.next = 4;
                  break;
                }

                return _context.abrupt("return", _class.default.getStream(channelId));

              case 4:
                url = "https://api.twitch.tv/helix/streams?user_id=".concat(channelId);
                opt = {
                  headers: {
                    "Client-ID": _auth.default.clientId
                  }
                };
                _context.next = 8;
                return _axios.default.get(url, opt).then(function (res) {
                  return res.data;
                }).catch(function (err) {
                  console.log(err);
                  return err;
                });

              case 8:
                res = _context.sent;

                _class.default.setStream(channelId, res.data[0]);

                _context.next = 12;
                return res.data[0];

              case 12:
                return _context.abrupt("return", _context.sent);

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function getStreamById(_x) {
        return _getStreamById.apply(this, arguments);
      };
    }()
  }, {
    key: "getGamesByStreamId",
    value: function () {
      var _getGamesByStreamId = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee2(channelId) {
        var stream, url, opt, res;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.getStreamById(channelId);

              case 2:
                stream = _context2.sent;
                _context2.next = 5;
                return _class.default.isGame(stream.game_id);

              case 5:
                if (!_context2.sent) {
                  _context2.next = 7;
                  break;
                }

                return _context2.abrupt("return", _class.default.getGame(stream.game_id));

              case 7:
                url = "https://api.twitch.tv/helix/games?id=".concat(stream.game_id);
                opt = {
                  headers: {
                    "Client-ID": _auth.default.clientId
                  }
                };
                _context2.next = 11;
                return _axios.default.get(url, opt).then(function (res) {
                  return res.data;
                });

              case 11:
                res = _context2.sent;

                _class.default.setGame(stream.game_id, res.data[0]);

                return _context2.abrupt("return", res.data);

              case 14:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function getGamesByStreamId(_x2) {
        return _getGamesByStreamId.apply(this, arguments);
      };
    }()
  }]);
  return twitchApi;
}();

var _default = twitchApi;
exports.default = _default;