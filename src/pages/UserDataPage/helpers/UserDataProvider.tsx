import { createContext, FC, useContext, useState, useEffect } from "react";
import { Gender, UserData } from "../../../utils/interface";
import { getUserData } from "./getUserData";

export type SortOrder = "ascend" | "descend";

interface FilterUserData {
  keyword?: string;
  gender?: Gender;
  page: number;
  perPage: number;
  sortBy?: string;
  sortOrder?: SortOrder;
}

interface UserDataContextValue {
  data: UserData[];
  filter: FilterUserData;
  refetch: () => Promise<void>;
  setFilter: (data: Partial<FilterUserData>) => void;
}

const UserDataContext = createContext<UserDataContextValue | undefined>(
  undefined
);

export function useUserData() {
  const context = useContext(UserDataContext);
  if (context === undefined) {
    throw new Error(`useUserData must be used within a CounterProvider`);
  }
  return context;
}

export const UserDataProvider: FC = (props) => {
  const [data, setData] = useState<UserData[]>([]);
  const [filter, _setFilter] = useState<FilterUserData>({
    page: 1,
    perPage: 5,
  });

  const setFilter = (data: Partial<FilterUserData>) => {
    _setFilter((prevData) => ({ ...prevData, ...data }));
  };

  const refetch = async () => {
    const response = await getUserData();
    setData(response);
  };

  useEffect(() => {
    try {
      refetch();
    } catch (error) {
      console.warn(error);
    }
  }, [filter.gender]);

  const value = { data, filter, refetch, setFilter };

  return <UserDataContext.Provider value={value} {...props} />;
};
