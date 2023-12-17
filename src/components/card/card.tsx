import { useContext } from "react";
import styles from "./card.module.css";
import { CountryType } from "../../type";
import { DarkModeContext } from "../../context";
import { useNavigate } from "react-router-dom";

function Card(country: CountryType) {
  // ---------------------------------------------------------------------------
  // variables
  // ---------------------------------------------------------------------------
  const context = useContext(DarkModeContext);
  const navigation = useNavigate();

  //---------------------------------------------------------------------------
  return (
    <div
      className={context?.darkMode ? styles.cardDarkWrap : styles.cardWrap}
      onClick={() => navigation(`/${country.name.common}`)}
    >
      <img src={country.flags.png} alt="Flag" className={styles.flag} />
      <div className={styles.footer}>
        <div className={context?.darkMode ? styles.text : ""}>
          {country.name.common}
        </div>
        <span className={context?.darkMode ? styles.text : ""}>
          <b>Population: </b> {country.population}
        </span>
        <div className={context?.darkMode ? styles.text : ""}>
          <b>Region: </b> {country.region}
        </div>
        <span className={context?.darkMode ? styles.text : ""}>
          <b>Capital: </b> {country.capital}
        </span>
      </div>
    </div>
  );
}

export default Card;
