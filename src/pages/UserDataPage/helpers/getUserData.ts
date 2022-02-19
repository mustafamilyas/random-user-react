import axios from "axios";
import { Gender } from "../../../utils/interface";
import { transformToUserData } from "../../../utils/transformToUserData";

const BASE_URL = "https://randomuser.me/api/";
const SEED_NAME = "random-user";
const DATA_SIZE = 200;
const FETCHED_DATA = ["login", "name", "registered", "gender", "email"];

export async function getUserData() {
  try {
    const url = new URL(window.location.href);
    const keyword = url.searchParams.get("keyword");
    const pageSize = url.searchParams.get("pageSize");
    const page = url.searchParams.get("page");
    const gender = url.searchParams.get("gender");
    const params: any = {
      inc: FETCHED_DATA.join(","),
      results: DATA_SIZE,
      pageSize: pageSize ?? 5,
      page: page ?? 2,
      seed: SEED_NAME,
    };

    console.log(
      "🚀 ~ file: getUserData.ts ~ line 26 ~ getUserData ~ gender",
      gender
    );
    if (gender && gender in Gender) params.gender = gender;
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
