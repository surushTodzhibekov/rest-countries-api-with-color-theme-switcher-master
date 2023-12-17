import { ChangeEvent, useContext, useEffect, useMemo, useState } from "react";
import styles from "./home-style.module.css";
import Card from "../components/card/card";
import { CountryType } from "../type";
import Search from "../components/search/search";
import { DarkModeContext } from "../context";

function Home() {
  // ---------------------------------------------------------------------------
  // variables
  // ---------------------------------------------------------------------------
  const context = useContext(DarkModeContext);
  const [keyword, setKeyword] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const [countries, setCountries] = useState<CountryType[]>([]);
  const [originalCountries, setOriginalCountries] = useState<CountryType[]>([]);

  // ---------------------------------------------------------------------------
  // memo & effects
  // ---------------------------------------------------------------------------

  const uniqueRegions = useMemo(() => {
    return new Set(countries.map((country) => country.region));
  }, [countries]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (keyword) {
      setCountries(
        originalCountries.filter(
          (country) =>
            country.name.common.toLowerCase().includes(keyword.toLowerCase()) &&
            (!selectedRegion || country.region === selectedRegion)
        )
      );
    } else if (selectedRegion) {
      setCountries(
        originalCountries.filter((country) => country.region === selectedRegion)
      );
    } else {
      setCountries(originalCountries);
    }
  }, [keyword, originalCountries, selectedRegion]);

  // ---------------------------------------------------------------------------
  // functions
  // ---------------------------------------------------------------------------

  async function fetchData() {
    await fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((results) => {
        console.log("res: ", results);

        const mappedCountries: CountryType[] = results.map(
          (apiCountry: CountryType) => ({
            flags: apiCountry.flags,
            name: apiCountry.name,
            population: apiCountry.population,
            region: apiCountry.region,
            capital: apiCountry.capital,
          })
        );

        setCountries(mappedCountries);
        setOriginalCountries(mappedCountries);
      });
  }

  function changeKeyword(event: ChangeEvent<HTMLInputElement>) {
    setKeyword(event.target.value.trim());
  }

  function changeRegion(event: ChangeEvent<HTMLSelectElement>) {
    setSelectedRegion(event.target.value);
  }

  // ---------------------------------------------------------------------------
  return (
    <div className={context?.darkMode ? styles.darkWrap : styles.container}>
      {/* --------------------------------------------------------------------------- */}
      {/* SEARCH & FILTER */}
      {/* --------------------------------------------------------------------------- */}
      <div className={styles.searchAndFilterWrap}>
        <div>
          <Search search={keyword} onChange={changeKeyword} />
        </div>
        <div>
          <select
            className={context?.darkMode ? styles.selectDark : styles.select}
            name="region"
            id="region-select"
            onChange={changeRegion}
          >
            <option value="">Filter by region</option>
            {[...uniqueRegions].map((region) => (
              <option
                key={region}
                value={region}
                selected={selectedRegion === region}
              >
                {region}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* --------------------------------------------------------------------------- */}
      {/* CARD */}
      {/* --------------------------------------------------------------------------- */}
      <div className={styles.card}>
        {countries
          .sort((a, b) => a.name.common.localeCompare(b.name.common))
          .map((country, index) => (
            <Card
              key={index}
              name={country.name}
              capital={country.capital}
              flags={country.flags}
              population={country.population}
              region={country.region}
            />
          ))}
      </div>
    </div>
  );
}

export default Home;
