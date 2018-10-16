import axios from "axios";
import auth from "../config/auth";
import db from "../db/class.db";
import ChatBot from "./class.main";

class twitchApi {
  async getStreamById(channelId: string) {
    //redis에 값이 존재할 경우 해당 값을 리턴합니다.
    if (await db.isStream(channelId)) return db.getStream(channelId);

    let url = `https://api.twitch.tv/helix/streams?user_id=${channelId}`;
    let opt = {
      headers: {
        "Client-ID": auth.clientId
      }
    };
    const res = await axios
      .get(url, opt)
      .then(res => {
        return res.data;
      })
      .catch(err => {
        console.log(err);
        return err;
      });

    db.setStream(channelId, res.data[0]);
    return await res.data[0];
  }

  async getGamesByStreamId(channelId: string) {
    const stream = await this.getStreamById(channelId);
    //redis에 값이 존재할 경우 해당 값을 리턴합니다.
    if (await db.isGame(stream.game_id)) return db.getGame(stream.game_id);

    let url = `https://api.twitch.tv/helix/games?id=${stream.game_id}`;
    let opt = {
      headers: {
        "Client-ID": auth.clientId
      }
    };

    const res = await axios.get(url, opt).then(res => res.data);

    db.setGame(stream.game_id, res.data[0]);
    return res.data;
  }
}

export default twitchApi;
