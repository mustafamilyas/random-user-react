import axios from "axios";
import { FilterUserData } from "../../../utils/interface";
import { transformToUserData } from "../../../utils/transformToUserData";

const BASE_URL = "https://randomuser.me/api/";
const DATA_SIZE = 200;
const FETCHED_DATA = ["login", "name", "registered", "gender", "email"];

export async function getUserData(filter: FilterUserData) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        ...filter,
        inc: FETCHED_DATA.join(","),
        results: DATA_SIZE,
      },
    });
    return response.data.results.map(transformToUserData);
  } catch (error) {
    console.warn(error);
  }
  return [];
}
