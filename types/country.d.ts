export interface Translation {
  official: string;
  common: string;
}

export interface NativeName {
  [languageCode: string]: Translation;
}

export interface CountryName {
  common: string;
  official: string;
  nativeName?: NativeName;
}

export interface Currency {
  name: string;
  symbol?: string;
}

export interface Currencies {
  [currencyCode: string]: Currency;
}

export interface Languages {
  [languageCode: string]: string;
}

export interface IDD {
  root: string;
  suffixes: string[];
}

export interface Demonyms {
  eng?: {
    f: string;
    m: string;
  };
  fra?: {
    f: string;
    m: string;
  };
}

export interface Translations {
  [languageCode: string]: Translation;
}

export interface Flags {
  png: string;
  svg: string;
  alt?: string;
}

export interface CoatOfArms {
  png?: string;
  svg?: string;
}

export interface Maps {
  googleMaps?: string;
  openStreetMaps?: string;
}

export interface Car {
  signs: string[];
  side: 'left' | 'right';
}

export interface CapitalInfo {
  latlng?: [number, number];
}

export interface PostalCode {
  format: string;
  regex: string;
}

export interface Gini {
  [year: string]: number;
}

// Main Country interface
export interface Country {
  name: CountryName;
  tld?: string[];
  cca2: string;
  ccn3?: string;
  cca3: string;
  cioc?: string;
  independent?: boolean;
  status: 'officially-assigned' | 'user-assigned';
  unMember: boolean;
  currencies?: Currencies;
  idd?: IDD;
  capital?: string[];
  altSpellings?: string[];
  region: string;
  subregion?: string;
  languages?: Languages;
  latlng?: [number, number];
  landlocked: boolean;
  borders?: string[];
  area: number;
  demonyms?: Demonyms;
  flag: string;
  maps?: Maps;
  population: number;
  gini?: Gini;
  fifa?: string;
  car?: Car;
  timezones: string[];
  continents: string[];
  flags: Flags;
  coatOfArms?: CoatOfArms;
  startOfWeek: 'monday' | 'sunday' | 'saturday';
  capitalInfo?: CapitalInfo;
  postalCode?: PostalCode;
  translations?: Translations;
}

// API Response type (REST Countries returns an array)
export type CountryApiResponse = Country[];

export interface CountryInfoProps {
  countryData?: Country;
  countryName?: string;
}

export interface UseCountryDataReturn {
  countryData: Country | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

// Error types
export interface CountryApiError {
  message: string;
  status?: number;
  statusText?: string;
}

export interface FormattedCountryData {
  name: string;
  officialName: string;
  nativeNames: string[];
  capital: string;
  region: string;
  subregion: string;
  population: string;
  area: string;
  languages: string;
  currencies: string;
  timezones: string;
  borders: string[];
  demonym: string;
  callingCode: string;
  topLevelDomain: string;
  drivingSide: string;
  continent: string;
  giniIndex: string;
  isIndependent: boolean;
  isUnMember: boolean;
  isLandlocked: boolean;
  weekStartsOn: string;
}

// Next.js specific types
export interface CountryPageParams {
  country: string;
}

export interface CountryPageProps {
  params: CountryPageParams;
}

export interface CountryPageSearchParams {
  [key: string]: string | string[] | undefined;
}

// Component state types
export interface CountryComponentState {
  data: Country | null;
  loading: boolean;
  error: string | null;
}

// Action types for useReducer if you want to use it
export type CountryAction =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: Country }
  | { type: 'FETCH_ERROR'; payload: string }
  | { type: 'RESET' };

export interface UseCountryOptions {
  enabled?: boolean;
  refetchOnWindowFocus?: boolean;
  retry?: number;
  retryDelay?: number;
}

export interface CountryMapProps {
  googleMapsUrl?: string;
  openStreetMapUrl?: string;
  countryName: string;
  className?: string;
}

export interface CountryFlagProps {
  flags: Flags;
  countryName: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export interface CoatOfArmsProps {
  coatOfArms?: CoatOfArms;
  countryName: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export interface BorderCountriesProps {
  borders?: string[];
  onBorderClick?: (borderCode: string) => void;
  className?: string;
}

export interface StatsCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  message?: string;
}

export interface ErrorDisplayProps {
  error: string;
  onRetry?: () => void;
  className?: string;
}

export interface CountrySearchFilters {
  region?: string;
  subregion?: string;
  language?: string;
  currency?: string;
  independent?: boolean;
  unMember?: boolean;
  landlocked?: boolean;
}

export interface CountrySearchParams {
  name?: string;
  filters?: CountrySearchFilters;
  limit?: number;
  offset?: number;
}

// API endpoint types
export type RestCountriesEndpoint =
  | 'all'
  | 'name'
  | 'fullname'
  | 'code'
  | 'codes'
  | 'currency'
  | 'demonym'
  | 'lang'
  | 'capital'
  | 'region'
  | 'subregion'
  | 'translation';

export interface ApiRequestConfig {
  endpoint: RestCountriesEndpoint;
  query: string;
  options?: {
    fullText?: boolean;
    fields?: string[];
  };
}

export const isCountry = (obj: unknown): obj is Country => {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'name' in obj &&
    'cca2' in obj &&
    'region' in obj &&
    'area' in obj &&
    'population' in obj
  );
};

export const isCountryArray = (obj: unknown): obj is Country[] => {
  return Array.isArray(obj) && obj.every(isCountry);
};

export const COUNTRY_REGIONS = [
  'Africa',
  'Americas', 
  'Asia',
  'Europe',
  'Oceania'
] as const;

export type CountryRegion = typeof COUNTRY_REGIONS[number];

export const CAR_SIDES = ['left', 'right'] as const;
export type CarSide = typeof CAR_SIDES[number];

export const WEEK_STARTS = ['monday', 'sunday', 'saturday'] as const;
export type WeekStart = typeof WEEK_STARTS[number];