import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./detail.module.css";
import { DetailType } from "../type";
import { DarkModeContext } from "../context";

function Detail() {
  // ---------------------------------------------------------------------------
  // variables
  // ---------------------------------------------------------------------------

  const { name } = useParams();
  const navigate = useNavigate();
  const context = useContext(DarkModeContext);
  const [country, setCountry] = useState<DetailType>();

  // ---------------------------------------------------------------------------
  // effects
  // ---------------------------------------------------------------------------

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://restcountries.com/v3.1/name/${name}`
        );
        console.log("response", response);

        const [country] = await response.json();

        setCountry({
          name: {
            common: country.name.common,
            nativeName: country.name.nativeName,
          },
          flags: country.flags,
          population: country.population,
          region: country.region,
          subregion: country.subregion,
          capital: country.capital,
          nativeName: country.nativeName,
          borders: country.borders,
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [name]);

  if (!country) {
    return <div>Loading...</div>;
  }

  return (
    <div className={context?.darkMode ? styles.darkWrap : styles.container}>
      {/* --------------------------------------------------------------------------- */}
      {/* BACK BUTTON */}
      {/* --------------------------------------------------------------------------- */}

      <div className={styles.subContainer}>
        <button
          className={context?.darkMode ? styles.btnDark : styles.btn}
          onClick={() => navigate("/")}
        >
          <i className="fas fa-long-arrow-alt-left"></i>
          Back
        </button>

        {/* --------------------------------------------------------------------------- */}
        {/* CONTENT */}
        {/* --------------------------------------------------------------------------- */}

        <div className={styles.content}>
          <img src={country.flags.png} alt="Flag" className={styles.img} />
          <div className={styles.rightSide}>
            <h3 className={context?.darkMode ? styles.text : ""}>
              {country.name.common}
            </h3>
            <div className={context?.darkMode ? styles.text : ""}>
              <b>Native Name:</b>{" "}
              {Object.keys(country.name.nativeName).map((key) => (
                <span key={key}>
                  {country.name.nativeName[key].official}
                  {", "}
                </span>
              ))}
            </div>
            <p className={context?.darkMode ? styles.text : ""}>
              <b>Population: </b> {country.population}
            </p>
            <p className={context?.darkMode ? styles.text : ""}>
              <b>Region: </b> {country.region}
            </p>
            <p className={context?.darkMode ? styles.text : ""}>
              <b>Sub Region: </b> {country.subregion}
            </p>
            <p className={context?.darkMode ? styles.text : ""}>
              <b>Capital: </b> {country.capital}
            </p>
            {country.borders && (
              <div className={styles.borderWrap}>
                <b className={context?.darkMode ? styles.text : ""}>
                  Borders country:
                </b>
                {country.borders.map((border) => (
                  <span
                    className={
                      context?.darkMode ? styles.borderDark : styles.border
                    }
                  >
                    {border}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;
