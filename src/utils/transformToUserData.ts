import { ResponseUserData, UserData } from "./interface";

export const transformToUserData = (data: ResponseUserData): UserData => {
  return {
    username: data.login?.username,
    name: `${data.name?.title} ${data.name?.first} ${data.name?.last}`,
    registered: data.registered?.date,
    gender: data.gender,
    email: data.email,
  };
};
