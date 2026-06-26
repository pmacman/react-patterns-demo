export interface Province {
  code: string;
  name: string;
}

export interface Country {
  code: string;
  name: string;
  provinces: Province[];
}

export interface CountriesResponse {
  countries: Country[];
}
