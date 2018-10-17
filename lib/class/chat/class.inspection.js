"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _stringWidth = _interopRequireDefault(require("string-width"));

var Inspection =
/*#__PURE__*/
function () {
  function Inspection(user, msg) {
    (0, _classCallCheck2.default)(this, Inspection);
    this.msg = msg;
    this.status = {
      user: user,
      block: false,
      blockPoint: 0,
      ment: "",
      msg: this.msg
    };
  }

  (0, _createClass2.default)(Inspection, [{
    key: "check",
    value: function check() {
      this.CheckOrderLangauge();
      this.CheckLength();
      this.CheckFword();
      return this.status;
    }
  }, {
    key: "CheckOrderLangauge",
    value: function CheckOrderLangauge() {
      var REGEX_CHINESE = /[\u4E00-\u9FFF]|[\u3400-\u4DBF]|(?:[\uD840-\uD868][\uDC00-\uDFFF]|\uD869[\uDC00-\uDEDF])|(?:\uD869[\uDF00-\uDFFF]|[\uD86A-\uD86C][\uDC00-\uDFFF]|\uD86D[\uDC00-\uDF3F])|(?:\uD86D[\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1F])|(?:\uD86E[\uDC20-\uDFFF]|[\uD86F-\uD872][\uDC00-\uDFFF]|\uD873[\uDC00-\uDEAF])|[\uF900-\uFAFF]|[\u3300-\u33FF]|[\uFE30-\uFE4F]|[\uF900-\uFAFF]|(?:\uD87E[\uDC00-\uDE1F])/;
      var REGEX_JAPANESE = /[\u3000-\u303f]|[\u3040-\u309f]|[\u30a0-\u30ff]|[\uff00-\uff9f]|[\u4e00-\u9faf]|[\u3400-\u4dbf]/;
      var REGEX_KOREAN = /[가-힣]|[ㄱ-ㅎ]/;
      var REGEX_ENGLISH = /[a-z]/i;
      var REGEX_EMOJI = /(?:\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDE44])/;
      var REGEX_CHINESE_STRING = /([\u4E00-\u9FFF]|[\u3400-\u4DBF]|(?:[\uD840-\uD868][\uDC00-\uDFFF]|\uD869[\uDC00-\uDEDF])|(?:\uD869[\uDF00-\uDFFF]|[\uD86A-\uD86C][\uDC00-\uDFFF]|\uD86D[\uDC00-\uDF3F])|(?:\uD86D[\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1F])|(?:\uD86E[\uDC20-\uDFFF]|[\uD86F-\uD872][\uDC00-\uDFFF]|\uD873[\uDC00-\uDEAF])|[\uF900-\uFAFF]|[\u3300-\u33FF]|[\uFE30-\uFE4F]|[\uF900-\uFAFF]|(?:\uD87E[\uDC00-\uDE1F]))+/g;
      var hasChar = {
        Chinese: Number(REGEX_CHINESE.test(this.msg)),
        Japnese: Number(REGEX_JAPANESE.test(this.msg)),
        Korean: Number(REGEX_KOREAN.test(this.msg)),
        English: Number(REGEX_ENGLISH.test(this.msg)),
        Emoji: Number(REGEX_EMOJI.test(this.msg))
      };
      var counter = 0;
      Object.keys(hasChar).forEach(function (key) {
        return counter += hasChar[key];
      });
      if (counter >= 4) this.setBlock("3개국어 이상 다국어 사용(이모지 포함)을 금해주세요.");
      var m;
      var chineseCounter = 0;

      do {
        m = REGEX_CHINESE_STRING.exec(this.msg);

        if (m) {
          chineseCounter += m[0].length;
        }
      } while (m);

      if (chineseCounter >= 3) {
        this.setBlock("한국 채널에서 중국어 사용을 자제해 주세요.");
      }
    }
  }, {
    key: "CheckFword",
    value: function CheckFword() {}
  }, {
    key: "CheckLength",
    value: function CheckLength() {
      var width = (0, _stringWidth.default)(this.msg);
      console.log(width);

      if (width >= 100) {
        this.setBlock("채팅이 너무 길 경우 다른 이용자에게 피해가 갈 수 있습니다.");
      }
    }
  }, {
    key: "setBlock",
    value: function setBlock(ment) {
      this.status.block = true;
      this.status.blockPoint++;
      this.status.ment += ment;
    }
  }]);
  return Inspection;
}();

var _default = Inspection;
exports.default = _default;