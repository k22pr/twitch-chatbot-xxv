import Command from "../interface/interface.command";
import ChatData from "./chat/class.chatData";
class Commander {
  commands: Command[];
  constructor() {
    this.commands = Array();
  }
  add(command: string, respone: string, admin = false, staticType = false) {
    const data: Command = {
      admin: admin,
      command: command,
      respone: respone,
      static: staticType
    };
    if (!this.isset(command)) this.commands.push(data);
  }

  remove(command: string): boolean {
    let copy = this.commands;
    let oldCount = this.commands.length;
    this.commands.map((now, index) => {
      if (now.command == command && !now.command.static) copy.splice(index, 1);
    });

    this.commands = copy;

    return oldCount == copy.length ? false : true;
  }

  find(command: string): Command {
    let find = undefined;
    this.commands.map(now => {
      if (now.command == command) find = now;
    });
    return find;
  }

  isset(command: string): boolean {
    if (this.find(command) === undefined) return false;
    else return true;
  }

  isStatic(command: string): boolean {
    let find = this.find(command);
    if (find !== undefined && find.static) return true;
    else return false;
  }

  clear() {
    let copy = this.commands;
    this.commands.map((now, index) => {
      if (!now.static) copy.splice(index, 1);
    });

    this.commands = copy;
  }

  defaultCommandLength(): Number {
    let count = 0;
    this.commands.map(now => {
      if (!now.admin) count++;
    });
    return count;
  }
}

export default Commander;
