interface Command {
  //명령어
  command: any;
  respone: string;
  admin: boolean;
  static: boolean;
}

export default Command;
