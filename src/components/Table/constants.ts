import { UserData } from "../../utils/interface";
import { HeadCell } from "./interface";

export const headCells: readonly HeadCell<UserData>[] = [
  {
    id: "username",
    numeric: false,
    label: "Username",
  },
  {
    id: "name",
    numeric: false,
    label: "Name",
  },
  {
    id: "email",
    numeric: false,
    label: "Email",
  },
  {
    id: "gender",
    numeric: false,
    label: "Gender",
  },
  {
    id: "registered",
    numeric: false,
    label: "Registered Date",
  },
];
