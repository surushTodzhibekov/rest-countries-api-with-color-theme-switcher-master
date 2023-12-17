import { ChangeEvent, useContext } from "react";
import styles from "./search.module.css";
import { DarkModeContext } from "../../context";

function Search({
  search,
  onChange,
}: {
  search: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}) {
  const context = useContext(DarkModeContext);

  //---------------------------------------------------------------------------
  return (
    <input
      value={search}
      onChange={onChange}
      className={`${styles.input} ${
        context?.darkMode ? styles.inputDark : styles.inputLight
      }`}
      type="text"
      placeholder="Search for a country..."
    />
  );
}

export default Search;
