import axios from "axios";
import { transformToUserData } from "../utils/transformToUserData";

const BASE_URL = "https://randomuser.me/api/";

export async function getUserData() {
  try {
    const url = new URL(window.location.href);
    const keyword = url.searchParams.get("keyword");
    const params: any = {
      inc: ["login", "name", "registered", "gender", "email"].join(","),
      results: 10,
      page: 2,
      seed: "random-user",
    };
    if (keyword) params.keyword = keyword;
    const response = await axios.get(BASE_URL, {
      params,
    });
    return response.data.results.map(transformToUserData);
  } catch (error) {
    console.warn(error);
  }
  return [];
}
