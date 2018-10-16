import stringlWidth from "string-width";
import dateFormat from "dateformat";
import DateDiff from "date-diff";

class Inspection {
  msg: string;
  status: BlockStatus;
  constructor(user, msg) {
    this.msg = msg;
    this.status = {
      user: user,
      block: false,
      blockPoint: 0,
      ment: ``,
      msg: this.msg
    };
  }

  check(): BlockStatus {
    this.CheckOrderLangauge();
    this.CheckLength();
    this.CheckFword();

    return this.status;
  }

  CheckOrderLangauge() {
    const REGEX_CHINESE = /[\u4e00-\u9fff]|[\u3400-\u4dbf]|[\u{20000}-\u{2a6df}]|[\u{2a700}-\u{2b73f}]|[\u{2b740}-\u{2b81f}]|[\u{2b820}-\u{2ceaf}]|[\uf900-\ufaff]|[\u3300-\u33ff]|[\ufe30-\ufe4f]|[\uf900-\ufaff]|[\u{2f800}-\u{2fa1f}]/u;
    const REGEX_JAPANESE = /[\u3000-\u303f]|[\u3040-\u309f]|[\u30a0-\u30ff]|[\uff00-\uff9f]|[\u4e00-\u9faf]|[\u3400-\u4dbf]/;
    const REGEX_KOREAN = /[가-힣]|[ㄱ-ㅎ]/;
    const REGEX_ENGLISH = /[a-z]/i;
    const REGEX_EMOJI = /[\u{1f000}-\u{1f644}]/u;
    const REGEX_CHINESE_STRING = /([\u4e00-\u9fff]|[\u3400-\u4dbf]|[\u{20000}-\u{2a6df}]|[\u{2a700}-\u{2b73f}]|[\u{2b740}-\u{2b81f}]|[\u{2b820}-\u{2ceaf}]|[\uf900-\ufaff]|[\u3300-\u33ff]|[\ufe30-\ufe4f]|[\uf900-\ufaff]|[\u{2f800}-\u{2fa1f}])+/gu;
    const hasChar = {
      Chinese: Number(REGEX_CHINESE.test(this.msg)),
      Japnese: Number(REGEX_JAPANESE.test(this.msg)),
      Korean: Number(REGEX_KOREAN.test(this.msg)),
      English: Number(REGEX_ENGLISH.test(this.msg)),
      Emoji: Number(REGEX_EMOJI.test(this.msg))
    };
    let counter = 0;
    Object.keys(hasChar).forEach(key => (counter += hasChar[key]));
    if (counter >= 4) this.setBlock("3개국어 이상 다국어 사용(이모지 포함)을 금해주세요.");

    let m;
    let chineseCounter = 0;
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

  CheckFword() {}
  CheckLength() {
    const width = stringlWidth(this.msg);
    console.log(width);
    if (width >= 100) {
      this.setBlock("채팅이 너무 길 경우 다른 이용자에게 피해가 갈 수 있습니다.");
    }
  }

  setBlock(ment: string) {
    this.status.block = true;
    this.status.blockPoint++;
    this.status.ment += ment;
  }
}

interface BlockStatus {
  user: any;
  block: boolean;
  blockPoint: number;
  ment: string;
  msg: string;
}
export default Inspection;
