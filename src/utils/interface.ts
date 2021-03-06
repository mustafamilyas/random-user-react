export enum SortOrder {
  ASC = "asc",
  DSC = "desc",
}

export enum Gender {
  FEMALE = "female",
  MALE = "male",
  ALL = "all",
}

export interface UserData {
  username: string;
  name: string;
  email: string;
  gender: Gender;
  registered: string;
}

export interface ResponseUserData {
  gender: Gender;
  name: { title: string; first: string; last: string };
  email: string;
  login: {
    uuid: string;
    username: string;
    password: string;
    salt: string;
    md5: string;
    sha1: string;
    sha256: string;
  };
  registered: { date: string; age: number };
}

export interface FilterUserData {
  keyword?: string;
  gender?: Gender;
  page: number;
  pageSize: number;
  sortBy: keyof UserData;
  sortOrder: SortOrder;
}
