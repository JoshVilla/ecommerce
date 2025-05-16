export interface IRegion {
  code: string;
  name: string;
  regionName: string;
  psgc10DigitCode: string;
  islandGroupCode: string;
}

export interface IProvince {
  code: string;
  name: string;
  regionCode: string;
  islandGroupCode: string;
  psgc10DigitCode: string;
}

export interface ICityOrMunicipality {
  code: string;
  name: string;
  oldName: string;
  isCapital: boolean;
  isCity: boolean;
  isMunicipality: boolean;
  provinceCode: string;
  districtCode: boolean;
  regionCode: string;
  islandGroupCode: string;
  psgc10DigitCode: string;
}

export interface IBarangay {
  code: string;
  name: string;
  oldName: string;
  subMunicipalityCode: boolean;
  cityCode: boolean;
  municipalityCode: string;
  districtCode: boolean;
  provinceCode: string;
  regionCode: string;
  islandGroupCode: string;
  psgc10DigitCode: string;
}

export interface IAddress {
  region: string;
  province: string;
  city: string;
  barangay: string;
  addressInfo: string;
  regionCode: string;
  provinceCode: string;
  cityCode: string;
  barangayCode: string;
  otherAddress: string;
}
