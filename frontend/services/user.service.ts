import axios from "axios";
import type {IUser} from "@/interfaces/user.interface";

class UserService {
  private URL = process.env.NEXT_PUBLIC_API_URL + '/users'

  async getMe(initData?: string) {
    return await axios
      .post<IUser>(`${this.URL}/me`, null, {
          headers: {
              "X-Telegram-Init-Data": initData
          }
      });
  }
}

export default new UserService()