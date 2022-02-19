import { createContext, FC, useContext, useState, useEffect } from "react";
import {
  FilterUserData,
  Gender,
  SortOrder,
  UserData,
} from "../../../utils/interface";
import { getUserData } from "./getUserData";

interface UserDataContextValue {
  data: UserData[];
  filter: FilterUserData;
  refetch: () => Promise<void>;
  resetFilter: VoidFunction;
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
    pageSize: 5,
    sortBy: "username",
    sortOrder: SortOrder.ASC,
  });

  const setFilter = (data: Partial<FilterUserData>) => {
    _setFilter((prevData) => ({ ...prevData, ...data }));
  };

  const refetch = async () => {
    const response = await getUserData(filter);
    setData(response);
  };

  const resetFilter = () => {
    setFilter({
      keyword: "",
      gender: Gender.ALL,
      sortBy: undefined,
      sortOrder: undefined,
    });
  };

  useEffect(() => {
    try {
      refetch();
    } catch (error) {
      console.warn(error);
    }
  }, [filter.gender, filter.page, filter.pageSize]);

  const value = { data, filter, refetch, setFilter, resetFilter };

  return <UserDataContext.Provider value={value} {...props} />;
};
