import API from "../../../../lib/API";

export interface Credits {
  label: string;
  value: string;
}

const URL = "/company-credit-type/company/combo";

export async function getCreditTypesByCompanyId(companyId: string) {
  const url = `${URL}/${companyId}`;
  const res = await API.get<Credits[]>({ url });
  return res;
}
