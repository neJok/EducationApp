import axios from "axios";
import type {ITopUser} from "@/interfaces/user.interface";

class TopService {
  private URL = process.env.NEXT_PUBLIC_API_URL + '/top'

  async getTop() {
    return await axios.post<ITopUser[]>(`${this.URL}/`)
  }
}

export default new TopService()