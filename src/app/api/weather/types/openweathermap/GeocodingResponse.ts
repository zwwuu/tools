export interface GeocodingResponse {
  name: string;
  local_names?: LocalNames;
  lat: number;
  lon: number;
  country: string; // ISO 3166-1 alpha-2 country code
  state: string;
}

export interface LocalNames {
  es?: string;
  he?: string;
  oc?: string;
  ca?: string;
  gl?: string;
  pt?: string;
  eo?: string;
  hi?: string;
  en: string;
  ar?: string;
  it?: string;
  be?: string;
  pl?: string;
  is?: string;
  el?: string;
  de?: string;
  ru?: string;
  cs?: string;
  zh?: string;
  te?: string;
  fr?: string;
  uk?: string;
  cy?: string;
  vi?: string;
  kn?: string;
  ko?: string;
  ja?: string;
  fa?: string;
  ta?: string;
}
