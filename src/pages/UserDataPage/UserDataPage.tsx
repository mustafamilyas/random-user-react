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
import { EnhancedTable } from "../../components/Table/Table";
import { Gender } from "../../utils/interface";
import { useUserData } from "./helpers/UserDataProvider";

const useStyles = makeStyles(
  () => ({
    body: {},
    inputGroup: {
      display: "flex",
      alignItems: "stretch",
      gap: "1rem",
    },
    selectGender: {
      "&&": {
        minWidth: "10rem",
      },
    },
  }),
  { classNamePrefix: "UserData" }
);

export function UserDataPage() {
  const styles = useStyles();
  const {
    data: users,
    filter,
    refetch,
    resetFilter,
    setFilter,
  } = useUserData();

  return (
    <div className={styles.body}>
      <div className={styles.inputGroup}>
        <TextField
          id="outlined-basic"
          name="keyword"
          label="Keyword"
          variant="outlined"
          value={filter.keyword}
          onChange={(event) => setFilter({ keyword: event.target.value })}
        />
        <Button variant="contained" endIcon={<SearchIcon />} onClick={refetch}>
          Send
        </Button>
        <FormControl className={styles.selectGender}>
          <InputLabel id="gender-select">Gender</InputLabel>
          <Select
            labelId="gender-select"
            id="gender-select"
            name="gender"
            label="Gender"
            value={filter.gender}
            onChange={(event) =>
              setFilter({ gender: event.target.value as Gender })
            }
          >
            <MenuItem value={Gender.FEMALE}>{Gender.FEMALE}</MenuItem>
            <MenuItem value={Gender.MALE}>{Gender.MALE}</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant="outlined"
          endIcon={<RestartAltIcon />}
          onClick={resetFilter}
        >
          Reset Filter
        </Button>
      </div>
      <EnhancedTable rows={users} />
    </div>
  );
}
