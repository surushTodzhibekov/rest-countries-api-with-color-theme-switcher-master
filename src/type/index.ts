export type CountryType = {
  flags: { png: string };
  name: { common: string };
  population: number;
  region: string;
  capital: string;
};

export type DetailType = {
  name: {
    common: string;
    nativeName: {
      [key: string]: {
        official: string;
      };
    };
  };
  borders: string[];
  flags: { png: string };
  nativeName: string;
  population: number;
  region: string;
  subregion: string;
  capital: string;
};
