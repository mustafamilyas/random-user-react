import RestartAltIcon from "@mui/icons-material/RestartAlt";
import SearchIcon from "@mui/icons-material/Search";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { useEffect, useState } from "react";
import { EnhancedTable } from "../../components/Table/Table";
import { getUserData } from "../../hooks/getUserData";
import { Gender, UserData } from "../../utils/interface";

const useStyles = makeStyles(
  () => ({
    body: {},
    inputGroup: {
      display: "flex",
      alignItems: "stretch",
      gap: "1rem",
    },
    selectGender: {
      minWidth: "10rem",
    },
  }),
  { classNamePrefix: "UserData" }
);

export function UserDataPage() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [gender, setGender] = useState("");
  const styles = useStyles();

  useEffect(() => {
    const setupUserData = async () => {
      const response = await getUserData();
      setUsers(response);
    };
    try {
      setupUserData();
    } catch (error) {
      console.warn(error);
    }
  }, []);

  return (
    <form className={styles.body} action="/">
      <div className={styles.inputGroup}>
        <TextField
          id="outlined-basic"
          name="keyword"
          label="Keyword"
          variant="outlined"
        />
        <Button variant="contained" endIcon={<SearchIcon />} type="submit">
          Send
        </Button>
        <FormControl className={styles.selectGender}>
          <InputLabel id="gender-select">Gender</InputLabel>
          <Select
            labelId="gender-select"
            id="gender-select"
            name="gender"
            value={gender}
            label="Gender"
            onChange={(e) => setGender(e.target.value)}
          >
            <MenuItem value={Gender.FEMALE}>{Gender.FEMALE}</MenuItem>
            <MenuItem value={Gender.MALE}>{Gender.MALE}</MenuItem>
          </Select>
        </FormControl>

        <Button variant="outlined" endIcon={<RestartAltIcon />}>
          Reset Filter
        </Button>
      </div>
      <EnhancedTable rows={users} />
    </form>
  );
}
