"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var Commander =
/*#__PURE__*/
function () {
  function Commander() {
    (0, _classCallCheck2.default)(this, Commander);
    this.commands = Array();
  }

  (0, _createClass2.default)(Commander, [{
    key: "add",
    value: function add(command, respone) {
      var admin = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var staticType = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      var data = {
        admin: admin,
        command: command,
        respone: respone,
        static: staticType
      };
      if (!this.isset(command)) this.commands.push(data);
    }
  }, {
    key: "remove",
    value: function remove(command) {
      var copy = this.commands;
      var oldCount = this.commands.length;
      this.commands.map(function (now, index) {
        if (now.command == command && !now.command.static) copy.splice(index, 1);
      });
      this.commands = copy;
      return oldCount == copy.length ? false : true;
    }
  }, {
    key: "find",
    value: function find(command) {
      var find = undefined;
      this.commands.map(function (now) {
        if (now.command == command) find = now;
      });
      return find;
    }
  }, {
    key: "isset",
    value: function isset(command) {
      if (this.find(command) === undefined) return false;else return true;
    }
  }, {
    key: "isStatic",
    value: function isStatic(command) {
      var find = this.find(command);
      if (find !== undefined && find.static) return true;else return false;
    }
  }, {
    key: "clear",
    value: function clear() {
      var copy = this.commands;
      this.commands.map(function (now, index) {
        if (!now.static) copy.splice(index, 1);
      });
      this.commands = copy;
    }
  }, {
    key: "defaultCommandLength",
    value: function defaultCommandLength() {
      var count = 0;
      this.commands.map(function (now) {
        if (!now.admin) count++;
      });
      return count;
    }
  }]);
  return Commander;
}();

var _default = Commander;
exports.default = _default;