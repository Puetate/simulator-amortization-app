import API from "../../../../lib/API";

export interface Credits {
  label: string;
  value: string;
}

const URL = "/credit-type";

export async function getCreditTypesService() {
  const res = await API.get<Credits[]>({ url: URL });
  return res;
}
