export type CardInformationType = {
  tckn: string | null;
  name: string | null;
  surname: string | null;
  birthdate: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  city: string | null;
  district: string | null;
  gender: string | null;
};

export type IdCardType = {
  tckn: string | null;
  name: string | null;
  surname: string | null;
  birthdate: string | null;
  allData: string[];
};

export type CheckListType = {
  id: number;
  label: string;
  value: boolean;
};

export type CheckProcessType = {
  operations: CheckListType[];
  notes: string | null;
};

export type RequiredInformationType = {
  mechanicalPasswordCode: string | null;
  pinCode: string | null;
  csCode: string | null;
  immobilizerFile: string | null;
  piece: number | null;
};

export type RegistrationCardType = {
  plate: string | null;
  chassisNumber: string | null;
  brand: string | null;
  model: string | null;
  year: string | null;
  name: string | null;
  surname: string | null;
  tckn: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  city: string | null;
  district: string | null;
  allData: string[];
};

export type DataType = {
  id: string;
  user: string | number | null;
  company: string | null;
  idCard: IdCardType;
  cardInformation: CardInformationType;
  registration: RegistrationCardType;
  process: CheckProcessType;
  requiredInformation: RequiredInformationType;
  payment: number | null;
  cardFrontImage: string;
  cardBackImage: string;
  beforeImages: string[];
  plateImage: string;
  gaugeImage: string;
  generalImage: string;
  registrationImage: string;
  immobilizerFile: string;
};
