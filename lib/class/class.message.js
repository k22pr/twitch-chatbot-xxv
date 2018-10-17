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

var _class = _interopRequireDefault(require("./class.main"));

var Message =
/*#__PURE__*/
function () {
  function Message() {
    (0, _classCallCheck2.default)(this, Message);
  }

  (0, _createClass2.default)(Message, [{
    key: "sender",
    value: function () {
      var _sender = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee() {
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(this.respone !== "")) {
                  _context.next = 5;
                  break;
                }

                _context.next = 3;
                return _class.default.client.say(this.channelName, "# ".concat(this.respone));

              case 3:
                _context.next = 6;
                break;

              case 5:
                console.log("not found to respone message");

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function sender() {
        return _sender.apply(this, arguments);
      };
    }()
  }, {
    key: "whisper",
    value: function () {
      var _whisper = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee2() {
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                console.log("wisper : ".concat(this.userName, " => ").concat(this.respone));
                _context2.next = 3;
                return _class.default.client.whisper(this.userName, "".concat(this.respone));

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function whisper() {
        return _whisper.apply(this, arguments);
      };
    }()
  }, {
    key: "setRespone",
    value: function setRespone(respone) {
      this.respone = respone;
    }
  }, {
    key: "setChannelName",
    value: function setChannelName(channelName) {
      this.channelName = channelName;
    }
  }, {
    key: "setUserName",
    value: function setUserName(userName) {
      this.userName = userName;
    }
  }, {
    key: "setSay",
    value: function setSay(channelName, respone) {
      this.setChannelName(channelName);
      this.setRespone(respone);
      this.sender();
    }
  }, {
    key: "setWhisper",
    value: function setWhisper(userName, respone) {
      this.setUserName(userName);
      this.setRespone(respone);
      this.whisper();
    }
  }]);
  return Message;
}();

var _default = Message;
exports.default = _default;