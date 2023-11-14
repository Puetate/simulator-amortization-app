import API from "../../../../lib/API";
import { CompanyCreditType } from "../components/FormCompanyCreditType";

const URL = "/company-credit-type"
export async function saveCompanyCreditTypeService(companyCreditType:CompanyCreditType) {
    const res = await API.post<CompanyCreditType>({ url: URL, data: companyCreditType });
    return res;
}