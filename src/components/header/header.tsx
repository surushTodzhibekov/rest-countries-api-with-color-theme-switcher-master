import { useContext } from "react";
import styles from "./header.module.css";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context";

function Header() {
  const context = useContext(DarkModeContext);

  //---------------------------------------------------------------------------
  return (
    <header className={context?.darkMode ? styles.header : styles.lightTheme}>
      <Link to={"/"}>
        <h3 className={context?.darkMode ? styles.title : styles.titleTheme}>
          Where in the world?
        </h3>
      </Link>

      <div>
        <button
          className={context?.darkMode ? styles.btnDark : styles.btnWrap}
          onClick={context?.toggleDarkMode}
        >
          <i
            className={context?.darkMode ? "far fa-lightbulb" : "far fa-moon"}
          ></i>
          <span> {context?.darkMode ? "Dark" : "Light"} mode</span>
        </button>
      </div>
    </header>
  );
}

export default Header;
