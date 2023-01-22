export interface companiesProps {
  companyId: number;
  name: string;
  country: string;
  lastLogin: string;
}

export interface shipmentsProps {
  shipmentId: number;
  areaId: number;
  companyId: number;
}

export interface companyAreaProps {
  companyId: number;
  areaId: number;
}

export interface areaProps {
  areaId: number;
  state: string;
}
